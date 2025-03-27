<template>
    <base-layout page-title="Oppskriftsbibliotek">
        <recipe-grid :recipes="allRecipes" @addFavorite="addFavorite" @removeFavorite="removeFavorite">
        </recipe-grid>

        <modal-button :icon="add" @click="openAddRecipeModal"></modal-button>

        <add-recipe-modal :is-open="isAddRecipeModalOpen" @close="closeAddRecipeModal" @submit="submitRecipe">
        </add-recipe-modal>
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
        ModalButton
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
        await this.$store.dispatch('fetchRecipes'); // Fetch recipes on component mount
    },
    methods: {
        addFavorite(recipeId) {
            this.$store.commit('addFavorite', recipeId); // commit favorite addition
        },
        removeFavorite(recipeId) {
            this.$store.commit('removeFavorite', recipeId); // commit favorite removal
        },
        openAddRecipeModal() {
            if (this.isUserLoggedIn()) {
                this.isAddRecipeModalOpen = true; // Open the modal if user is logged in
            } else {
                console.log('User is not logged in');
                // Handle not logged in state (e.g., show a message or redirect to login)
            }
        },
        closeAddRecipeModal() {
            this.isAddRecipeModalOpen = false; // Close the modal
        },
        async submitRecipe(newRecipe) {
            console.log('Submitting recipe:', newRecipe); // Log the new recipe for debugging
            try {
                await this.$store.dispatch('addNewRecipe', newRecipe); // Dispatch action to add the recipe
                await this.$store.dispatch('fetchRecipes'); // Refetch updated recipes
                this.closeAddRecipeModal(); // Close the modal after submission
                console.log('Success!'); // Log success
            } catch (error) {
                console.error('Error adding new recipe:', error); // Log errors if any
            }
        },
        isUserLoggedIn() {
            return this.$store.getters.isLoggedIn; // Check user login status
        }
    }
}
</script>

<style scoped>
/* Your styles here if needed */
</style>
