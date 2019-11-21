<template>
<div container id="searchbar">
  <base-card dark>
  <!-- slides -->
  <vueper-slides autoplay>
  <v-icon slot="pausedIcon" large color="white">pause_circle_outline</v-icon>
  <vueper-slide v-for="(slide, i) in slides"
    :key="slide.id"
    :title="slide.title"
    :content="slide.content"
    :style="'background-color: ' + colors[i % 4]"></vueper-slide>
</vueper-slides>

      <v-layout
        fill-height
        align-center
        pa-3
      >
        <v-flex
          xs12
          md6
          offset-md3
        >
          <h1 class="display-3 font-weight-medium text-white font-italic text-center ">
            Hello, BACON
          </h1>
          <div class="subheading green--text text-center pl-5 mb-4">
            Finding your taste
          </div>
          
          <!-- 검색엔진 -->
          <div container>
            <place-autocomplete-field v-model="field1" placeholder="Enter an an address, zipcode, or location" label="" name="field1" api-key="AIzaSyAhSv9zWvisiTXRPRw6K8AE0DCmrRMpQcU"></place-autocomplete-field>
            <v-btn  tile
                    rounded
                    color="success"
                    depressed
                    v-on:click="Search"
            >
              GO!
            </v-btn>
          </div>

        </v-flex>
      </v-layout>
    </v-img>
  </base-card>
  </div>
</template>
<script>
// In your VueJS component.
import { VueperSlides, VueperSlide } from 'vueperslides'

// Since v. 1.6.0, you need to include Vueper Slides CSS file for default styles.
import 'vueperslides/dist/vueperslides.css'


export default {
    name: "home",
    data () {
      return {
        field1 : '',
      }
    },








    
    methods:{
      Search(){
        this.$emit('send-message', this.field1)
      }
    },

    components:{
        VueperSlides, VueperSlide

    }
    
}
</script>
<style>
.bgimg {
    min-height: 100%;
    margin-top: 50px;

}
.main {
    color: aliceblue;
    
}
.searchbar {
    /* remember to set a width */
    margin-right: auto;
    margin-left: auto;
}