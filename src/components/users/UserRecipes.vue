<template>
    <ion-card>
        <ion-card-header @click="toggleUserRecipes">
            <ion-card-title>{{ showUserRecipes ? 'Hide' : 'Show' }} Your Recipes</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-list v-if="showUserRecipes">
                <ion-item v-for="recipe in userAddedRecipes" :key="recipe.id" @click="viewRecipeDetails(recipe.id)"
                    button>
                    <ion-thumbnail slot="start">
                        <ion-img :src="recipe.image" alt="Recipe Image"></ion-img>
                    </ion-thumbnail>
                    <ion-label>{{ recipe.name }}</ion-label>
                    <ion-buttons slot="end">
                        <ion-button @click.stop="openEditModal(recipe)">Edit</ion-button>
                        <ion-button @click.stop="deleteRecipe(recipe.id)">Delete</ion-button>
                    </ion-buttons>
                </ion-item>
            </ion-list>
            <edit-recipe-modal :is-open="isModalOpen" :recipe="selectedRecipe" @close="closeEditModal" />
        </ion-card-content>
    </ion-card>
</template>

<script>
import {
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel,
    IonThumbnail, IonImg, IonButtons, IonButton
} from '@ionic/vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import EditRecipeModal from './EditRecipeModal.vue';

export default {
    name: 'UserRecipes',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonList,
        IonItem,
        IonLabel,
        IonThumbnail,
        IonImg,
        IonButtons,
        IonButton,
        EditRecipeModal
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const userAddedRecipes = computed(() =>
            Array.isArray(store.state.recipes) ?
                store.state.recipes.filter(recipe => recipe.userId === store.state.user?.uid) :
                []
        );

        const showUserRecipes = ref(false);
        const isModalOpen = ref(false);
        const selectedRecipe = ref(null);

        const toggleUserRecipes = () => {
            showUserRecipes.value = !showUserRecipes.value; // Toggle visibility state
        };

        const openEditModal = (recipe) => {
            selectedRecipe.value = { ...recipe }; // Pass the whole recipe reference
            isModalOpen.value = true;
        };

        const closeEditModal = () => {
            isModalOpen.value = false;
            selectedRecipe.value = null;
        };

        const deleteRecipe = async (recipeId) => {
            const confirmed = confirm("Are you sure you want to delete this recipe?");
            if (confirmed) {
                await store.dispatch('removeRecipe', recipeId); // Dispatch the action to remove the recipe from both Vuex and Firestore
            }
        };

        const viewRecipeDetails = (recipeId) => {
            router.push({ name: 'RecipeDetails', params: { id: recipeId } });
        };

        return { userAddedRecipes, toggleUserRecipes, openEditModal, closeEditModal, deleteRecipe, showUserRecipes, isModalOpen, selectedRecipe, viewRecipeDetails };
    }
}
</script>