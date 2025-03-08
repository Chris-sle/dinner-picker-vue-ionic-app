<template>
    <InputFormComponent @login="login" @register="register" @loginWithGoogle="loginWithGoogle" />
</template>

<script>
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import InputFormComponent from '../login/InputFormComponent.vue';

export default {
    components: {
        InputFormComponent,
    },
    methods: {
        async login({ email, password }) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                this.$router.push({ name: 'Home' });
            } catch (error) {
                console.error(error);
                alert('Feil ved innlogging: ' + error.message);
            }
        },
        async register({ email, password }) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                this.$router.push({ name: 'Home' });
            } catch (error) {
                console.error(error);
                alert('Feil ved registrering: ' + error.message);
            }
        },
        async loginWithGoogle() {
            try {
                const provider = new GoogleAuthProvider();
                await signInWithPopup(auth, provider);
                this.$router.push({ name: 'Home' });
            } catch (error) {
                console.error(error);
                alert('Feil ved innlogging med Google: ' + error.message);
            }
        }
    }
}
</script>