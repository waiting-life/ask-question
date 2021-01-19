<template>
  <div id="home">
    <home-header class="home-header"/>
    <router-view/>
  </div>
</template>
<script>
import HomeHeader from 'components/headers/HomeHeader'
export default {
  components: { 
    HomeHeader
  },
  data() {
     return {
    }
  },
  created() {
    
  },
  methods: {
    
  }
}
</script>
<style scoped>
  /* #home {
    position: relative;
  } */
</style>