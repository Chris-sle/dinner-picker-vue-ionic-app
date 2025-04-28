import { createRouter, createWebHistory } from '@ionic/vue-router';
import Auth from '../components/base/auth.vue';
import HomePage from '../pages/HomePage.vue';
import RecipeLibraryPage from '../pages/RecipeLibraryPage.vue';
import UserProfilePage from '../pages/UserProfilePage.vue';
import { auth } from '@/firebase';


const routes = [
  { path: '/', redirect: '/auth' },
  { path: '/auth', name: 'Auth', component: Auth },
  { path: '/home', name: 'Home', component: HomePage },
  { path: '/recipe-library', name: 'RecipeLibrary', component: RecipeLibraryPage },
  { path: '/userprofile', name: 'UserProfile', component: UserProfilePage },
  { path: '/recipedetails/:id', name: 'RecipeDetails', component: () => import('../pages/RecipeDetailsPage.vue') },
  { path: '/:catchAll(.*)', redirect: '/home' } 
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (to.name !== 'Auth' && !user) next({ name: 'Auth' });
  else if (to.name === 'Auth' && user) next({ name: 'Home' });
  else next();
});

export default router
