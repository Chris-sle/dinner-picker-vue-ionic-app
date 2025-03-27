import { createStore } from 'vuex';
import { db, auth } from '@/firebase';
import { collection, getDocs, getDoc, addDoc, setDoc, doc } from "firebase/firestore";

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
            state.user = user;
        },
        setFavorites(state, favoriteIds) { // New mutation for setting favorites
            state.favoriteIds = favoriteIds;
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
            console.log('Submitting recipe:', newRecipe);
            try {
                // Bruk Firestore sin funksjon for å legge til oppskrift
                await addDoc(collection(db, "dinner-recipes"), newRecipe);
                console.log("Oppskrift lagt til!");
                await dispatch('fetchRecipes');
            } catch (error) {
                console.error("Feil ved legging til oppskrift: ", error);
                throw error;
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
                const docSnap = await getDoc(favoriteRef);

                // Check if the document exists, and create it if not
                if (!docSnap.exists()) {
                    await setDoc(favoriteRef, { userId: [] });
                    console.log("Created user favorites document.");
                }

                const existingFavorites = docSnap.data()?.favoriteIds || [];

                if (!existingFavorites.includes(recipeId)) {
                    // Log the favorite ID being added
                    console.log("Adding favorite:", recipeId);
                    await setDoc(favoriteRef, {
                        favoriteIds: [...existingFavorites, recipeId] // Update the favorites list
                    }, { merge: true });
                    console.log("Favorite added successfully.");
                } else {
                    console.log("Recipe is already favorited.");
                }

                commit('addFavorite', recipeId); // Update the Vuex state
            } catch (error) {
                console.error("Error saving favorite:", error);
            }
        },
        async removeNewFavorite({ commit }, recipeId) {
            commit('removeFavorite', recipeId); // Update local state immediately
        
            const userId = auth.currentUser?.uid; // Ensure user is logged in
            const favoriteRef = doc(db, "userFavorites", userId); // Reference user favorites document
        
            try {
                const docSnap = await getDoc(favoriteRef);
                if (docSnap.exists()) {
                    const existingFavorites = docSnap.data()?.favoriteIds || [];
                    const updatedFavorites = existingFavorites.filter(id => id !== recipeId);
        
                    await setDoc(favoriteRef, {
                        favoriteIds: updatedFavorites // Update the favorites list
                    }, { merge: true });
                    console.log("Favorite removed successfully.");
                } else {
                    console.error("User favorites document does not exist.");
                }
            } catch (error) {
                console.error("Error removing favorite:", error);
            }
        },
        async setUser({ commit }, user) {
            commit('setUser', user);
            if (user) {
                const favoriteRef = doc(db, "userFavorites", user.uid);
                const favoriteDoc = await getDoc(favoriteRef);
                if (favoriteDoc.exists()) {
                    commit('setFavorites', favoriteDoc.data().favoriteIds || []);
                }
            }
        },
        
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