<template>
    <div>
      <br><br>
      <h3 class="card-title col-md-12" align="center">Settings</h3>
      <br><br><br>
      <div class="form-row col-md-12">
        <div class="form-group col-md-12">
          <input v-model="oldPassword" type="password" class="form-control" placeholder="Enter old password">
        </div>
        <div class="form-group col-md-6">
          <input v-model="newPassword" type="password" class="form-control" placeholder="New password">
        </div>
        <div class="form-group col-md-6">
          <input v-model="confirmPassword" type="password" class="form-control" placeholder="Confirm password">
        </div>

<!--        <div class="custom-file col-md-12">-->
<!--          <input type="file" class="custom-file-input">-->
<!--          <label class="custom-file-label">Choose Profile Picture</label>-->
<!--        </div>-->
        <br><br><br><br>
        <div class="form-group col-md-12">
          <button type="submit" class="btn btn-danger" @click="deleteAction">Delete</button>
          <button type="submit" style="float: right; " class="btn btn-primary" @click="cancelAction">Cancel</button>
          <button type="submit" style="float: right;margin-right: 10px" class="btn btn-primary" @click="saveAction">Save</button>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapActions} from 'vuex';
    export default {
        name: "Settings",
        data: function(){
            return{
                oldPassword: "",
                newPassword:"",
                confirmPassword:""
            }
        },
        methods: {
          ...mapActions({
            setUsername: 'setUsername',
            setPassword: 'setPassword',
            setNotification: 'setNotification'
          }),
            deleteAction(){
                console.log('Old password: ',this.oldPassword);
                console.log('delete Button clicked');

                var self=this;
                //https://obscure-falls-77670.herokuapp.com:443
                //this.axios.post('http://localhost:4000/remove', {
                this.axios.post('https://obscure-falls-77670.herokuapp.com:443/remove', {
                  username: this.$store.getters.username,
                  password: this.oldPassword
                }).then(function (response) {
                  console.log(response.data.success,response.data.message);
                  if(response.data.success) {
                    self.$router.push({name: 'signup'});
                    self.setNotification(response.data.message);
                    this.setPassword('');
                    this.setUsername('');
                  }else{
                    self.setNotification(response.data.message);
                  }
                }).catch(function (error) {
                  //console.log(error);
                });
            },
            cancelAction(){
                console.log('cancel button clicked');
                this.$router.push({name: 'home'});
            },
            saveAction(){
                console.log('old password: ',this.oldPassword,', new password: ',this.newPassword,', confirm password: ',this.confirmPassword);
                console.log('save button clicked');

                var self=this;

                if(this.newPassword.length===0){
                  self.setNotification('New password can\'t be of zero length');
                  return;
                }

                if(this.newPassword!==this.confirmPassword){
                  self.setNotification('Passwords didn\'t match');
                  return;
                }

                this.setPassword(this.newPassword);
                //https://obscure-falls-77670.herokuapp.com:443
                //this.axios.post('http://localhost:4000/changepassword', {
                  this.axios.post('https://obscure-falls-77670.herokuapp.com:443/changepassword', {
                  username: this.$store.getters.username,
                  password: this.oldPassword,
                  newpassword: this.newPassword
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
            }
        }
    }
</script>

<style scoped>

</style>
