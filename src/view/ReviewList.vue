<template>
<div container class="mt-5">
    <div class="list " > 
        <h1 class="display-2 font-weight-medium green--text font-italic text-center ">
           reviews
          </h1>
    </div>
    
    <v-layout  row nowrap >
        <v-card v-for="review of allReviews"
        class=" recard mx-auto ml-auto mt-5"
        :flat="flat"
        :loading="loading"
        :outlined="outlined"
        :elevation="elevation"
        :raised="raised"
        :width="500"
        :height="height"
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
        <!-- <span class="grey--text text--lighten-2 caption mr-2">
        ({{ review.star }})
      </span> -->
      <v-rating
      v-model="review.star"
      readonly= "true"
      value="review.star"
      background-color="orange lighten-3"
      color="orange"
      medium
    ></v-rating>
        <v-card-actions >
            <v-flex xs12 sm3>
  


            
            <v-btn v-on:click="like" >
              <div v-if="likeButton === false">
                <v-icon color="pink">favorite</v-icon>
            </div>
            <div v-else>
                 <v-icon color="grey">favorite</v-icon>
            </div>
              
            </v-btn>
          </v-flex>
            <!-- <v-btn icon>
            <v-icon>mdi-heart</v-icon>
            </v-btn> -->
            <!-- <v-btn text>Click</v-btn> -->
            <v-btn > more </v-btn>
        </v-card-actions>
        </v-card>
    </v-layout>
</div>
</template>

<script>
import FirebaseService from "@/plugins/FirebaseService";
import "firebase/firestore";


export default {
    name: "ReviewList",
    data () {
        return {
        name:'',
        title: '',
        content:'',
        star: '',
        body: '',
        imageUrl: '',
        fileName: '',  
        allReviews: [],
        imgURL1:"https://firebasestorage.googleapis.com/v0/b/web-mobile-final.appspot.com/o/upload_imgs%2F",
        imgURL2:"?alt=media&token=aa20c624-71fc-4d7a-a28b-ac952b813209",
        getLikeUsers:[],
        likeButton: false,
        likes:0
        }
    },
    methods: {
        // 좋아요 하트 버튼을 누를 때
        like(likeButton) {

            this.getLikeUsers = FirebaseService.getLikeUsers();

            // 일단 리뷰에서 likeUser랑, 현재 로그인 이메일이, likeUser 리스트 안에 없으면 넣어주고put, 있으면 빼주고
            // if (firebase.createReview().)
            // this.likes = document.getElementById('show').innerHTML;
            // likes += 1;
            console.log(this.likeButton)
            if (this.likeButton == false) {
                this.likeButton = true
            }
            else {
                this.likeButton = false
            }
            FirebaseService.likeUserClick();

        }

    },

    mounted() {

      this.allReviews = FirebaseService.getAllReviews();

    }
}



</script>
<style>
.list {
    margin-top:100px;
    margin-bottom:50px;
    margin-left:50px;
    margin-right:50px;
    padding:20px;
    
}
.recard {
    margin-top:100px;
    margin-bottom:50px;
    margin-left:50px;
    margin-right:50px;
    width: 400px;
   
}


</style>
