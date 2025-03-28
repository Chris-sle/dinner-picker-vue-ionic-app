<template>
    <ion-modal :is-open="isOpen">
        <ion-header>
            <ion-toolbar>
                <ion-title>Legg til ny oppskrift</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="closeModal">Lukk</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <recipe-form @submitted="closeModal" />
        </ion-content>
    </ion-modal>
</template>

<script>
import RecipeForm from './RecipeForm.vue';
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent
} from "@ionic/vue";

export default {
    name: 'AddRecipeModal',
    components: {
        RecipeForm,
        IonModal,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonContent
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.$emit('close'); // Emit close event
        }
    }
}
</script>

<style scoped>
/* Your styles here if needed */
</style>
