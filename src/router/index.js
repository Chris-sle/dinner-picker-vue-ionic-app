import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../pages/HomePage.vue';
import RecipeLibraryPage from '../pages/RecipeLibraryPage.vue';
import UserProfilePage from '../pages/UserProfilePage.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
