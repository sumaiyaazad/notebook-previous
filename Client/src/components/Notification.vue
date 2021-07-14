<template>
    <div class="notification card" v-if="this.$store.getters.notification.length!==0">
        {{this.$store.getters.notification}}
    </div>
</template>

<script>
    export default {
        data: function(){
            return {

            }
        },

    }
</script>

<style scoped>
    .notification{
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
    }
</style>