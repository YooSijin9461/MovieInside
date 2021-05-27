<template>
  <div id="login">
    <h1>Login</h1>
    <div class="form-floating mb-3">
      <label for="username">Username</label>
      <input type="text" class="form-control" id="username" placeholder="Username" v-model="username">
    </div>
    <div class="form-floating">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" placeholder="Password" v-model="password" @keypress.enter="login">
    </div>
    <b-button class="btn-primary" @click="login">로그인</b-button>
  </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from "jwt-decode"

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
          // console.log(res)
          localStorage.setItem('jwt', res.data.token)
          this.$emit('login')
          const JWT = localStorage.getItem('jwt')
          let decoded = jwt_decode(JWT)
          this.$store.state.username = decoded.username
          // console.log(decoded.username)
          this.$router.push({name: 'Home'})
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style scoped>
#login {
  height: 100vh;
}

.form-control {
  width: 50%;
  margin: auto;
  margin-bottom: 20px;
}
</style>