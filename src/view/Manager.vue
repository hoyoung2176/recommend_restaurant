<template bl>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs5 text-xs-center>
      <br />
      <br />
      <br />
      <br />
      <br />
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
          <div>
            <!-- <a>Level:{{$store.state.userLevel}}</a>
              <br />
              <a>Email:{{$store.state.userEmail}}</a>
            <br />-->
          </div>
          <div v-if="$store.state.userLevel!='admin'">
            <h5 class="text-center">해당 권한이 없습니다. 관리자에게 문의하세요.</h5>
          </div>
          <div v-else-if="$store.state.userLevel==='admin'">
            <div
              class="subheading text-uppercase pl-2 mb-4 text-center"
            >{{$store.state.user.email}}님</div>
            <div class="subheading text-uppercase pl-2 mb-4 text-center">admin 확인이 완료되었습니다.</div>
            <div>
              <br />
              <v-btn v-on:click="getAllUser" width="100%">회원 등급 수정</v-btn>
            </div>
            <div class="mt-5 ml-5" v-for="item in list" v-bind:key="item.id">
              <v-flex xs12 sm6>
                <v-text-field :value="item.id" label="email" disabled></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 d-flex>
                <v-select :items="levelList" :value="item.data" @change="changeLevel"></v-select>
                <v-btn v-on:click="modifyLevel(item.id)">수정</v-btn>
                <!-- <v-btn v-on:click="deleteUser(item.id)">삭제</v-btn> -->
              </v-flex>
              <br />
              <br />
            </div>
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
  ok: "false",

  data() {
    return {
      dialog: false,
      currentEmail: "",
      ok: "false",
      notAdmin: "false",
      currentUserLevel: "",
      list: [],
      levelList: ["guest", "team", "admin"]
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
      alert("로그아웃 되었습니다.")
      this.$router.push("/");
    },
    async getAllUser() {
      var result = await FirebaseService.getAllUser();
      this.mylevel = result;
      console.log(result.length);
      // console.log(result[0].data)
      this.list = result;
    },
    async modifyLevel(email) {
      await FirebaseService.modifyUserLevel(email, this.currentUserLevel);
      alert(
        email + "님의 등급이" + this.currentUserLevel + "로 변경되었습니다."
      );
      location.reload();
    },
    changeLevel(input_level) {
      this.currentUserLevel = input_level;
    }
    // async deleteUser(email) {
    //   await FirebaseService.deleteUser(email);
    //   alert(email + "님의 계정이 삭제되었습니다.");
    //   location.reload();
    // }
  },
  mounted() {}
};
</script>
