<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs5 text-xs-center>
      <v-layout
        align-center
        justify-center
        row
        fill-height
        elevation-5
        style="min-height:500px;"
        white
        pa-4
      >
        <v-flex xs12 text-xs-center>
          <p class="text-center">LOGIN PAGE</p>
          <div v-if="$store.state.token">
            <div class="subheading text-center text-uppercase pl-2 mb-4">
              <h3>{{$store.state.user.email}}님 환영합니다.</h3>
              이름 : {{$store.state.user.displayName}}
              <br />
              등급 : {{$store.state.userLevel}}
              <br />
            </div>
            <v-btn round color="black" dark v-on:click="signOut" style="width:100%;">
              <v-icon size="25" class="mr-2">mdi-logout</v-icon>로그아웃
            </v-btn>
          </div>
          <div v-else>
            <div>
              <Signin></Signin>
            </div>
            <v-btn round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:100%;">
              <v-icon size="25" class="mr-2">mdi-google</v-icon>Google 로그인
            </v-btn>

            <v-btn round color="secondary" dark v-on:click="loginWithFacebook" style="width:100%;">
              <v-icon size="25" class="mr-2">mdi-facebook</v-icon>Facebook 로그인
            </v-btn>
            <Signup></Signup>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import FirebaseService from "@/plugins/FirebaseService";
import "firebase/firestore";
import "firebase/auth";
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      dialog: false,
      currentEmail: "",
      level: "no"
    };
  },
  components: {
    Signup: () => import("@/components/Signup"),
    Signin: () => import("@/components/Signin")
  },
  methods: {
    async loginWithGoogle() {
      const result = await FirebaseService.loginWithGoogle();
      // this.$store.state.accessToken = result.credential.accessToken;
      // this.$store.state.user = result.user;
      // alert(this.$store.state.user.displayName);
    },
    async loginWithFacebook() {
      const result = await FirebaseService.loginWithFacebook();
      // this.$store.state.accessToken = result.credential.accessToken;
      // this.$store.state.user = result.user;
    },
    async signOut() {
      FirebaseService.signOut();
    }
  },
  mounted() {
  }
};
</script>
