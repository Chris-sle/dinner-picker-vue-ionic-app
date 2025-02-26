<template>
  <base-layout page-title="Velg Oppskrift">
    <recipe-selector @findRecipe="handleRecipeSelection"></recipe-selector>
  </base-layout>
</template>

<script>
import RecipeSelector from '@/components/homepage/RecipeSelector.vue';

export default {
  name: 'HomePage',
  components: {
    RecipeSelector
  },
  methods: {
    handleRecipeSelection(recipe) {
      // Logikk for hva som skjer når oppskriften er valgt
      console.log('Valgt oppskrift:', recipe);
    }
  }
}
</script>