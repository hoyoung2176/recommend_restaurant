<template>
  <div id="home">
    <h1>{{ places.result.name }}</h1>
    <h3>평점 : {{ places.result.rating }}</h3>
    <p>주소 : {{ places.result.geometry.location }}</p>
    <p>전화번호 : {{ places.result.formatted_phone_number }}</p>
    <p>open time: {{ places.result.opening_hours }}</p>
    <ul>
      <li v-for="review in places.result.reviews">
        <img :src="review.profile_photo_url" alt="">
        <p>이름:{{ review.author_name }}</p> 
        <p>평점: {{ review.rating }}</p>
        <p>내용: {{ review.text }}</p>
        <p>{{ review.relative_time_description }}에 작성한 글입니다.</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import https from 'https';
import gmapsInit from '@/utils/gmaps';

  export default {
    name: "home",
    created() {
      this.place_id = this.$route.params.id;
    },
    data () {
    return {
        place_id:'',
        places:[],
      }
    },
    components: {
      // core 폴더에있는 Maps.vue 열기
      CoreMaps: () => import('@/components/core/Maps'),
    },
    methods: {
      placeJson: function () {
        const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
        const placeid = this.place_id
        const placeURI = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='
        const LastURI = '&fields=name,rating,reviews,opening_hours,geometry,photos,formatted_phone_number&key=AIzaSyBT8azQ9qnlsbv9r2gBYE7b6Dn2bEWyz5U'
        const URL = PROXY_URL + placeURI + placeid + LastURI;
        axios.get(URL)
          .then((result) => {
            this.places = result.data
          })
          .catch(e => {
            console.log(e)
          })
      },
    },
    mounted () {
      this.placeJson();
    },

  }
</script>