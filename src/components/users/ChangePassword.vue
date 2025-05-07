<template>
    <ion-card>
        <ion-card-header @click="togglePasswordForm">
            <ion-card-title>{{ showPasswordForm ? 'Hide' : 'Change Password' }}</ion-card-title>
        </ion-card-header>
        <ion-card-content v-if="showPasswordForm">
            <form @submit.prevent="changePassword">
                <ion-item>
                    <ion-input label="New Password" label-placement="floating" v-model="newPassword" type="password"
                        required placeholder="Enter new password">
                    </ion-input>
                </ion-item>

                <ion-item>
                    <ion-input label="Confirm New Password" label-placement="floating" v-model="confirmPassword"
                        type="password" required placeholder="Confirm new password">
                    </ion-input>
                </ion-item>

                <ion-button expand="full" type="submit">Change Password</ion-button>
                <ion-button expand="full" color="medium" @click="resetForm">Reset</ion-button>
                <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            </form>
        </ion-card-content>
    </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'ChangePassword',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonItem,
        IonInput,
        IonButton
    },
    setup() {
        const store = useStore();

        const newPassword = ref('');
        const confirmPassword = ref('');
        const errorMessage = ref('');
        const showPasswordForm = ref(false);

        const togglePasswordForm = () => {
            showPasswordForm.value = !showPasswordForm.value;
        };

        const changePassword = async () => {
            if (newPassword.value !== confirmPassword.value) {
                errorMessage.value = "Passwords do not match.";
                return;
            }
            try {
                await store.dispatch('changePassword', newPassword.value);
                newPassword.value = ''; 
                confirmPassword.value = '';
                errorMessage.value = '';
            } catch (error) {
                errorMessage.value = 'Failed to change password: ' + error.message; 
            }
        };

        const resetForm = () => {
            newPassword.value = '';
            confirmPassword.value = '';
            errorMessage.value = '';
        };

        return {
            newPassword,
            confirmPassword,
            changePassword,
            resetForm,
            errorMessage,
            showPasswordForm,
            togglePasswordForm
        };
    }
}
</script>

<style scoped>
.error {
    color: red;
    /* Error message styling */
}
</style>