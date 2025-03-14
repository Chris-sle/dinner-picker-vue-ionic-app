<template>
    <ion-grid>
        <ion-row>
            <RecipeGridCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
        </ion-row>
    </ion-grid>
</template>

<script>
import { IonGrid, IonRow } from "@ionic/vue";
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
    }
}
</script>