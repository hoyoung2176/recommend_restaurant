<template>
<div container class="mt-5">
<b-container fluid class="mt-5">
 
  <div id="NewReview" style="height:100%; width:100%; "  >
    
  <div class="create-box " >
  <Form/>
  </div>

  </div>
  </b-container>
</div>


</template>

<script>
import Form from '@/components/form/Form'

export default {
  name: "NewReview",
  components: {
      Form
  },
  mounted() {
    // console.log(this.$store.state.user.displayName);
  }
};
</script>
<style>
.create-box {
    margin-top:100px;
    margin-bottom:50px;
    margin-left:50px;
    margin-right:50px;
    padding:20px;
    border: 2px solid rgb(173, 223, 37);
    border-radius: 5px;
    background: white;
}

</style>