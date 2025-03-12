<template>
    <ion-list>
        <ion-item v-for="(ingredient, index) in ingredients" :key="index">
            <ion-label>{{ ingredient.name }} ({{ ingredient.amount }})</ion-label>
        </ion-item>
    </ion-list>
</template>

<script>
import { IonList, IonItem, IonLabel } from '@ionic/vue'; // Import Ionic components

export default {
    name: 'IngredientList',
    components: {
        IonList,
        IonItem,
        IonLabel
    },
    props: {
        ingredients: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>