<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light shadow-lg">
              <a class="navbar-brand" href="#">
                <img src="../static/keep-512.png" width="30" height="30" alt="">
              </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">{{this.$store.getters.username}} <span class="sr-only">(current)</span></a>
            </li>
          </ul>
<!--          <a v-if="this.$store.getters.username.length!==0" class="navbar-brand" href="#" @click="settingsAction">-->
<!--            <img src="../static/settings_applications-24px.svg" width="30" height="30" alt="Settings">-->
<!--          </a>-->
          <button v-if="this.$store.getters.username.length!==0" class="btn my-2 my-sm-0" type="submit" @click="settingsAction">Settings</button>
          <button v-if="this.$store.getters.username.length!==0" class="btn my-2 my-sm-0" type="submit" @click="signOutAction">Sign Out</button>
        </div>

      </nav>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        name: "NavigationBar",
        methods: {
            ...mapActions({
              setUsername: 'setUsername',
              setPassword: 'setPassword',
              setNotification: 'setNotification'
            }),
            signOutAction(){
                console.log('signout clicked');
                this.setPassword('');
                this.setUsername('');
                this.setNotification('Signed out');
                this.$router.push({name: 'signin'});
            },
            settingsAction(){
                console.log('settings clicked');
                this.$router.push({name: 'settings'});
            }
        }
    }
</script>

<style scoped>

</style>
