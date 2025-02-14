<template>
  <base-layout page-title="Time for Dinner!">
    <grid></grid>
  </base-layout>
</template>

<script>

import grid from '@/components/grid.vue'

export default {
  name: 'HomePage',
  components: {
    grid
  },
  // other component options
}

</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
