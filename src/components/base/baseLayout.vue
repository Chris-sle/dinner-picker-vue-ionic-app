<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ pageTitle }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="goToProfile">Profil</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <slot></slot> <!-- Dette er hvor innholdet fra barna blir plassert -->
        </ion-content>

        <ion-footer>
            <ion-toolbar>
                <ion-buttons>
                    <ion-button @click="goToHome">Hjem</ion-button>
                    <ion-button @click="goToLibrary">Bibliotek</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonFooter,
} from "@ionic/vue";

export default {
    props: ['pageTitle'],
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonButtons,
        IonButton,
        IonFooter,
    },
    methods: {
        goToHome() {
            this.$router.push({ name: 'Home' });
        },
        goToLibrary() {
            this.$router.push({ name: 'RecipeLibrary' });
        },
        goToProfile() {
            this.$router.push({ name: 'UserProfile' });
        }
    }
}
</script>