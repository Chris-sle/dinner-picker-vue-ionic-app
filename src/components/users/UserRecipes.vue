<template>
    <ion-card>
        <ion-card-header @click="toggleUserRecipes">
            <ion-card-title>{{ showUserRecipes ? 'Hide' : 'Show' }} Your Recipes</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-list v-if="showUserRecipes">
                <ion-item v-for="recipe in userAddedRecipes" :key="recipe.id" button>
                    <ion-thumbnail slot="start">
                        <ion-img :src="recipe.image" alt="Recipe Image"></ion-img>
                    </ion-thumbnail>
                    <ion-label>{{ recipe.name }}</ion-label>
                    <ion-buttons slot="end">
                        <ion-button @click.stop="editRecipe(recipe.id)">Edit</ion-button>
                        <ion-button @click.stop="deleteRecipe(recipe.id)">Delete</ion-button>
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
import { useRouter } from 'vue-router';

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
        IonButton
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const userAddedRecipes = computed(() =>
            store.state.recipes.filter(recipe => recipe.userId === store.state.user?.uid)
        );

        const showUserRecipes = ref(false);

        const toggleUserRecipes = () => {
            showUserRecipes.value = !showUserRecipes.value; // Toggle visibility state
        };

        const editRecipe = (recipeId) => {
            router.push({ name: 'EditRecipe', params: { id: recipeId } });
        };

        const deleteRecipe = async (recipeId) => {
            const confirmed = confirm("Are you sure you want to delete this recipe?");
            if (confirmed) {
                await store.dispatch('removeRecipe', recipeId); // Dispatch the action to remove the recipe from both Vuex and Firestore
            }
        };

        return { userAddedRecipes, toggleUserRecipes, editRecipe, deleteRecipe, showUserRecipes };
    }
}
</script>