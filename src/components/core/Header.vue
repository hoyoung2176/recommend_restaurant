<template>
  <v-app-bar app>
    <v-toolbar-title>
      <router-link to="/">배이컨아안녕</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn v-on:click="writeReview">찾았다 맛집</v-btn>
      <v-btn router-link: to="/ReviewList">모든 리뷰</v-btn>
      <v-btn text>미식 여행 매거진</v-btn>
    </v-toolbar-items>

    <template v-if="$vuetify.breakpoint.smAndUp">
      <div v-if="$store.state.userLevel==='admin'">
        <v-btn @click="manager()">관리자페이지</v-btn>
      </div>
      <div v-if="$store.state.token!=null">
        <v-btn router-link: to="/Login">마이페이지</v-btn>
      </div>
      <div v-if="$store.state.token!=null">
        <v-btn @click="signOut()">
          <v-icon size="25" class="mr-2">mdi-logout</v-icon>logout
        </v-btn>
      </div>
      <div v-else>
        <v-btn router-link: to="/Login">
          <v-icon size="25" class="mr-2">mdi-login</v-icon>login
        </v-btn>
      </div>
    </template>
  </v-app-bar>
</template>

<script>
import FirebaseService from "@/plugins/FirebaseService";

export default {
  name: "core-header",
  data: () => ({}),
  components: {},
  methods: {
    async signOut() {
      await FirebaseService.signOut();
      this.$router.push("/");
    },
    async writeReview() {
      if (this.$store.state.token != "") {
        if (this.$store.state.userLevel === "guest") {
          alert("guest 등급은 작성할 수 없습니다.");
        } else {
          this.$router.push("/NewReview");
        }
      } else {
        alert("로그인을 해주시기바랍니다.");
        this.$router.push("/Login");
      }
    },
    async manager() {
      if (this.$store.state.token) {
        if (
          this.$store.state.userLevel === "guest" ||
          this.$store.state.userLevel === "team"
        ) {
          alert(result + " 등급은 접근할 수 없습니다.");
        } else {
          this.$router.push("/Manager");
        }
      } else {
        alert("로그인을 해주시기바랍니다.");
        this.$router.push("/Login");
      }
    }
  },
  mounted() {}
};
</script>




<style>
.navbar {
  background-color: rgb(255, 255, 255);
  width: 100%;
  transition: all ease 0.3s;
  position: fixed;
}
.navbar--hidden {
  background-color: rgba(122, 111, 111, 0.616);
}

.nav-text {
  color: white !important;
}

.nav-text--hidden {
  color: black !important;
}
</style>
