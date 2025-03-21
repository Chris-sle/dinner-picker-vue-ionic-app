<template>
    <ion-card>
        <img :src="recipe.image" alt="Recipe Image" v-if="recipe.image" />
        <FavoriteIcon v-if="recipe.id" :recipeId="recipe.id" />
        <ion-card-header>
            <ion-card-title>{{ recipe.name }}</ion-card-title>
            <ion-card-subtitle>{{ recipe.type }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <h3>Ingredienser:</h3>
            <ingredient-list :ingredients="recipe.ingredients" />
            <h3>Fremgangsmåte:</h3>
            <p>{{ recipe.steps }}</p>
        </ion-card-content>
    </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue'; // Import Ionic components
import IngredientList from './IngredientList.vue'; // Import your ingredient list component
import FavoriteIcon from '../library/FavoriteIcon.vue';

export default {
    name: 'RecipeCard',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IngredientList,
        FavoriteIcon
    },
    props: {
        recipe: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>