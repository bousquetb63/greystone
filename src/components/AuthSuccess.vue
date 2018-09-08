<template> 
  <div> 
    <h1>Signup succeeded, redirecting....</h1>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import firebase from 'firebase'
export default {
  data(){
    return {
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {}
    }
  },
  created() { 
    this.user = firebase.auth().currentUser; 
    this.changeUser(this.user)
    if(this.user) { 
      this.name = this.getUser().name; 
      this.email = this.getUser().email; 
      this.photo = this.getUser().photoURL; 
      this.userId = this.getUser().uid; 
    }
    this.$router.push('/');
  },
  methods: { 
    ...mapActions(["changeUser"]),
    ...mapGetters(["getUser"]),
    logOut() { 
      firebase.auth().signOut();
      this.changeUser(null);
    } 
  },
};
</script>