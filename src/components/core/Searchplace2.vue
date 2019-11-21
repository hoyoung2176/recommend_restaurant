<template>
  <div class="myplace">
    <!-- 장소목록(card) -->
    <v-container grid-list-md text-center>
      <v-layout row wrap>

      <v-flex xs4 v-for="place in places" v-bind:key="place.id">
        <!-- 장소 Detail을 위한 링크 및 주소 값에 place의 고유 아이디 보내기 -->
        
        <v-card
          class="card mx-auto"
          append
        >
          <v-img
            class="white--text"
            height="200px"
            v-if="place.photos.length>0"
            v-for="temp in place.photos"
            :src="photoURL1+temp.photo_reference+photoURL2" 
          >
            <v-card-title class="align-end fill-height">{{ place.name }}</v-card-title>
          </v-img>
          <v-card-title>{{ place.name }} {{ place.rating }}</v-card-title>

          <v-card-text>{{ place.plus_code.compound_code.substring(8, place.plus_code.compound_code.length) }} {{ place.vicinity }}</v-card-text>
          
        
          <v-card-actions>

            <!-- 좋아요 -->
            <v-btn>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            
            <!-- modal -->
            <v-dialog
                v-model="dialog"
                width="500"
            >
            <template v-slot:activator="{ on }">
                <v-btn
                    color="red lighten-2"
                    dark
                    v-on="on"
                >
                    Click Me
                </v-btn>
                
            </template>
            <core-dialogs :place_id="place.place_id" ref="modal"/>
            
            </v-dialog>

          </v-card-actions>
        </v-card>
        
      </v-flex>
      
      </v-layout>

    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import gmapsInit from '@/utils/gmaps';
export default {
  name: 'myplace',
  components: {
    CoreDialogs: () => import('@/components/core/Dialog')

  },
  props: {
    // 부모로부터 장소 받아오기
    field1: {type: String}
  },
  data () {
      return {
        // 검색한 장소 주변 음식점 목록
        places:[],

        // 지도 검색한 곳의 중앙 위치
        centerlat:0,
        centerlng:0,

        name:'vueJS',

        // 검색된 장소들의 사진 주소를 넣기 위한 URL
        photoURL1: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=",
        photoURL2: "&key=AIzaSyBT8azQ9qnlsbv9r2gBYE7b6Dn2bEWyz5U"
      }
    },
  computed: {
  },
  methods: {
    async Search() {

        // 구글 지도를 google 변수에 할당
        const google = await gmapsInit();

        // 구글 맵의 Geocoder 함수(장소의 이름을 위도와 경도로 변환해주는 함수)
        const geocoder = new google.maps.Geocoder();

        // 검색한 주소 임시 할당
        var address = this.field1

        // 2중함수 안에서 data를 가리키기 위한 임의의 변수
        var vm = this;

        // 위도, 경도로 변환
        geocoder.geocode( { 'address': address}, function(results, status) {

            //변환 성공 시
            if (status == 'OK') {
                // data 변수에 중앙 위도, 경도 할당
                vm.centerlat = results[0].geometry.location.lat()     // 위도
                vm.centerlng = results[0].geometry.location.lng()     // 경도
                let map = new google.maps.Map(document.getElementById('map'), {
                    center: results[0].geometry.location,
                    zoom: 15
            })

            // cors 문제를 해결하기 위한 URL
            const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

            // google place api URL
            const PLACE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
            const LAST_URL ='&radius=1500&type=restaurant&key=AIzaSyBT8azQ9qnlsbv9r2gBYE7b6Dn2bEWyz5U'
            const URL = PROXY_URL + PLACE_URL + vm.centerlat + ',' + vm.centerlng + LAST_URL

            // api 를 이용하여 데이터 가져옴
            axios.get(URL)
                .then((response) => {
                    // 결과값을 data에 할당
                    vm.places = response.data.results
                    
                    // vm.addMarker(map, results[0].geometry.location, address, address)

                    // 장소에 marker와 이름정보 할당
                    for (let i = 0; i<vm.places.length; i++) {
                        vm.addMarker(map, vm.places[i].geometry.location, vm.places[i].name, vm.places[i].name)
                    }

                    // 평점기준으로 정렬
                    const sortingField = "rating"
                    vm.places.sort(function(a,b) {
                        for (let i = 0; i<vm.places.length; i++) {
                            // 평점이 없는것은 임의적으로 0을 할당
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
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    },
    addMarker: function (map, latlong, title, content) {
        // addMarker: function () {

        // marker option
        var markerOptions = {
            position: latlong,
            map: map,
            title: title,
            clickable: true,
        }

        // marker
        var marker = new google.maps.Marker(markerOptions);

        // marker를 눌렀을때 장소에대한 정보 출력
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
}
</script>