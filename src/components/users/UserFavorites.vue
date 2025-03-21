<template>
    <div>
        <h3>Favorite Recipes</h3>
        <ion-list>
            <ion-item v-for="recipe in favoriteRecipes" :key="recipe.id" @click="viewRecipeDetails(recipe.id)" button>
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
import { mapGetters } from 'vuex';


export default {
    name: 'UserFavorites',
    components: {
        IonList,
        IonItem,
        IonLabel,
        IonThumbnail,
        IonImg
    },
    computed: {
        ...mapGetters(['favoriteRecipes'])
    },
    methods: {
        viewRecipeDetails(recipeId) {
            console.log(this.favoriteRecipes)
            if (recipeId) {
                this.$router.push({ name: 'RecipeDetails', params: { id: recipeId } });
            } else {
                console.error("No recipe ID available for navigation.");
            }
        }
    }
}
</script>
