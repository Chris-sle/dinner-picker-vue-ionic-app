<template>
    <form @submit.prevent="submitRecipe">
        <!-- Recipe Name Input -->
        <ion-item>
            <ion-input 
                label="Navn på rett" 
                label-placement="floating" 
                v-model="newRecipe.name" 
                required 
                placeholder="Skriv inn navn på retten">
            </ion-input>
        </ion-item>

        <!-- Optional Image URL Input -->
        <ion-item>
            <ion-input 
                label="Bilde URL (valgfritt)" 
                label-placement="floating" 
                v-model="newRecipe.image" 
                type="url" 
                placeholder="Skriv inn bilde URL">
            </ion-input>
        </ion-item>

        <!-- Type of Food Select -->
        <ion-item>
            <ion-select 
                label="Type Mat" 
                label-placement="floating" 
                v-model="newRecipe.type" 
                placeholder="Velg type">
                <ion-select-option value="fjærfe">fjærfe</ion-select-option>
                <ion-select-option value="storfe">Storfe</ion-select-option>
                <ion-select-option value="svin">Svin</ion-select-option>
                <ion-select-option value="vilt">Vilt</ion-select-option>
                <ion-select-option value="fisk">Fisk</ion-select-option>
                <ion-select-option value="skaldyr">Skalldyr</ion-select-option>
                <ion-select-option value="egg">Egg</ion-select-option>
                <ion-select-option value="vegetariansk">Vegetariansk</ion-select-option>
            </ion-select>
        </ion-item>

        <!-- Cooking Steps Textarea -->
        <ion-item>
            <ion-textarea 
                label="Fremgangsmåte" 
                label-placement="floating" 
                v-model="newRecipe.steps" 
                rows="6" 
                required 
                placeholder="Beskriv fremgangsmåten">
            </ion-textarea>
        </ion-item>

        <!-- Ingredients Section -->
        <div v-for="(ingredient, index) in newRecipe.ingredients" :key="index" class="ingredient-input">
            <ion-item>
                <ion-input 
                    label="Ingrediens navn" 
                    label-placement="floating" 
                    v-model="ingredient.name" 
                    required 
                    placeholder="Navn på ingrediens">
                </ion-input>
                <ion-input 
                    label="Mengde" 
                    label-placement="floating" 
                    v-model="ingredient.amount" 
                    required 
                    placeholder="Skriv inn mengde">
                </ion-input>
                <ion-button @click="removeIngredient(index)" color="danger">Fjern</ion-button>
            </ion-item>
        </div>

        <ion-button type="button" @click="addIngredient" expand="block">Legg til flere ingredienser</ion-button>
        <ion-button type="submit" expand="block" class="ion-margin-top">Legg til oppskrift</ion-button>
    </form>
</template>

<script>
import { IonItem, IonInput, IonSelect, IonSelectOption, IonTextarea, IonButton } from '@ionic/vue';
import { auth } from '@/firebase';

export default {
    name: 'RecipeForm',
    components: {
        IonItem,
        IonInput,
        IonSelect,
        IonSelectOption,
        IonTextarea,
        IonButton
    },
    data() {
        return {
            isSubmitting: false,
            newRecipe: {
                name: '',
                image: '',
                ingredients: [{ name: '', amount: '' }],
                steps: '',
                type: ''
            }
        };
    },
    methods: {
        addIngredient() {
            this.newRecipe.ingredients.push({ name: '', amount: '' });
        },

        removeIngredient(index) {
            this.newRecipe.ingredients.splice(index, 1);
        },

        submitRecipe() {
            if (this.isSubmitting) return;
            this.isSubmitting = true;

            const userId = auth.currentUser?.uid;
            if (!userId) {
                alert("Du må være innlogget for å legge til en oppskrift.");
                this.isSubmitting = false;
                return;
            }

            // Construct recipe data to include userId
            const recipeData = {
                ...this.newRecipe,
                userId
            };

            console.log('Sending recipe to vuex:', recipeData);

            try {
                this.$store.dispatch('addNewRecipe', recipeData);
                this.$emit('submitted'); // Emit event to indicate submission was successful
                console.log('Success!');
            } catch (error) {
                console.error('Error adding new recipe:', error);
                alert('Det oppstod en feil. Vennligst prøv igjen.');
            } finally {
                this.resetForm(); // Reset the form for future submissions
                this.isSubmitting = false;
            }
        },

        resetForm() {
            this.newRecipe = {
                name: '',
                image: '',
                ingredients: [{ name: '', amount: '' }],
                steps: '',
                type: ''
            };
        }
    }
}
</script>

<style scoped>
.ingredient-input {
    margin-bottom: 20px; /* Add spacing between ingredient input fields */
}
</style> // User
