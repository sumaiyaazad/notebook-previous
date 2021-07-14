<template>
    <div>
          <br><br>
          <h3 class="card-title col-md-12" align="center">Create User Account</h3>
          <br><br><br>
          <div class="form-row col-md-12">
            <div class="form-group col-md-12">
              <input v-model="username" type="text" class="form-control" placeholder="Enter username">
            </div>

            <div class="form-group col-md-6">
              <input v-model="password" type="password" class="form-control" placeholder="Password">
            </div>
            <div class="form-group col-md-6">
              <input v-model="confirm" type="password" class="form-control" placeholder="Confirm Password">
            </div>

<!--            <div class="custom-file col-md-12">-->
<!--              <input type="file" class="custom-file-input">-->
<!--              <label class="custom-file-label">Choose Profile Picture</label>-->
<!--            </div>-->
            <br><br><br><br>
            <div class="form-group col-md-12">
              <button class="btn my-2 my-sm-0" @click="signInAction">Sign in instead</button>
              <button style="float: right;" class="btn btn-primary" @click="signUpAction">Sign Up</button>
            </div>
          </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        name: "SignUp",
        data: function(){
          return {
              username: '',
              password: '',
              confirm: ''
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
                console.log('username: '+this.username+', password: '+this.password+', confirm: '+this.confirm);

                var self=this;

                if(this.password.length===0){
                    self.setNotification('password length can\'t be zero');
                    return;
                }

                if(this.password!==this.confirm){
                    self.setNotification('passwords didn\'t match');
                    return;
                }


                this.setUsername(this.username);
                this.setPassword(this.password);

                //https://obscure-falls-77670.herokuapp.com:443
                //this.axios.post('http://localhost:4000/signup', {
                this.axios.post('https://obscure-falls-77670.herokuapp.com:443/signup', {
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
            signInAction(){
                console.log('signin clicked');
                this.$router.push({name: 'signin'});
            }
        }
    }
</script>

<style scoped>

</style>
