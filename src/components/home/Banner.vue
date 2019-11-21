<template>
<div container id="searchbar">
  <base-card dark>
    <v-img
      id = "bgimg"
      class="grey lighten-2"
      height="700"
      width="100%"
      :src="require('@/assets/img/banners2.jpg')" >
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