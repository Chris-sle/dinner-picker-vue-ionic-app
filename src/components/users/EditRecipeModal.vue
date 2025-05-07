<template>
    <ion-modal :is-open="isOpen" @ion-modal-did-dismiss="closeModal">
        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Edit Recipe</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <form @submit.prevent="updateRecipe">
                        <ion-item>
                            <ion-input label="Recipe Name" label-placement="floating" v-model="editRecipe.name" required
                                placeholder="Enter recipe name">
                            </ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-input label="Image URL" label-placement="floating" v-model="editRecipe.image" required
                                placeholder="Enter image URL">
                            </ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-select v-model="editRecipe.type" label="Type of Dish" label-placement="floating"
                                placeholder="Select type">
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

                        <h4>Ingredients</h4>
                        <div v-for="(ingredient, index) in editRecipe.ingredients" :key="index"
                            class="ingredient-input">
                            <ion-item>
                                <ion-input label="Ingredient Name" label-placement="floating" v-model="ingredient.name"
                                    required placeholder="Enter ingredient name">
                                </ion-input>
                                <ion-input label="Amount" label-placement="floating" v-model="ingredient.amount"
                                    required placeholder="Enter amount">
                                </ion-input>
                                <ion-button @click.stop="removeIngredient(index)" color="danger">Remove</ion-button>
                            </ion-item>
                        </div>

                        <ion-button type="button" @click="addIngredient" expand="block">Add More
                            Ingredients</ion-button>
                        <ion-button type="submit" expand="block">Update Recipe</ion-button>
                        <ion-button type="button" color="medium" @click="closeModal" expand="block">Cancel</ion-button>
                    </form>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-modal>
</template>

<script>
import { IonModal, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/vue';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'EditRecipeModal',
    components: { IonModal, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption },
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        recipe: {
            type: Object,
            default: null
        }
    },
    setup(props, { emit }) {
        const store = useStore();
        const editRecipe = ref({ name: '', image: '', ingredients: [], steps: '', type: '' }); // Initialize structure

        watch(() => props.recipe, (newRecipe) => {
            if (newRecipe) {
                editRecipe.value = {
                    ...newRecipe,
                    ingredients: newRecipe.ingredients || [],
                    steps: newRecipe.steps || '',
                    type: newRecipe.type || ''
                }; // Populate form with recipe data
            }
        });

        const closeModal = () => {
            emit('close');
        };

        const updateRecipe = async () => {
            if (editRecipe.value) {
                const updatedRecipe = {
                    ...editRecipe.value,
                    ingredients: editRecipe.value.ingredients // Already in the right format
                };

                await store.dispatch('updateRecipe', updatedRecipe); // Update the recipe in the Vuex store
                closeModal(); // Close the modal after updating
            }
        };

        const addIngredient = () => {
            editRecipe.value.ingredients.push({ name: '', amount: '' }); // Add a new ingredient input
        };

        const removeIngredient = (index) => {
            editRecipe.value.ingredients.splice(index, 1); // Remove the ingredient from the list
        };

        return {
            editRecipe,
            closeModal,
            updateRecipe,
            addIngredient,
            removeIngredient
        };
    }
}
</script>

<style scoped>
.ingredient-input {
    margin-bottom: 20px;
}
</style>