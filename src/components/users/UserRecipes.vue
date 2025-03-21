<template>
    <div>
        <h3>Your Recipes</h3>
        <ion-list>
            <ion-item v-for="recipe in userAddedRecipes" :key="recipe.id" @click="viewRecipeDetails(recipe.id)" button>
                <ion-thumbnail slot="start">
                    <ion-img :src="recipe.image" alt="Recipe Image"></ion-img>
                </ion-thumbnail>
                <ion-label>{{ recipe.name }}</ion-label>
            </ion-item>
        </ion-list>
    </div>
</template>

<script>
import { IonList, IonItem, IonLabel, IonThumbnail, IonImg } from '@ionic/vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'UserRecipes',
    components: {
        IonList,
        IonItem,
        IonLabel,
        IonThumbnail,
        IonImg
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const userAddedRecipes = computed(() =>
            store.state.recipes.filter(recipe => recipe.userId === store.state.user?.uid)
        );

        const viewRecipeDetails = (recipeId) => {
            router.push({ name: 'RecipeDetails', params: { id: recipeId } });
        };

        return { userAddedRecipes, viewRecipeDetails };
    }
}
</script>
