<template>
    <ion-card>
        <ion-card-header @click="toggleFavorites">
            <ion-card-title>{{ showFavorites ? 'Hide' : 'Show' }} Favorite Recipes</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-list v-if="showFavorites">
                <ion-item v-for="recipe in favoriteRecipes" :key="recipe.id" @click="viewRecipeDetails(recipe.id)"
                    button>
                    <ion-thumbnail slot="start">
                        <ion-img :src="recipe.image" alt="Recipe Image"></ion-img>
                    </ion-thumbnail>
                    <ion-label>{{ recipe.name }}</ion-label>
                    <ion-buttons slot="end">
                        <ion-button @click.stop="removeFavorite(recipe.id)" color="danger">X</ion-button>
                    </ion-buttons>
                </ion-item>
            </ion-list>
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
import { useRouter } from 'vue-router'; // Import useRouter

export default {
    name: 'UserFavorites',
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
        IonButton
    },
    setup() {
        const store = useStore();
        const router = useRouter(); // Create router instance
        const showFavorites = ref(false); // State for showing/hiding favorite recipes

        const favoriteRecipes = computed(() => {
            return store.getters.favoriteRecipes; // Fetch favorite recipes from store
        });

        const toggleFavorites = () => {
            showFavorites.value = !showFavorites.value; // Toggle visibility state
        };

        const viewRecipeDetails = (recipeId) => {
            if (recipeId) {
                // Use the router instance to navigate to RecipeDetails
                router.push({ name: 'RecipeDetails', params: { id: recipeId } });
            }
        };

        const removeFavorite = (recipeId) => {
            // Dispatch action to remove from favorites
            store.dispatch('removeNewFavorite', recipeId);
        };

        return {
            favoriteRecipes,
            toggleFavorites,
            viewRecipeDetails,
            removeFavorite,
            showFavorites
        };
    }
}
</script>