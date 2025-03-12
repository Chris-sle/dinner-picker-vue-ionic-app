import { createStore } from 'vuex';
import { db, auth } from '@/firebase';
import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";

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
                console.log(recipes)
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
        async addNewFavorite({ commit }, recipeId) {
            const userId = auth.currentUser?.uid; // Ensure you're getting the user ID
            if (!userId) {
                console.error("User is not logged in, cannot save favorite.");
                return;
            }

            const favoriteRef = doc(db, "userFavorites", userId); // Reference to the user's favorites document

            try {
                // Check if the favorites document already exists
                const docSnap = await getDoc(favoriteRef);

                if (!docSnap.exists()) {
                    // If it doesn't exist, create it with an empty favoriteIds array
                    await setDoc(favoriteRef, { favoriteIds: [] });
                }

                // Then, add the recipe ID to the user's favoriteIds
                const existingFavorites = docSnap.data()?.favoriteIds || [];

                if (!existingFavorites.includes(recipeId)) {
                    await setDoc(favoriteRef, {
                        favoriteIds: [...existingFavorites, recipeId] // Update the favorites list
                    }, { merge: true });
                }
                commit('addFavorite', recipeId); // Update the Vuex state
            } catch (error) {
                console.error("Error saving favorite:", error);
            }
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