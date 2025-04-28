<template>
    <ion-list v-if="recipes.length">
        <ion-item v-for="recipe in recipes" :key="recipe.id" button @click="goToRecipeDetails(recipe.id)">
            <ion-card>
                <img :src="recipe.image" alt="Recipe Image" v-if="recipe.image" />
                <favorite-icon :recipeId="recipe.id" />
                <ion-card-header>
                    <ion-card-title>{{ recipe.name }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <p>{{ recipe.type }}</p>
                </ion-card-content>
            </ion-card>
        </ion-item>
    </ion-list>
    <p v-if="!recipes.length">Ingen oppskrifter funnet.</p>
</template>

<script>
import FavoriteIcon from '../library/FavoriteIcon.vue';
import { IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';

export default {
    components: {
        IonList,
        IonItem,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        FavoriteIcon
    },
    props: {
        recipes: {
            type: Array,
            required: true
        }
    },
    methods: {
        goToRecipeDetails(recipeId) {
            // Navigate to the details page for the selected recipe
            this.$router.push({ name: 'RecipeDetails', params: { id: recipeId } });
        }
    }
}
</script>