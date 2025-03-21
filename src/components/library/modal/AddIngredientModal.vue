<template>
    <ion-modal :is-open="isOpen">
        <ion-header>
            <ion-toolbar>
                <ion-title>Legg til ingrediens</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="closeModal">Lukk</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <form @submit.prevent="submitIngredient">
                <ion-item>
                    <ion-input label="Ingrediens navn" label-placement="floating" v-model="localIngredient.name"
                        required placeholder="Navn på ingrediens">
                    </ion-input>
                </ion-item>
                <ion-item>
                    <ion-input label="Mengde" label-placement="floating" v-model="localIngredient.amount" required
                        placeholder="Skriv inn mengde">
                    </ion-input>
                </ion-item>
                <ion-button type="button" @click="addIngredient" expand="block" class="ion-margin-top">
                    Legg til flere ingredienser
                </ion-button>
            </form>
        </ion-content>
    </ion-modal>
</template>

<script>
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonLabel, IonInput } from "@ionic/vue";

export default {
    name: 'AddIngredientModal',
    components: {
        IonModal,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonContent,
        IonItem,
        IonLabel,
        IonInput
    },
    data() {
        return {
            localIngredient: { name: '', amount: '' }
        };
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        ingredient: {
            type: Object,
            required: true
        }
    },
    watch: {
        ingredient: {
            immediate: true,
            handler(newVal) {
                this.localIngredient = { ...newVal };
            }
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        submitIngredient() {
            console.log("Submitting ingredient:", this.localIngredient); // Log the current ingredient object
            if (this.localIngredient.name && this.localIngredient.amount) {
                this.$emit('submit', { ...this.localIngredient });
                this.closeModal();
            } else {
                alert("Please provide both name and amount!"); // Alert for missing data
            }
        }
    }
}
</script>
