<template>
  <v-card>
    <v-card-title
        class="headline grey lighten-2"
        primary-title
    >
    {{ places.result.name }}
    </v-card-title>

    <v-card-text>
    <h3>평점 : {{ places.result.rating }}</h3>
    <!-- <core-maps class="mt-5"/> -->
    <div id="map"></div>
    <p>전화번호 : {{ places.result.formatted_phone_number }}</p>
    <!-- <p>open time:</p><p v-for="opentime in places.result.opening_hours.weekday_text"> {{ opentime }}</p> -->
    
    
      <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">OVERLINE</div>
        <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn text>Button</v-btn>
      <v-btn text>Button</v-btn>
    </v-card-actions>
  </v-card>


    <!-- 우리리뷰 -->
    <v-layout v-flex row nowrap >
        <v-card v-for="review of allReviews"
        class=" recard mx-auto ml-auto mt-5"
        :flat="flat"
        :loading="loading"
        :outlined="outlined"
        :elevation="elevation"
        :raised="raised"
        :width="50"
        :margin="20"
        >
        <!-- v-if="media" 추가하가 -->
        <v-img
            class="white--text"
            height="200px"
            :src= "imgURL1+review.imageName+imgURL2"
        >
        <v-card-title class="align-end fill-height">{{review.title}} </v-card-title>
        <!-- v-else -->
            <!-- <v-card-title class="align-end fill-height">I'm a title</v-card-title> -->
        </v-img>
        
        
        <v-card-text>{{review.content}}</v-card-text>
        <v-card-actions >
            <v-btn icon>
            <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn text>Click</v-btn>
            <v-btn outlined>Click</v-btn>
        </v-card-actions>
        </v-card>
    </v-layout>

    <!-- 구글 지도리뷰 -->
    <v-card
      class="mx-auto my-2"
      color="#26c6da"
      dark
      v-for="review in places.result.reviews"
    >


      <v-card-text class="headline font-weight-bold">
        {{ review.text }}
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              :src="review.profile_photo_url"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ review.author_name }}</v-list-item-title>
          </v-list-item-content>

          <v-layout
            align-center
            justify-end
          >
            <p>평점: {{ review.rating }}</p>

            <p>{{ review.relative_time_description }}에 작성한 글입니다.</p>
            <v-icon class="mr-1">mdi-heart</v-icon>
            <span class="subheading mr-2">256</span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1">mdi-share-variant</v-icon>
            <span class="subheading">45</span>
          </v-layout>
        </v-list-item>
      </v-card-actions>
    </v-card>


    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
        color="primary"
        text
        @click="dialog = false"

    >
        I accept
    </v-btn>
    </v-card-actions>
</v-card>
</template>


<script>
import axios from 'axios'
import gmapsInit from '@/utils/gmaps';
import FirebaseService from "@/plugins/FirebaseService";
import "firebase/firestore";

  export default {
    name: "home",
    props: {
      // 부모로부터 장소 받아오기
      place_id: {type: String}
    },
    data () {
    return {
        place_id:'',
        places:[],
        allReviews:[]
      }
    },
    components: {
      // core 폴더에있는 Maps.vue 열기
      CoreMaps: () => import('@/components/core/Maps'),
    },
    methods: {
      addMarker: function (map, latlong, title, content) {
        // addMarker: function () {
        var markerOptions = {
          position: latlong,
          map: map,
          title: title,
          clickable: true,
        }
        var marker = new google.maps.Marker(markerOptions);
        var infoWindowOption ={
          content: content,
          position: latlong,
        }
        var infoWindow = new google.maps.InfoWindow(infoWindowOption);
        google.maps.event.addListener(marker, "click", function(){
          infoWindow.open(map);
        })
      },
      async placeJson () {
        const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
        const placeid = this.place_id
        const placeURI = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='
        const LastURI = '&fields=name,rating,reviews,opening_hours,geometry,photos,formatted_phone_number&key=AIzaSyBT8azQ9qnlsbv9r2gBYE7b6Dn2bEWyz5U'
        const URL = PROXY_URL + placeURI + placeid + LastURI;
        await axios.get(URL)
          .then((result) => {
            this.places = result.data
          })
          .catch(e => {
            console.log(e)
          })
        var vm = this;
        const google = await gmapsInit();
        const geocoder = new google.maps.Geocoder();

        let map = new google.maps.Map(document.getElementById('map'), {
          center: vm.places.result.geometry.location,
          zoom: 17
        })
        vm.addMarker(map, vm.places.result.geometry.location, vm.places.result.name , vm.places.result.rating)
        this.allReviews = FirebaseService.getPlaceReviews(this.place_id);
      },

    },
    mounted () {
      this.placeJson()
      
    }

  }


</script>