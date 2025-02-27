import { createRouter, createWebHistory } from '@ionic/vue-router';
import Auth from '../components/base/auth.vue';
import HomePage from '../pages/HomePage.vue';
import RecipeLibraryPage from '../pages/RecipeLibraryPage.vue';
import UserProfilePage from '../pages/UserProfilePage.vue';
import RecipeDetailsPage from '../pages/RecipeDetailsPage.vue';
import { auth } from '@/firebase'; // Importer auth fra Firebase

const routes = [
  {
    path: '/',
    redirect: '/auth' // Omdirigere til Auth-siden ved oppstart
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth // Legg til Auth-ruten
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/recipelibrary',
    name: 'RecipeLibrary',
    component: RecipeLibraryPage
  },
  {
    path: '/userprofile',
    name: 'UserProfile',
    component: UserProfilePage
  },
  {
    path: '/recipedetails',
    name: 'RecipeDetailsPage',
    component: RecipeDetailsPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = auth.currentUser; // Sjekk den nåværende brukerens status
  if (to.name !== 'Auth' && !user) { // Hvis brukeren ikke er logget inn
    next({ name: 'Auth' }); // Omdirigere til Auth
  } else {
    next(); // Fortsett til den ønskede ruten
  }
});

export default router
