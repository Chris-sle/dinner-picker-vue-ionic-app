<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>Edit Recipe</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <form @submit.prevent="updateRecipe">
                <ion-item>
                    <ion-label position="floating">Recipe Name</ion-label>
                    <ion-input v-model="recipe.name" required></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="floating">Image URL</ion-label>
                    <ion-input v-model="recipe.image" required></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="floating">Ingredients</ion-label>
                    <ion-input v-model="recipe.ingredients" placeholder="Comma-separated" required></ion-input>
                </ion-item>

                <ion-button expand="full" type="submit">Update Recipe</ion-button>
            </form>
        </ion-card-content>
    </ion-card>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default {
    name: 'EditRecipe',
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        const recipeId = route.params.id; // Get recipe ID from the route params
        const recipe = computed(() => {
            const foundRecipe = store.state.recipes.find(r => r.id === recipeId);
            return foundRecipe ? { ...foundRecipe, ingredients: foundRecipe.ingredients.join(', ') } : null; // Splitting ingredients into a string
        });

        const updateRecipe = async () => {
            const updatedRecipe = {
                id: recipe.value.id,
                name: recipe.value.name,
                image: recipe.value.image,
                ingredients: recipe.value.ingredients.split(',').map(item => item.trim()), // Convert back to array
                userId: recipe.value.userId // Preserve user ID
            };

            await store.dispatch('updateRecipe', updatedRecipe);
            router.push({ name: 'Profile' }); // Redirect to profile after updating
        };

        return { recipe, updateRecipe };
    }
}
</script>