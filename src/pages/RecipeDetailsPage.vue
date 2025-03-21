<template>
    <base-layout :page-title="recipe.name">
        <recipe-card :recipe="recipe" />
    </base-layout>
</template>

<script>
import { db } from '@/firebase'; // Import Firestore
import { getDoc, doc } from "firebase/firestore"; // Import necessary Firestore functions
import { mapGetters } from 'vuex';
import RecipeCard from '../components/details/RecipeCard.vue'; // Import the new RecipeCard component

export default {
    name: 'RecipeDetailsPage',
    components: {
        RecipeCard
    },
    data() {
        return {
            recipe: {
                name: '',
                image: '',
                ingredients: [],
                steps: '',
                type: ''
            }
        };
    },
    computed: {
        ...mapGetters(['allRecipes']),
    },
    async mounted() {
        const { id } = this.$route.params; // Get ID from route parameters
        await this.fetchRecipe(id);
    },
    methods: {
        async fetchRecipe(id) {
            try {
                const recipeDoc = await getDoc(doc(db, "dinner-recipes", id));
                if (recipeDoc.exists()) {
                    this.recipe = { id: recipeDoc.id, ...recipeDoc.data() }; // Set the fetched recipe
                    console.log(this.recipe); // Log the recipe data to check its structure
                } else {
                    console.error("Ingen oppskrift funnet!");
                }
            } catch (error) {
                console.error("Feil ved henting av oppskrift: ", error);
            }
        }
    }
}
</script>