
<template>
<div>
<!-- 글 제목 -->
<v-text-field
    v-model="title"
    :counter="100"
    label="제목" required>
</v-text-field>
<!-- 평점 주기.. -->
<!-- <star-rating @rating-selected="rating = $event" :rating="rating"></star-rating> -->
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
<!-- 이미지 업로드 버튼 구현 -->
  <image-uploader 
		ref="uploader"
		@get-upload-files="images=$event">

	</image-uploader>
    <!-- 글 내용 작성 -->
<v-form class="mt-4">
<v-flex >
  <vue-simplemde v-model="content" ref="markdownEditor" label="내용" required />

</v-flex>
</v-form>
<v-btn class="ma-2" tile color="success" v-on:click="submit" ><v-icon left>mdi-pencil</v-icon>작성하기</v-btn>

</div>

</template>


<script>
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'

import StarRating from 'vue-star-rating'
import FirebaseService from "@/plugins/FirebaseService"
// import ImageUploader from './ImageUploader.vue'
import axios from "axios";



export default {
    name: 'Form',
    components: {
        VueSimplemde,
        StarRating,
        FirebaseService,
        ImageUploader: () => import('@/components/home/ImageUploader'),
        
    },
    
    data() {
        return {
            name:'',
            title: '',
            content:'',
            images:'',
            star:'',
            
            body: '',
            imageUrl: '',
            progressUpload: 0,
            fileName: '',
            uploadTask: '',
            uploading: false,
            uploadEnd: false,
            downloadURL: ''      
        }
    },
      methods: {
    submit(){
           
			const fd=  new FormData();
            fd.append('image',this.images.file,this.images.name)
            alert(this.images.file)
            // console.log(this.images)

            axios.post('https://api.imgur.com/3/image',fd,{
                headers : {
                     Authorization: 'Client-ID 8f3aec7ee110dce'
                }
             
            }).then(res => {
                this.userImage = res.data.data.link;
                	console.log(this.userImage);
            })

		},
    
    // 리뷰 데이터 FIREBASE에 올리기
    createReview(){
      FirebaseService.createReview(this.title, this.star, this.content, this.$store.state.user.displayName,)
      this.$router.push(`/`); 
      // FirebaseService.createReview()
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