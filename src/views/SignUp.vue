<template>
  <div id="signup">
    <h1 class="title">Sign Up</h1>
    <div class="form-floating">
      <label for="username">Username</label>
      <input type="text" class="form-control" id="username" placeholder="Username" v-model="username">
    </div>
    <div class="form-floating">
      <label for="email">E-mail</label>
      <input type="text" class="form-control" id="email" placeholder="E-mail" v-model="email">
    </div>
    <div class="form-floating">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
    </div>
    <div class="form-floating">
      <label for="passwordConfirm">Password</label>
      <input type="password" class="form-control" id="passwordConfirm" placeholder="PasswordConfirm" v-model="passwordConfirm">
    </div>
    <b-button class="btn-primary" @click="signUp">회원가입</b-button>
  </div>
</template>

<script>
import axios from 'axios'

const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: "SignUp",
  data: function () {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    }
  },
  methods: {
    signUp: function () {
      const userdata = {
        username: this.username,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm
      }
      console.log(this.username)
      axios({
        method: 'post',
        url: `${SERVER_URL}/accounts/`,
        data: userdata
      })
        .then(res => {
          console.log(res)
          this.$router.push('Login')
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
}
</script>

<style scoped>
#signup {
  height: 100vh;
}

.form-control {
  width: 50%;
  margin: auto;
  margin-bottom: 30px;
}

.title {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>