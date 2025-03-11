<template>
    <ion-menu :content-id="contentId" side="start" menu-id="main">
        <ion-content>
            <ion-list>
                <ion-item button @click="goToHome">Hjem</ion-item>
                <ion-item button @click="goToLibrary">Bibliotek</ion-item>
                <!-- Add more menu items as needed -->
            </ion-list>
        </ion-content>
    </ion-menu>

    <ion-page :id="contentId">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button v-if="isHomePage" @click="toggleMenu"></ion-menu-button>
                    <ion-back-button v-else :default-href="'/'"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ pageTitle }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="goToProfile">Profil</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <slot></slot> <!-- Dette er hvor innholdet fra barna blir plassert -->
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonMenu,
    IonContent,
    IonList,
    IonItem,
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonMenuButton,
    IonBackButton,
} from "@ionic/vue";

export default {
    props: ['pageTitle'],
    components: {
        IonMenu,
        IonContent,
        IonList,
        IonItem,
        IonPage,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonButton,
        IonTitle,
        IonMenuButton,
        IonBackButton,
    },
    data() {
        return {
            contentId: 'main-content',
        };
    },
    computed: {
        isHomePage() {
            return this.$route.name === 'Home';
        },
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
        },
        toggleMenu() {
            const menu = document.querySelector('ion-menu');
            menu.open();
        },
    },
};
</script>

<style scoped>
/* Add additional styles if needed */
</style>