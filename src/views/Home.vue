<template>
  <div class="home">
    <Main />
    <!-- <img alt="Vue logo" src="../assets/background.png"> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/Main.vue'

export default {
  name: 'Home',
  components: {
    Main,
  }
}
</script>

<style>
.home {
  height: 100vh;
}
</style>