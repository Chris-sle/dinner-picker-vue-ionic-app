<template>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="handleClick">
            <ion-icon :icon="icon"></ion-icon>
        </ion-fab-button>
    </ion-fab>
</template>

<script>
import { IonFab, IonFabButton, IonIcon } from "@ionic/vue";

export default {
    name: 'ModalButton',
    components: {
        IonFab,
        IonFabButton,
        IonIcon
    },
    props: {
        icon: {
            type: String,
            required: true
        },
        onClick: {
            type: Function,
            required: true
        }
    },
    methods: {
        handleClick() {
            this.onClick(); // Trigger the click event from props
        }
    }
}
</script>
