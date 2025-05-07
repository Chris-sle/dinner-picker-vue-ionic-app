<template>
  <base-layout page-title="Profile">
    <user-favorites />
    <user-recipes />
    <change-password />
  </base-layout>
</template>

<script>
import UserFavorites from '../components/users/UserFavorites.vue';
import UserRecipes from '../components/users/UserRecipes.vue';
import ChangePassword from '../components/users/ChangePassword.vue';

export default {
  name: 'UserProfilePage',
  components: {
    UserFavorites,
    UserRecipes,
    ChangePassword
  }
}
</script>
