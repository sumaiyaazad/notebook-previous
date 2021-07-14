<template>
  <div>
    <div class="card shadow p-3 mb-5 bg-white rounded-lg" @click="noteClickAction">
      Take a note...
    </div>

    <app-note-card v-for="note in notes" :id="note._id" :text="note.text">
    </app-note-card>

  </div>

</template>

<script>
  import {mapActions} from 'vuex';
  import NoteCard from "./NoteCard";
    export default {
        name: "NoteList",
        components: {
            appNoteCard: NoteCard
        },
        data: function(){
            return {
                notes: []
            };
        },
        methods: {
          ...mapActions({
            setUsername: 'setUsername',
            setPassword: 'setPassword',
            setNotification: 'setNotification'
          }),
            noteClickAction(){
                console.log('Note number '+this.id+' is clicked');
                this.$router.push({name: 'edit',params: { id: '0',text:""}});
            }
        },
        mounted() {
          console.log('notelist route mounted');

          var self=this;

            this.axios.post('http://localhost:4000/getnotes', {
              username: this.$store.getters.username,
              password: this.$store.getters.password,
            }).then(function (response) {
              self.notes = response.data.notes;
              console.log(self.notes);
              self.setNotification("get notes successful");
            }).catch(function (error) {

            });



        }

    }
</script>

<style scoped>

</style>
