<template>
    <ion-grid>
        <ion-row>
            <ion-col size="6" size-md="4" size-lg="3" v-for="recipe in recipes" :key="recipe.id">
                <ion-card>
                    <img :src="recipe.image" alt="Recipe Image" v-if="recipe.image">
                    <ion-card-header>
                        <ion-card-title>{{ recipe.name }}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-button expand="block" @click="$emit('addFavorite', recipe)">Favoritt</ion-button>
                    </ion-card-content>
                </ion-card>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script>
import {
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
} from "@ionic/vue";

export default {
    name: 'RecipeGrid',
    components: {
        IonGrid,
        IonRow,
        IonCol,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonButton
    },
    props: {
        recipes: {
            type: Array,
            required: true
        }
    },
    emits: ['addFavorite']
}
</script>