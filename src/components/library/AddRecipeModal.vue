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

                <div v-for="(ingredient, index) in newRecipe.ingredients" :key="index" class="ingredient-input">
                    <ion-item>
                        <ion-input label="Ingrediens navn" label-placement="floating" v-model="ingredient.name"
                            placeholder="Navn på ingrediens" required>
                        </ion-input>

                        <ion-input label="Mengde" label-placement="floating" v-model="ingredient.amount"
                            placeholder="Skriv inn mengde" required>
                        </ion-input>
                        <ion-button @click="removeIngredient(index)" color="danger">X</ion-button>
                    </ion-item>
                </div>

                <ion-button type="button" @click="addIngredient" expand="block" class="ion-margin-top">
                    Legg til flere ingredienser
                </ion-button>

                <ion-button type="submit" expand="block" class="ion-margin-top">Legg til oppskrift</ion-button>
            </form>
        </ion-content>
    </ion-modal>
</template>

<script>
import { auth } from '@/firebase';
import RecipeForm from './RecipeForm.vue';
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonInput
} from "@ionic/vue";

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
        IonItem,
        IonInput,
        RecipeForm
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
                ingredients: [{
                    name: '',
                    amount: ''
                }],
                steps: '',
                type: ''
            }
        };
    },
    methods: {
        closeModal() {
            this.$emit('close'); // Emit close event to parent
            this.resetForm(); // Reset form
        },
        async submitRecipe() {
            if (this.isSubmitting) return; // Prevent multiple submissions
            this.isSubmitting = true;

            const userId = auth.currentUser?.uid;
            if (!userId) {
                alert("Du må være innlogget for å legge til en oppskrift.");
                return;
            }

            const recipeData = {
                name: this.newRecipe.name,
                image: this.newRecipe.image,
                ingredients: this.newRecipe.ingredients,
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
            } finally {
                this.isSubmitting = false; // Reset the flag after processing
            }
        },
        addIngredient() {
            this.newRecipe.ingredients.push({ name: '', amount: '' }); // Add a new ingredient object
        },
        removeIngredient(index) {
            this.newRecipe.ingredients.splice(index, 1); // Remove the ingredient at the specified index
        },
        resetForm() {
            this.newRecipe = {
                name: '',
                image: '',
                ingredients: [{
                    name: '',
                    amount: ''
                }],
                steps: '',
                type: ''
            }; // Reset to default state
        },
    }
}
</script>

<style scoped>
/* Your styles here if needed */
.ingredient-input {
    margin-bottom: 20px;
    /* Add some spacing between ingredient input fields */
}
</style>
