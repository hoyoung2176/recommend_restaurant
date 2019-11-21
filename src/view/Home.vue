<template>
  <div id="home">
    <!-- <crawling></crawling> -->
    <Banner @send-message="getChildMessage"></Banner>    
    
    <div class="container">
      <core-maps class="mt-5"/>
      <core-places :field1="childMessage" ref="place"/>

    </div>

  </div>
</template>

<script>

import axios from 'axios'
  export default {
    name: "home",
    data () {
      return {
        childMessage: '대전광역시'
      }
    },
    components: {
      // components/core 폴더에있는 Maps.vue, Searchplace.vue 와 components 폴더에 있는 crawling.vue 열기
      CoreMaps: () => import('@/components/core/Maps'),
      crawling: () => import("@/components/crawling"),
      CorePlaces: () => import('@/components/core/Searchplace2'),
      Banner: () => import('@/components/home/Banner')
    },
    methods: {
      getChildMessage: function(text) {
        this.childMessage = text
        this.$refs.place.Search()
      }
    }
  }
</script>
<style>


.search-form{
  z-index: 1000;
}

</style>

