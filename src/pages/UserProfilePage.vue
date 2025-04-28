<template>
  <base-layout page-title="Profile">
    <user-favorites />
    <user-recipes />
  </base-layout>
</template>

<script>

import UserFavorites from '../components/users/UserFavorites.vue';
import UserRecipes from '../components/users/UserRecipes.vue';

export default {
  name: 'UserProfilePage',
  components: {
    
    UserFavorites,
    UserRecipes
  }
}
</script>
