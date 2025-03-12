<template>
    <div @click.stop="toggleFavorite" class="favorite-icon">
        <ion-icon :icon="isFavorited ? starFilled : starOutline" :color="isFavorited ? 'warning' : 'large'"></ion-icon>
    </div>
</template>

<script>
import { IonIcon } from "@ionic/vue";
import { star as starOutline } from 'ionicons/icons';
import { star as starFilled } from 'ionicons/icons';

export default {
    name: 'FavoriteIcon',
    components: {
        IonIcon
    },
    props: {
        isFavorited: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            starOutline,
            starFilled,
        };
    },
    methods: {
        toggleFavorite() {
            this.$emit('toggleFavorite'); // Emit the event for the parent to handle
        }
    }
}
</script>

<style scoped>
.favorite-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
}
</style>