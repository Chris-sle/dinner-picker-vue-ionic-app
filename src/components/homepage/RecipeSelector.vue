<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>Velg Kjøtt og Ingredienser</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-item>
                <ion-select v-model="selectedMeat" label="Type Mat" label-placement="floating">
                    <ion-select-option value="fjærfe">fjærfe</ion-select-option>
                    <ion-select-option value="storfe">Storfe</ion-select-option>
                    <ion-select-option value="svin">Svin</ion-select-option>
                    <ion-select-option value="vilt">Vilt</ion-select-option>
                    <ion-select-option value="fisk">Fisk</ion-select-option>
                    <ion-select-option value="skaldyr">Skalldyr</ion-select-option>
                    <ion-select-option value="egg">Egg</ion-select-option>
                    <ion-select-option value="vegetariansk">Vegetariansk</ion-select-option>
                </ion-select>
            </ion-item>

            <ion-item>
                <ion-select v-model="selectedIngredients" label="Ingredienser" label-placement="floating" multiple
                    interface="popover" placeholder="Velg ingredienser">
                    <ion-select-option v-for="ingredient in allIngredients" :key="ingredient.name"
                        :value="ingredient.name">
                        {{ ingredient.name }}
                    </ion-select-option>
                </ion-select>
            </ion-item>

            <ion-button expand="full" @click="filterRecipes">Finn Oppskrift</ion-button>
            <ion-button expand="full" color="light" @click="clearSelections">Clear Selections</ion-button>

            <recipe-list :recipes="filteredRecipes" v-if="filteredRecipes.length" />
            <div v-else>
                <p>Ingen oppskrifter funnet</p>
            </div>
        </ion-card-content>
    </ion-card>
</template>

<script>
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonButton
} from "@ionic/vue";
import RecipeList from './RecipeList.vue';

export default {
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonItem,
        IonSelect,
        IonSelectOption,
        IonButton,
        RecipeList
    },
    props: {
        recipes: Array
    },
    data() {
        return {
            selectedMeat: '',
            selectedIngredients: [],
            filteredRecipes: []
        };
    },
    computed: {
        allIngredients() {
            const ingredients = new Set();
            this.recipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredient => ingredients.add(ingredient.name));
            });
            return Array.from(ingredients).map(name => ({ name }));
        }
    },
    methods: {
        filterRecipes() {
            this.filteredRecipes = this.recipes.filter(recipe => {
                const matchesMainIngredient = recipe.type.toLowerCase() === this.selectedMeat;
                const matchesAllSelectedIngredients = this.selectedIngredients.every(ingredient =>
                    recipe.ingredients.map(ing => ing.name).includes(ingredient)
                );
                return matchesMainIngredient && matchesAllSelectedIngredients;
            });
        },
        clearSelections() {
            this.selectedMeat = '';
            this.selectedIngredients = [];
            this.filteredRecipes = [];
        }
    }
}
</script>