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
                <ion-item>
                    <ion-label position="floating">Navn på rett</ion-label>
                    <ion-input v-model="newRecipe.name" required></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">Bilde URL (valgfritt)</ion-label>
                    <ion-input v-model="newRecipe.image" type="url"></ion-input>
                </ion-item>

                <div v-for="(ingredient, index) in newRecipe.ingredients" :key="index">
                    <ion-item>
                        <ion-label position="floating">Ingrediens {{ index + 1 }} navn</ion-label>
                        <ion-input v-model="ingredient.name" required></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Ingrediens {{ index + 1 }} mengde</ion-label>
                        <ion-input v-model="ingredient.amount" required></ion-input>
                    </ion-item>
                    <ion-button @click="removeIngredient(index)" color="danger">Fjern ingrediens</ion-button>
                </div>

                <ion-button @click="addIngredient" expand="block" class="ion-margin-top">Legg til ingrediens</ion-button>

                <ion-item>
                    <ion-label position="floating">Fremgangsmåte</ion-label>
                    <ion-textarea v-model="newRecipe.steps" rows="6" required></ion-textarea>
                </ion-item>

                <ion-button type="submit" expand="block" class="ion-margin-top">Legg til oppskrift</ion-button>
            </form>
        </ion-content>
    </ion-modal>
</template>

<script>
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea
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
        IonLabel,
        IonInput,
        IonTextarea
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
                ingredients: [{ name: '', amount: '' }],
                steps: ''
            }
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
            this.resetForm();
        },
        submitRecipe() {
            this.$emit('submit', this.newRecipe);
            this.resetForm();
        },
        addIngredient() {
            this.newRecipe.ingredients.push({ name: '', amount: '' });
        },
        removeIngredient(index) {
            this.newRecipe.ingredients.splice(index, 1);
        },
        resetForm() {
            this.newRecipe = {
                name: '',
                image: '',
                ingredients: [{ name: '', amount: '' }], // Reset med en tom ingrediens
                steps: ''
            };
        }
    }
}
</script>

<style scoped>

</style>