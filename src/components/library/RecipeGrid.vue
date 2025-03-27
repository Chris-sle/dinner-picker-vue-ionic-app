<template>
    <ion-grid>
        <ion-row>
            <recipe-grid-card v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" @addFavorite="addFavorite"
                @removeFavorite="removeFavorite" />
        </ion-row>
    </ion-grid>
</template>

<script>
import { IonGrid, IonRow } from '@ionic/vue';
import RecipeGridCard from './RecipeGridCard.vue';

export default {
    name: 'RecipeGrid',
    components: {
        IonGrid,
        IonRow,
        RecipeGridCard
    },
    props: {
        recipes: {
            type: Array,
            required: true
        }
    },
    methods: {
        addFavorite(recipeId) {
            this.$store.commit('addFavorite', recipeId);
        },
        removeFavorite(recipeId) {
            this.$store.commit('removeFavorite', recipeId);
        }
    }
}
</script>

<style scoped>
/* Your styles here if needed */
</style>
