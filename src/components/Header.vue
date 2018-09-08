<template>
  <v-toolbar>
    <v-toolbar-title>Grey Stone</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <div id="firebaseui-auth-container" class="login" flat v-if="!this.getUser()"></div>
      <v-btn flat v-if="this.getUser()" @click="logout">Logout</v-btn>
      <v-btn flat v-if="this.getUser()">{{this.getUser().displayName}}</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui'
import {config} from '../helpers/firebaseConfig';
import { mapActions, mapGetters } from 'vuex';
export default {
  created () {
    var uiConfig = {
      signInSuccessUrl: '/success',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ]
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  },
  methods: {
    ...mapGetters(["getUser"]),
    ...mapActions(["changeUser"]),
    logout () {
      firebase.auth().signOut();
      this.changeUser(null);
      this.$router.go(0);
      console.log(this.getUser())
    },
  }
}
</script>

<style>
.login{
  position: relative;
  bottom: 4px;
}
</style>

