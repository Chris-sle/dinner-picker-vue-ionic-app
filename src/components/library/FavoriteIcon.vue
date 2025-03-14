<template>
    <div @click.stop="toggleFavorite" class="favorite-icon">
        <ion-icon 
            :icon="isFavorited ? starFilled : starOutline" 
            :color="isFavorited ? 'warning' : 'large'"
        ></ion-icon>
    </div>
</template>

<script>
import { IonIcon } from "@ionic/vue";
import { starOutline, star } from 'ionicons/icons'; // Correct imports
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'FavoriteIcon',
    components: {
        IonIcon
    },
    props: {
        recipeId: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapGetters(['favoriteRecipes']),
        isFavorited() {
            return this.favoriteRecipes.some(recipe => recipe.id === this.recipeId);
        }
    },
    methods: {
        ...mapActions(['addNewFavorite', 'removeNewFavorite']),
        toggleFavorite() {
            if (this.isFavorited) {
                this.removeNewFavorite(this.recipeId);
            } else {
                this.addNewFavorite(this.recipeId);
            }
        }
    },
    data() {
        return {
            starOutline,
            starFilled: star // Assign the imported icon correctly
        };
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

ion-icon {
    font-size: 32px; /* Adjust the size as needed */
}
</style>
