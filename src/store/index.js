import { createStore } from 'vuex';
import { db } from '@/firebase';
import { collection, getDocs, addDoc } from "firebase/firestore";

const store = createStore({
    state() {
        return {
            recipes: [],
            favoriteIds: [], // Store only IDs
        };
    },
    mutations: {
        setRecipes(state, recipes) {
            state.recipes = recipes;
        },
        addFavorite(state, recipeId) {
            if (!state.favoriteIds.includes(recipeId)) {
                state.favoriteIds.push(recipeId);
            }
        },
        removeFavorite(state, recipeId) {
            state.favoriteIds = state.favoriteIds.filter(id => id !== recipeId);
        },
        setUser(state, user) {
            state.user = user; // Setter brukeren
        }
    },
    actions: {
        async fetchRecipes({ commit }) {
            try {
                const querySnapshot = await getDocs(collection(db, "dinner-recipes"));
                const recipes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                commit('setRecipes', recipes);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        },
        async addNewRecipe({ state }, newRecipe) {
            try {
                // Bruk Firestore sin funksjon for å legge til oppskrift
                await addDoc(collection(db, "dinner-recipes"), newRecipe);
                console.log("Oppskrift lagt til!");
            } catch (error) {
                console.error("Feil ved legging til oppskrift: ", error);
            }

        },
        addToFavorites({ commit }, recipeId) {
            commit('addFavorite', recipeId);
            // Here you could add logic to save to database or localStorage
        },
        removeFromFavorites({ commit }, recipeId) {
            commit('removeFavorite', recipeId);
            // Here you could add logic to remove from database or localStorage
        },
        setUser({ commit }, user) {
            commit('setUser', user);
        }
    },
    getters: {
        allRecipes: state => state.recipes,
        favoriteRecipes: (state, getters) => {
            return state.favoriteIds.map(id => getters.allRecipes.find(recipe => recipe.id === id)).filter(Boolean);
        },
        isLoggedIn: state => !!state.user,
    }
});

export default store;