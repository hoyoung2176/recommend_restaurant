<template>
  <v-layout align-center>
    <v-flex xs12 text-xs-center>
      <v-text-field type="text" v-model="email" placeholder="ID" style="width:100%;" />
      <v-text-field type="password" v-model="password" placeholder="Password" style="width:100%;" />
      <v-btn round color="lime" dark v-on:click="signInWithEmailAndPassword" style="width:100%;">
        <v-icon size="25" class="mr-2">mdi-email</v-icon>이메일로 로그인
      </v-btn>
    </v-flex>
  </v-layout>
</template>


<script>
import FirebaseService from "@/plugins/FirebaseService";
import firebase from "firebase";
export default {
  data: () => ({
    email: "",
    password: "",
    result:{}
  }),
  methods: {
    async signInWithEmailAndPassword() {
      this.result = await FirebaseService.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      // console.log("token:"+result.token)
      // console.log("email:"+result.email)
      // this.$store.state.accessToken = result.token;
      // this.$store.state.user = result.user;
    }
  }
};
</script>