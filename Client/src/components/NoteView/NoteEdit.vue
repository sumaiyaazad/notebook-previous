<template>
  <div class="form-group card shadow p-3 mb-5 bg-white rounded-lg">
  <textarea v-model="text" class = "form-control" rows = "14">

  </textarea>
    <br>
    <div class="form-group col-md-12">
      <button type="submit" class="btn btn-danger" @click="deleteAction">Delete</button>
      <button type="submit" style="float: right; " class="btn btn-primary" @click="cancelAction">Cancel</button>
      <button type="submit" style="float: right;margin-right: 10px" class="btn btn-primary" @click="saveAction">Save</button>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
    export default {
        name: "NoteEdit",
        data: function(){
            return {
                text:this.$route.params.text,
            };
        },
        methods: {
          ...mapActions({
            setUsername: 'setUsername',
            setPassword: 'setPassword',
            setNotification: 'setNotification'
          }),
            deleteAction(){
                console.log('Delete button pressed');
                console.log('note id: '+this.$route.params.id);

                var self=this;
                console.log(this.$route.params.id);
              if(this.$route.params.id!='0'){

                this.axios.post('http://localhost:4000/deletenote', {
                  username: this.$store.getters.username,
                  password: this.$store.getters.password,
                  _id: this.$route.params.id,
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



            },
            cancelAction(){
                console.log('cancel button pressed');
                this.$router.push({name: 'home'});
            },
            saveAction(){
                console.log('save button pressed');
                console.log('note id: '+this.$route.params.id+', saved text: '+this.text);

              var self=this;
              if(this.$route.params.id==='0'){
                this.axios.post('http://localhost:4000/newnote', {
                  username: this.$store.getters.username,
                  password: this.$store.getters.password,
                  text: this.text
                }).then(function (response) {
                  console.log(response.data.success,response.data.message,'hello');
                  if(response.data.success) {
                    self.setNotification('New note created');
                    self.$router.push({name: 'home'});
                  }else{
                    self.setNotification(response.data.message);
                  }
                }).catch(function (error) {
                  //console.log(error);
                });
              }else{
                this.axios.post('http://localhost:4000/editnote', {
                  username: this.$store.getters.username,
                  password: this.$store.getters.password,
                  _id: this.$route.params.id,
                  text: this.text
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
            },

        }
    }
</script>

<style scoped>

</style>
