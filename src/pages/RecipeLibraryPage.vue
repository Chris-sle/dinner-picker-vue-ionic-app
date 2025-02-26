<template>
    <base-layout page-title="Oppskriftsbibliotek">
        <ion-list>
            <ion-item v-for="recipe in allRecipes" :key="recipe.id">
                <ion-label>{{ recipe.navn }}</ion-label>
                <ion-button @click="addFavorite(recipe)">Favoritt</ion-button>
            </ion-item>
        </ion-list>
    </base-layout>
</template>

<script>
import {
    IonList,
    IonItem,
    IonLabel,
    IonButton
} from "@ionic/vue"; // Importer nødvendige Ionic komponenter
import { mapGetters } from 'vuex';

export default {
    components: {
        IonList,
        IonItem,
        IonLabel,
        IonButton,
    },
    computed: {
        ...mapGetters(['allRecipes']),
    },
    async mounted() {
        await this.$store.dispatch('fetchRecipes'); // Hent oppskrifter
    },
    methods: {
        addFavorite(recipe) {
            this.$store.commit('addFavorite', recipe); // Legg til oppskrift i favoritter
        }
    }
}
</script>