<template>
    <ion-modal :is-open="isOpen">
        <ion-header>
            <ion-toolbar>
                <ion-title>Legg til ny oppskrift</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="closeModal">Lukk</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <form @submit.prevent="submitRecipe">
                <recipe-form :recipe="newRecipe" />

                <ingredient-list :ingredients="newRecipe.ingredients" :editIngredient="editIngredient"
                    :removeIngredient="removeIngredient" />

                <ion-button @click="showAddIngredientModal" expand="block" class="ion-margin-top">
                    Legg til ingrediens
                </ion-button>

                <add-ingredient-modal :is-open="isAddIngredientModalOpen" :ingredient="currentIngredient"
                    @close="closeAddIngredientModal" @submit="handleIngredientSubmit" />

                <ion-button type="submit" expand="block" class="ion-margin-top">Legg til oppskrift</ion-button>
            </form>
        </ion-content>
    </ion-modal>
</template>

<script>
import { auth } from '@/firebase';
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent
} from "@ionic/vue";
import RecipeForm from './RecipeForm.vue';
import IngredientList from './IngredientList.vue';
import AddIngredientModal from './AddIngredientModal.vue';

export default {
    name: 'AddRecipeModal',
    components: {
        IonModal,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonContent,
        RecipeForm,
        IngredientList,
        AddIngredientModal
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            newRecipe: {
                name: '',
                image: '',
                ingredients: [],
                steps: '',
                type: ''
            },
            isAddIngredientModalOpen: false,
            currentIngredient: { name: '', amount: '' }
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
            this.resetForm();
        },
        async submitRecipe() {
            const userId = auth.currentUser?.uid;
            if (!userId) {
                alert("Du må være innlogget for å legge til en oppskrift.");
                return;
            }

            const recipeData = {
                name: this.newRecipe.name,
                image: this.newRecipe.image,
                ingredients: this.newRecipe.ingredients.map(ingredient => ({
                    name: ingredient.name,
                    amount: ingredient.amount
                })),
                steps: this.newRecipe.steps,
                type: this.newRecipe.type,
                userId: userId
            };

            console.log('Submitting recipe:', recipeData);

            try {
                await this.$store.dispatch('addNewRecipe', recipeData);
                await this.$store.dispatch('fetchRecipes');
                this.closeModal();
                console.log('Success!');
            } catch (error) {
                console.error('Error adding new recipe:', error);
            }
        },
        showAddIngredientModal() {
            this.currentIngredient = { name: '', amount: '' };
            this.isAddIngredientModalOpen = true;
        },
        editIngredient(index) {
            this.currentIngredient = { ...this.newRecipe.ingredients[index] };
            this.isAddIngredientModalOpen = true;
        },
        removeIngredient(index) {
            this.newRecipe.ingredients.splice(index, 1);
        },
        closeAddIngredientModal() {
            this.isAddIngredientModalOpen = false;
        },
        handleIngredientSubmit(ingredient) {
            console.log("Submitting ingredient:", ingredient); // feilsøking
            if (ingredient && ingredient.name && ingredient.amount) {
                const index = this.newRecipe.ingredients.findIndex(
                    ing => ing.name === this.currentIngredient.name
                );
                if (index >= 0) {
                    this.newRecipe.ingredients[index] = { ...ingredient };
                    console.log(`Updated ingredient at index ${index}:`, this.newRecipe.ingredients[index]);
                } else {
                    this.newRecipe.ingredients.push({ ...ingredient });
                    console.log("Added new ingredient:", ingredient);
                }
                this.currentIngredient = { name: '', amount: '' }; // Reset current ingredient
                console.log("Updated Ingredients:", this.newRecipe.ingredients); // Show the updated ingredients
            } else {
                console.error("Invalid ingredient:", ingredient); // Log invalid submissions
            }
            this.closeAddIngredientModal();
        },
        resetForm() {
            this.newRecipe = {
                name: '',
                image: '',
                ingredients: [],
                steps: '',
                type: ''
            };
        },
    }
}
</script>
