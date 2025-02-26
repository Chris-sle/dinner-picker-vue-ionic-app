<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>Velg Kjøtt og Ingredienser</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-item>
                <ion-label>Kjøttype</ion-label>
                <ion-select v-model="selectedMeat">
                    <ion-select-option value="kylling">Kylling</ion-select-option>
                    <ion-select-option value="svin">Svin</ion-select-option>
                    <ion-select-option value="storfe">Storfe</ion-select-option>
                </ion-select>
            </ion-item>

            <ion-item>
                <ion-label position="floating">Ingredienser</ion-label>
                <ion-input v-model="ingredients" placeholder="F.eks. grønnsaker, krydder"></ion-input>
            </ion-item>

            <ion-button expand="full" @click="findRecipe">Finn Oppskrift</ion-button>

            <div v-if="recipe">
                <h2>Foreslått Oppskrift:</h2>
                <p><strong>{{ recipe.navn }}</strong></p>
                <p>Ingredienser: {{ recipe.ingredienser.join(', ') }}</p>
            </div>
        </ion-card-content>
    </ion-card>
</template>

<script>
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonButton,
} from "@ionic/vue";

export default {
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonItem,
        IonLabel,
        IonSelect,
        IonSelectOption,
        IonInput,
        IonButton,
    },
    data() {
        return {
            selectedMeat: '',
            ingredients: '',
            recipe: null
        };
    },
    methods: {
        findRecipe() {
            // Dette er simpel logikk for å finne oppskrift basert på valgene; 
            // Du vil senere erstatte dette med en funksjon som henter fra Firestore.
            this.recipe = {
                navn: `Oppskrift med ${this.selectedMeat}`,
                ingredienser: this.ingredients.split(',').map(item => item.trim()) // Splitt ingredienser på komma
            };
            this.$emit('findRecipe', this.recipe); // Emitere til forelderen for videre behandling
        }
    }
}
</script>