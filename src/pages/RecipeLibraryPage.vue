<template>
    <base-layout page-title="Oppskriftsbibliotek">
        <recipe-grid :recipes="allRecipes" @addFavorite="addFavorite"></recipe-grid>

        <modal-button :icon="add" @click="openAddRecipeModal"></modal-button>

        <add-recipe-modal :is-open="isAddRecipeModalOpen" @close="closeAddRecipeModal"
            @submit="submitRecipe"></add-recipe-modal>
    </base-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import { add } from 'ionicons/icons';
import RecipeGrid from '../components/library/RecipeGrid.vue';
import AddRecipeModal from '../components/library/AddRecipeModal.vue';
import ModalButton from '../components/base/ModalButton.vue'; // Import the ModalButton component

export default {
    components: {
        RecipeGrid,
        AddRecipeModal,
        ModalButton // Register the ModalButton component
    },
    data() {
        return {
            isAddRecipeModalOpen: false,
            add
        };
    },
    computed: {
        ...mapGetters(['allRecipes']),
    },
    async mounted() {
        await this.$store.dispatch('fetchRecipes');
    },
    methods: {
        addFavorite(recipe) {
            this.$store.commit('addFavorite', recipe);
        },
        openAddRecipeModal() {
            if (this.isUserLoggedIn()) {
                this.isAddRecipeModalOpen = true;
            } else {
                console.log('User is not logged in');
                // Handle not logged in state (e.g., show a message or redirect to login)
            }
        },
        closeAddRecipeModal() {
            this.isAddRecipeModalOpen = false;
        },
        async submitRecipe(newRecipe) {
            try {
                await this.$store.dispatch('addNewRecipe', newRecipe);
                await this.$store.dispatch('fetchRecipes'); // Refetch the recipes
                this.closeAddRecipeModal();
                console.log('Success!');
            } catch (error) {
                console.error('Error adding new recipe:', error);
            }
        },
        isUserLoggedIn() {
            return this.$store.getters.isLoggedIn;
        }
    }
}
</script>
