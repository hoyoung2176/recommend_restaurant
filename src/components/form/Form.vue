
<template>
<div>
<!-- 1 글 제목 -->
<v-text-field
    v-model="title"
    :counter="100"
    label="제목" required>
</v-text-field>
<!-- 2 주소 검색해서 저장하기 -->
 <place-autocomplete-field v-model="field2" placeholder="Enter an an address, zipcode, or location" label="" name="field2" api-key="AIzaSyAhSv9zWvisiTXRPRw6K8AE0DCmrRMpQcU"></place-autocomplete-field>
<v-btn  tile
                    rounded
                    color="success"
                    depressed
                    v-on:click="Search"
            >
              GO!
            </v-btn>
<!-- 3 평점 주기.. -->

<star-rating
    v-model="star"
    label="rating" required
  
     v-bind:increment="0.5"
     v-bind:max-rating="5"
     inactive-color="#bfbfba"
     active-color="#f5e85d"
     v-bind:star-size="30"
    >
</star-rating>
<!-- 4 이미지 업로드 버튼 구현 -->
  <div>
    <v-btn v-model="imageUrl"
      class="mt-3"
      @click.native="selectFile"
      v-if="!uploadEnd && !uploading">
        IMAGE
        <v-icon
        right
        aria-hidden="true">
          mdi-plus
        </v-icon>
    </v-btn>
    <input
      id="files"
      type="file"
      name="file"
      ref="uploadInput"
      accept="image/*"
      :multiple="true"
      @change="detectFiles($event)" />
      <v-progress-circular
        v-if="uploading && !uploadEnd"
        :size="80"
        :width="10"
        :rotate="360"
        :value="progressUpload"
        color="primary">
        %
      </v-progress-circular>
      <img
        v-if="uploadEnd"
        :src="downloadURL"
        width="100%" />
      <div v-if="uploadEnd">
        <v-btn
          class="ma-0"
          dark
          small
          color="error"
          @click="deleteImage()"
          >
          Delete
        </v-btn>
      </div>
  </div>
<v-form class="mt-4">
<v-flex >
  <vue-simplemde v-model="content" ref="markdownEditor" label="내용" required />

</v-flex>
</v-form>
<v-btn class="ma-2" tile color="success" v-on:click="createReview" ><v-icon left>mdi-pencil</v-icon>작성하기</v-btn>

</div>

</template>

<script src="https://www.gstatic.com/firebasejs/6.3.3/firebase-app.js"></script>
<script>
const config = {
	apiKey: "AIzaSyBvq1MIeEOkugWEOLCV_pWg-t14LoIWIpc",
	authDomain: "web-mobile-final.firebaseapp.com",
	databaseURL: "https://web-mobile-final.firebaseio.com",
	projectId: "web-mobile-final",
	storageBucket: "web-mobile-final.appspot.com",
	messagingSenderId: "558432609414",
	appId: "1:558432609414:web:6c1f9bc3c1de52f8"
}

firebase.initializeApp(config)


import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'

import StarRating from 'vue-star-rating'
// import { unlink } from 'fs';
import FirebaseService from "@/plugins/FirebaseService"
import axios from 'axios'
import gmapsInit from '@/utils/gmaps';



export default {
    name: 'Form',
    components: {
        VueSimplemde,
        StarRating,
        FirebaseService
    },
    
    data() {
        return {
            name:'',
            title: '',
            content:'',
            field2:'',
            body: '',
            imageUrl: '',
            progressUpload: 0,
            fileName: '',
            uploadTask: '',
            uploading: false,
            uploadEnd: false,
            downloadURL: '',
                  // 지도 주소 받기
            places:[],
            likeUser:[]
        }
    },
      methods: {
    selectFile () {
      this.$refs.uploadInput.click()
    },
    detectFiles (e) {
      let fileList = e.target.files || e.dataTransfer.files
      Array.from(Array(fileList.length).keys()).map(x => {
        this.fileName = fileList[x].name
        // uploades 함수 실행하게
        this.uploades(fileList[x])
      })
    },
    uploades (img){
      // console.log(img)
      // console.log(this.uploading)
      FirebaseService.uploades(img, this.uploading, this.uploadEnd)
      // 지금 추가한거
      this.deleteImage(img)
    },
   
    deleteImage (deimg) {
      // console.log(deimg)
      FirebaseService.deleteImage(deimg)
  
    },
    
    // 리뷰 데이터 FIREBASE에 올리기
    createReview(){
      console.log(this.places[0])
      FirebaseService.createReview(this.title, this.star, this.content, this.$store.state.user.displayName,this.fileName,this.$store.state.user.email, this.places[0].place_id, this.field2, this.places[0].geometry.location)
      this.$router.push(`/ReviewList`); 
      
    },

    async Search() {

        // 구글 지도를 google 변수에 할당
        const google = await gmapsInit();

        // 구글 맵의 Geocoder 함수(장소의 이름을 위도와 경도로 변환해주는 함수)
        const geocoder = new google.maps.Geocoder();

        // 검색한 주소 임시 할당
        var address = this.field2

        // 2중함수 안에서 data를 가리키기 위한 임의의 변수
        var vm = this;

        // 위도, 경도로 변환
        geocoder.geocode( { 'address': address}, function(results, status) {

            //변환 성공 시
            if (status == 'OK') {
                // data 변수에 중앙 위도, 경도 할당
                vm.centerlat = results[0].geometry.location.lat()     // 위도
                vm.centerlng = results[0].geometry.location.lng()     // 경도
               

            // cors 문제를 해결하기 위한 URL
            const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

            // google place api URL
            const lat = vm.centerlat
            const lng = vm.centerlng
            const PLACE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='
            const LAST_URL = '&key=AIzaSyBT8azQ9qnlsbv9r2gBYE7b6Dn2bEWyz5U'
            const URL = PROXY_URL + PLACE_URL + vm.centerlat + ',' + vm.centerlng + LAST_URL
            // api 를 이용하여 데이터 가져옴
            axios.get(URL)
                .then((response) => {
                    // 결과값을 data에 할당
                    vm.places = response.data.results

                })
                .catch(e => {
                    console.log(e)
                })

            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    },

    mounted() {
        document.getElementById("formButton").disabled = false;
        alert(title)
        
    },
        
}


}

</script>

<style>
.progress-bar {
  margin: 10px 0;
}
input[type="file"] {
  position: absolute;
  clip: rect(0,0,0,0);
}
</style>