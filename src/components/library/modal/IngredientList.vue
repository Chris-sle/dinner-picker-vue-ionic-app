<template>
    
    
        <ion-card v-for="(ingredient, index) in ingredients" :key="index">
            <ion-card-content>
                <ion-item>
                    <ion-label>
                        {{ ingredient.name }}: {{ ingredient.amount }}
                    </ion-label>
                    <ion-buttons>
                        <ion-button @click="editIngredient(index)" color="warning">Rediger</ion-button>
                        <ion-button @click="removeIngredient(index)" color="danger">Fjern</ion-button>
                    </ion-buttons>
                </ion-item>
            </ion-card-content>
        </ion-card>
        <div v-if="ingredients.length === 0">Ingen ingredienser lagt til.</div> <!-- Fallback message -->
    
</template>

<script>
import { IonContent, IonCard, IonCardContent, IonItem, IonLabel, IonButton, IonButtons } from "@ionic/vue";

export default {
    name: 'IngredientList',
    components: {
        IonContent,
        IonCard,
        IonCardContent,
        IonItem,
        IonLabel,
        IonButton,
        IonButtons
    },
    props: {
        ingredients: {
            type: Array,
            required: true
        },
        editIngredient: {
            type: Function,
            required: true
        },
        removeIngredient: {
            type: Function,
            required: true
        }
    }
}
</script>

<style scoped>
/* Your styles here if needed */
</style>