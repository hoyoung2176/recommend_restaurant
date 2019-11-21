<template>
  <div class="my-map">
      지역 검색
      <div id="map"></div>
  </div>
</template>

<script>
import gmapsInit from '@/utils/gmaps';
export default {
  name: 'myMap',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
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
    }
  },
  async mounted() { 
    const vm = this;
    const google = await gmapsInit();
    const geocoder = new google.maps.Geocoder(); // 주소를 좌표로 바꾸어주는 함수
    var address = '대한민국 대전광역시'
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        let map = new google.maps.Map(document.getElementById('map'), {
          center: results[0].geometry.location, // 대전광역시 주소를 위도 경도로 바꾼 데이터를 가지고 지도 가운데를 보여주는 것
          zoom: 15
        })
        let content = '디폴트주소입니다.'
        // vm.addMarker(map, results[0].geometry.location, address, content)
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  },

}
</script>

<style>
#map{
    width:100%;
    height:400px;
}
</style>
