<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>Logg inn</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-item>
                <ion-label position="floating">E-post</ion-label>
                <ion-input v-model="email" type="email"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Passord</ion-label>
                <ion-input v-model="password" type="password"></ion-input>
            </ion-item>
            <ion-buttons>
                <ion-button expand="full" @click="login">Logg inn</ion-button>
            </ion-buttons>
            <ion-button expand="full" @click="register">Registrer deg</ion-button>
            <ion-button expand="full" @click="loginWithGoogle">Logg inn med Google</ion-button>
        </ion-card-content>
    </ion-card>
</template>

<script>
import { db, auth } from '@/firebase'; // Importer auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; // Importer nødvendige autentiseringsfunksjoner

import {
    IonCard,
    IonCardHeader,
    IonLabel,
    IonCardTitle,
    IonItem,
    IonCardContent,
    IonButtons,
    IonButton,
    IonInput,
} from "@ionic/vue";

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    components: {
        IonCard,
        IonCardHeader,
        IonLabel,
        IonCardTitle,
        IonItem,
        IonCardContent,
        IonButtons,
        IonButton,
        IonInput,
    },
    methods: {
        async login() {
            try {
                await signInWithEmailAndPassword(auth, this.email, this.password);
                this.$router.push({ name: 'Home' }); // Naviger til hjemmeside ved vellykket innlogging
            } catch (error) {
                console.error(error);
                alert('Feil ved innlogging: ' + error.message);
            }
        },
        async register() {
            try {
                await createUserWithEmailAndPassword(auth, this.email, this.password);
                this.$router.push({ name: 'Home' }); // Naviger til hjemmeside ved vellykket registrering
            } catch (error) {
                console.error(error);
                alert('Feil ved registrering: ' + error.message);
            }
        },
        async loginWithGoogle() {
            try {
                const provider = new GoogleAuthProvider();
                await signInWithPopup(auth, provider);
                this.$router.push({ name: 'Home' }); // Naviger til hjemmeside ved vellykket innlogging
            } catch (error) {
                console.error(error);
                alert('Feil ved innlogging med Google: ' + error.message);
            }
        }
    }
}
</script>