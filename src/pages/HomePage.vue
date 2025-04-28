<template>
  <base-layout page-title="Velg Oppskrift">
    <recipe-selector :recipes="allRecipes" />
  </base-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import RecipeSelector from '@/components/homepage/RecipeSelector.vue';

export default {
  name: 'Home',
  components: {
    RecipeSelector
  },
  computed: {
    ...mapGetters(['allRecipes'])
  },
  async mounted() {
    await this.$store.dispatch('fetchRecipes'); // Fetch recipes on component mount
  },
}
</script>
