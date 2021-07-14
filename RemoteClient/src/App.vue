<template>
  <div id="app">
    <app-navbar></app-navbar>
    <transition name="fade" mode="out-in" appear>
    <router-view name="app-body"></router-view>
    </transition>
    <app-notification></app-notification>
  </div>
</template>

<script>
  import NavigationBar from "./components/NavigationBar";
  import Notification from "./components/Notification";
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
      appNavbar: NavigationBar,
      appNotification: Notification
  }
}
</script>

<style>
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
