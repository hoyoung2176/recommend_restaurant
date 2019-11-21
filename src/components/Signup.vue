<template>
  <v-layout align-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn round color="black" dark v-on="on" style="width:100%;">
          <v-icon size="25" class="mr-2">mdi-account-outline</v-icon>Sign Up
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline" required>User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="name*" v-model="name" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email*" v-model="email" type="text" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" v-model="password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <!-- <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age"
                  required
                ></v-select>
              </v-flex>
               <v-flex xs12 sm6>
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>-->
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat v-on:click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="signUp(name)">Registration</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import firebase from "firebase";
import FirebaseService from "@/plugins/FirebaseService";
export default {
  data: () => ({
    dialog: false,
    name: "",
    email: "",
    password: ""
  }),
  methods: {
    async signUp(username) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log(user.user);
            this.dialog = false;
            user.user
              .updateProfile({
                displayName: username
              })
              .then(
                () => {
                  FirebaseService.userAuth(user.user.email);
                  alert("회원가입이 완료되었습니다.")
                },
                function(error) {}
              );
          },
          function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == "auth/weak-password") {
              alert("The password is too weak.");
            } else {
              if (
                error.message.toString() ==
                "The email address is already in use by another account."
              ) {
                alert("이미 존재하는 이메일 주소입니다.");
              } else if (
                error.message.toString() ==
                "The email address is badly formatted."
              ) {
                alert("잘못된 형식의 이메일 주소입니다.");
              } else if (
                error.message.toString() ==
                "Password should be at least 6 characters"
              ) {
                alert("비밀번호를 6자 이상으로 설정해주세요.");
              }
              console.log(error);
            }
          }
        );

      await FirebaseService.signOut2();
    }
  }
};
</script>