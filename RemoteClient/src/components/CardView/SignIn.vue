<template>
    <div>
      <br><br>
      <h3 class="card-title col-md-12" align="center">Sign In</h3>
      <br><br><br>
      <div class="form-row col-md-12">
        <div class="form-group col-md-12">
          <input v-model="username" type="text" class="form-control" placeholder="Enter username">
        </div>
        <div class="form-group col-md-12">
          <input v-model="password" type="password" class="form-control" placeholder="Password">
        </div>
        <br><br><br><br>
        <div class="form-group col-md-12">
          <button class="btn my-2 my-sm-0" @click="signUpAction">Create account</button>
          <button style="float: right;" class="btn btn-primary" @click="signInAction">Sign In</button>
        </div>
      </div>

    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "SignIn",
        data: function(){
            return {
                username: "",
                password: ""
            }
        },
        methods: {
          ...mapActions({
            setUsername: 'setUsername',
            setPassword: 'setPassword',
            setNotification: 'setNotification'
          }),
            signUpAction(){
                console.log('signup clicked');
                this.$router.push({name: 'signup'});
            },
            signInAction(){
                console.log('signin clicked');
                this.setUsername(this.username);
                this.setPassword(this.password);
                var self=this;
                //this.axios.post('http://localhost:4000/signin', {
                this.axios.post('https://obscure-falls-77670.herokuapp.com:443/signin', {
                    username: this.username,
                    password: this.password
                }).then(function (response) {
                  console.log(response.data.success,response.data.message);
                  if(response.data.success) {
                    self.$router.push({name: 'home'});
                    self.setNotification(response.data.message);
                  }else{
                    self.setNotification(response.data.message);
                  }
                }).catch(function (error) {
                  //console.log(error);
                });
            },
        }
    }
</script>

<style scoped>

</style>
