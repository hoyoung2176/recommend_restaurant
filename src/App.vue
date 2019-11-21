<template>
<v-app>

  <v-app-bar app>
    <Header></Header>
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
 

    <!-- Provides the application the proper gutter -->
    <!-- <v-container fluid> -->

      <!-- If using vue-router -->
      <router-view></router-view>
    <!-- </v-container> -->


  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>

<script>

import Header from './components/core/Header';
import Content from './components/core/Content';


	


export default {
  name: "app",
  data: ()=>({
    lastScrollPosition: 0
  }),
  components: { 
    Header,
    Content,

    
  },
  methods: {
    onScroll () {
    // Get the current scroll position
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
    // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
    if (currentScrollPosition < 0) {
      return
    }
    // Here we determine whether we need to show or hide the navbar
    this.showNavbar = currentScrollPosition < this.lastScrollPosition
    this.$store.commit('updateShowNavbar',this.showNavbar)
    // Set the current scroll position as the last scroll position
    this.lastScrollPosition = currentScrollPosition
  }
  },
  mounted () {
      window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll)
  }


};

</script>
<style>
.content {
  padding: 0;


}
</style>