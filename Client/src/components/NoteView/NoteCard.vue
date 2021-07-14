<template>
  <div class="card shadow-sm p-3 mb-5 bg-white rounded" @click="noteClickAction">
    {{text}}

  </div>
</template>

<script>
    export default {
        name: "NoteCard",
        props:['id','text'],
        methods: {
            noteClickAction(){
                console.log('Note number '+this.id+' is clicked');
                this.$router.push({name: 'edit',params: { id: this.id,text:this.text }});

            }
        }
    }
</script>

<style scoped>

</style>
