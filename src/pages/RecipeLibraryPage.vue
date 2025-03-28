<template>
    <base-layout page-title="Oppskriftsbibliotek">
        <recipe-grid :recipes="allRecipes" @addFavorite="addFavorite" @removeFavorite="removeFavorite"></recipe-grid>

        <modal-button :icon="add" @click="openAddRecipeModal"></modal-button>

        <add-recipe-modal :is-open="isAddRecipeModalOpen" @close="closeAddRecipeModal"></add-recipe-modal>
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
                // Provide better feedback for the user
                alert('Du må være innlogget for å legge til en oppskrift');
            }
        },
        closeAddRecipeModal() {
            this.isAddRecipeModalOpen = false; // Close the modal
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
