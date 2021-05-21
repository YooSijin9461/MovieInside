<template>
  <div id="login">
    <h1>Login</h1>
    <div>
      <label for="username">사용자 이름: </label>
      <input type="text" id="username" v-model="username">
    </div>
    <div>
      <label for="password">비밀번호: </label>
      <input type="password" id="password" v-model="password"
      @keypress.enter="login"
      >
    </div>
    <button @click="login">로그인</button>
  </div>
</template>

<script>
import axios from 'axios'

const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'Login',
  data: function () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login: function () {
      const data = {
        username: this.username,
        password: this.password,
      }
      console.log(`${SERVER_URL}/accounts/login/`)
      axios.post(`${SERVER_URL}/accounts/login/`, data)
        .then((res) => {
          console.log(res)
          localStorage.setItem('jwt', res.data.token)
          this.$emit('login')
          this.$router.push({name: 'Home'})
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style>

</style>