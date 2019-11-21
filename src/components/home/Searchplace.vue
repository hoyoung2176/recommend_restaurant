<template>
<div container>
    <place-autocomplete-field v-model="field1" placeholder="Enter an an address, zipcode, or location" label="" name="field1" api-key="AIzaSyAhSv9zWvisiTXRPRw6K8AE0DCmrRMpQcU"></place-autocomplete-field>
    <div v-if="field1" class="alert alert-info">
      Current Value: {{ field1 }}
    </div>
    
    <v-btn  tile
            color="success"
            depressed
            round
            v-on:click="Search"
            @childs-event
          >
            GO!
          </v-btn>
</div>
</template>


<script>
import axios from 'axios'
import https from 'https';
import gmapsInit from '@/utils/gmaps';

  export default {
    name: "home",
    props: {
      field1: {type: String}
    },
    data () {
      return {
        field1 : '',
        places:[],
        centerlat:0,
        centerlng:0,
      }
    },
    components: {
      // core 폴더에있는 Maps.vue 열기
      CoreMaps: () => import('@/components/core/Maps'),
      crawling: () => import("@/components/crawling"),
      Banner: () => import('@/components/home/Banner'),
    },
    methods: {
      async Search() {
        const google = await gmapsInit();
        const geocoder = new google.maps.Geocoder();
        var address = this.field1
        address
        var vm = this;
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == 'OK') {
            vm.centerlat = results[0].geometry.location.lat()     // 위도
            vm.centerlng = results[0].geometry.location.lng()     // 경도
            let map = new google.maps.Map(document.getElementById('map'), {
              center: results[0].geometry.location,
              zoom: 12
            })
            const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
            const PLACE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
            const LAST_URL ='&radius=1500&type=restaurant&key=AIzaSyBT8azQ9qnlsbv9r2gBYE7b6Dn2bEWyz5U'
            const URL = PROXY_URL + PLACE_URL + vm.centerlat + ',' + vm.centerlng + LAST_URL
            axios.get(URL)
              .then((response) => {
                vm.places = response.data.results
                const sortingField = "rating"
                // vm.addMarker(map, results[0].geometry.location, address, address)
                for (let i = 0; i<vm.places.length; i++) {
                  vm.addMarker(map, vm.places[i].geometry.location, vm.places[i].name, vm.places[i].name)
                }
                vm.places.sort(function(a,b) {
                  for (let i = 0; i<vm.places.length; i++) {
                    if (vm.places[i][sortingField]) {
                      
                    } else{
                      vm.places[i][sortingField] = 0
                    }
                  }
                  
                  return b[sortingField] - a[sortingField];
                })
              })
              .catch(e => {
                console.log(e)
              })

          } else {
            console.log(field1)
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      },
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
      }
    },
    mounted () {
    },
  }
</script>
<style>
.container {
    /* remember to set a width */
    margin-right: auto;
    margin-left: auto;
}
</style>