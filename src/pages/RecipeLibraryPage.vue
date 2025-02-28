<template>
    <base-layout page-title="Oppskriftsbibliotek">
        <recipe-grid :recipes="allRecipes" @addFavorite="addFavorite"></recipe-grid>

        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button @click="openAddRecipeModal">
                <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
        </ion-fab>

        <add-recipe-modal :is-open="isAddRecipeModalOpen" @close="closeAddRecipeModal"
            @submit="submitRecipe"></add-recipe-modal>
    </base-layout>
</template>

<script>
import { IonFab, IonFabButton, IonIcon } from "@ionic/vue";
import { add } from 'ionicons/icons';
import { mapGetters } from 'vuex';
import RecipeGrid from '../components/library/RecipeGrid.vue';
import AddRecipeModal from '../components/library/AddRecipeModal.vue';

export default {
    components: {
        RecipeGrid,
        AddRecipeModal,
        IonFab,
        IonFabButton,
        IonIcon
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