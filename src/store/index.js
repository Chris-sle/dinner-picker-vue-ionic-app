import { createStore } from 'vuex';
import { db } from '@/firebase'; // Importer Firebase
import { collection, getDocs } from "firebase/firestore";

const store = createStore({
  state() {
    return {
      recipes: [],          // For å lagre oppskrifter
      favorites: [],        // For å lagre favorittoppskrifter
    };
  },
  mutations: {
    setRecipes(state, recipes) {
      state.recipes = recipes; // Setter oppskrifter til state
    },
    addFavorite(state, recipe) {
      state.favorites.push(recipe); // Legger til favorittoppskrift
    },
    removeFavorite(state, recipeId) {
      state.favorites = state.favorites.filter(recipe => recipe.id !== recipeId); // Fjerner favorittoppskrift
    }
  },
  actions: {
    async fetchRecipes({ commit }) {
      const querySnapshot = await getDocs(collection(db, "oppskrifter")); // Hente oppskrifter fra Firestore
      const recipes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      commit('setRecipes', recipes); // Kalle mutasjonen for å lagre oppskrifter
    }
  },
  getters: {
    allRecipes(state) {
      return state.recipes; // Returnerer alle oppskrifter
    },
    allFavorites(state) {
      return state.favorites; // Returnerer favoritter
    }
  }
});

export default store;