<template>
    <div>
        <ion-item>
            <ion-input 
                label="Navn på rett" 
                label-placement="floating" 
                v-model="recipe.name" 
                required 
                placeholder="Skriv inn navn på retten"
            ></ion-input>
        </ion-item>
        <ion-item>
            <ion-input 
                label="Bilde URL (valgfritt)" 
                label-placement="floating" 
                v-model="recipe.image" 
                type="url" 
                placeholder="Skriv inn bilde URL"
            ></ion-input>
        </ion-item>

        <ion-item>
            <ion-select 
                label="Type Mat" 
                label-placement="floating" 
                v-model="recipe.type" 
                placeholder="Velg type"
            >
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

        <ion-item>
            <ion-textarea 
                label="Fremgangsmåte" 
                label-placement="floating" 
                v-model="recipe.steps" 
                rows="6" 
                required 
                placeholder="Beskriv fremgangsmåten"
            ></ion-textarea>
        </ion-item>
    </div>
</template>

<script>
import { IonItem, IonInput, IonSelect, IonSelectOption, IonTextarea } from '@ionic/vue'; // Import Ionic components

export default {
    name: 'RecipeForm',
    components: {
        IonItem,
        IonInput,
        IonSelect,
        IonSelectOption,
        IonTextarea
    },
    props: {
        recipe: {
            type: Object,
            required: true
        }
    }
}
</script>
