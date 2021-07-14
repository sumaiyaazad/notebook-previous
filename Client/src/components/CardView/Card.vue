<template>
  <div>
    <div class="card shadow-lg p-3 mb-5 bg-white rounded" style="margin-left: 25%; margin-right: 25%; margin-top: 1%;">
      <div class="card-body" style="padding-right: 20%; padding-left: 20%">
        <transition name="fade" mode="out-in" appear>
        <router-view></router-view>
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "Card"
    }
</script>

<style scoped>
  .slide-leave-active {
    transition: opacity 1s ease;
    opacity: 0;
    animation: slide-out 1s ease-out forwards;
  }

  .slide-leave {
    opacity: 1;
    transform: translateX(0);
  }

  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
  }

  @keyframes slide-out {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-30px);
    }
  }

  @keyframes slide-in {
    0% {
      transform: translateY(-30px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .fade-enter{
    opacity: 0;
  }
  .fade-enter-active{
    transition: opacity 1s;
  }
  .fade-leave{
    /*opacity: 1;*/
  }
  .fade-leave-active{
    transition: opacity 1s;
    opacity: 0;
  }
</style>
