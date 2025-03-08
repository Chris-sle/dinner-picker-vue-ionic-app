<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>Logg inn</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-item>
                
                <ion-input ref="emailInput" @model="email" type="email" fill="solid" label="E-post"
                    label-placement="floating":clear-input="true" error-text="Ugyldig e-post"
                    @ionInput="validateEmail" @ionBlur="markEmailTouched"></ion-input>
            </ion-item>
            <ion-item>
                
                <ion-input ref="password" @model="password" type="password" fill="solid" label="Passord"
                    label-placement="floating"></ion-input>
            </ion-item>
            
                <ion-button expand="full" @click="$emit('login', { email, password })">Logg inn</ion-button>
                <ion-button expand="full" @click="$emit('register', { email, password })">Registrer deg</ion-button>
                <ion-button expand="full" @click="$emit('loginWithGoogle')">Logg inn med Google</ion-button>
            
        </ion-card-content>
    </ion-card>
</template>

<script>
import { IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButtons } from "@ionic/vue";

export default {
    components: {
        IonItem,
        IonLabel,
        IonInput,
        IonButton,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardTitle,
        IonButtons,
    },
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        validateEmail(event) {
            const value = event.target.value;
            const emailInput = this.$refs.emailInput.$el;

            emailInput.classList.remove('ion-valid');
            emailInput.classList.remove('ion-invalid');

            if (value === '') return;

            this.isValidEmail(value)
                ? emailInput.classList.add('ion-valid')
                : emailInput.classList.add('ion-invalid');
        },
        markEmailTouched() {
            this.$refs.emailInput.$el.classList.add('ion-touched');
        },
        isValidEmail(email) {
            return email.match(
                /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            );
        },
    },
};
</script>