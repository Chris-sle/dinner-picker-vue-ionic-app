<template>
    <ion-menu :content-id="contentId" side="start" menu-id="main">
        <ion-content>
            <ion-list>
                <ion-item button @click="navigateAndClose('Home')">Hjem</ion-item>
                <ion-item button @click="navigateAndClose('RecipeLibrary')">Bibliotek</ion-item>
            </ion-list>
        </ion-content>
    </ion-menu>

    <ion-page :id="contentId" v-bind="$attrs">
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
            <slot></slot>
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
        async navigateAndClose(routeName) {
            await this.$router.push({ name: routeName });
            const menu = document.querySelector('ion-menu');
            menu.close();
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