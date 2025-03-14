<template>
    <ion-col size="6" size-md="4" size-lg="3">
        <ion-card @click="viewRecipeDetails(recipe.id)" button>
            <img :src="recipe.image" alt="Recipe Image" v-if="recipe.image">
            <FavoriteIcon :recipeId="recipe.id" />
            <ion-card-header>
                <ion-card-title>{{ recipe.name }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <p>{{ recipe.type }}</p>
            </ion-card-content>
        </ion-card>
    </ion-col>
</template>

<script>
import { IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/vue";
import FavoriteIcon from '../library/FavoriteIcon.vue';

export default {
    name: 'RecipeGridCard',
    components: {
        IonCol,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        FavoriteIcon
    },
    props: {
        recipe: {
            type: Object,
            required: true
        }
    },
    methods: {
        viewRecipeDetails(recipeId) {
            this.$router.push({ name: 'RecipeDetails', params: { id: recipeId } });
        }
    }
}
</script>