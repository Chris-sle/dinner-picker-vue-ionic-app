<template>
    <ion-grid>
        <ion-row>
            <ion-col size="6" size-md="4" size-lg="3" v-for="recipe in recipes" :key="recipe.id">
                <ion-card @click="viewRecipeDetails(recipe.id)" button>
                    <img :src="recipe.image" alt="Recipe Image" v-if="recipe.image">
                    <FavoriteIcon :isFavorited="isFavorited(recipe.id)" @toggleFavorite="toggleFavorite(recipe.id)" />
                    <ion-card-header>
                        <ion-card-title>{{ recipe.name }}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <!-- Card content can still go here. -->
                    </ion-card-content>
                </ion-card>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script>
import {
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
} from "@ionic/vue";
import FavoriteIcon from '../library/FavoriteIcon.vue';

export default {
    name: 'RecipeGrid',
    components: {
        IonGrid,
        IonRow,
        IonCol,
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
    emits: ['addFavorite'],
    methods: {
        viewRecipeDetails(recipeId) {
            this.$router.push({ name: 'RecipeDetails', params: { id: recipeId } });
        },
        toggleFavorite(recipeId) {
            const isCurrentlyFavorited = this.isFavorited(recipeId);
            this.$emit(isCurrentlyFavorited ? 'removeFavorite' : 'addFavorite', recipeId);
        },
        isFavorited(recipeId) {
            return this.$store.getters.favoriteRecipes.some(recipe => recipe.id === recipeId);
        },
    },
}
</script>

<style scoped>
/* Add any additional styles if needed */
</style>