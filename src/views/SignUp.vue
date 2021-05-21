<template>
  <div id="signup">
    <form class="row g-3">
  <div class="col-md-4">
    <label for="username" class="form-label">Username</label>
    <input type="text" class="form-control" id="username" value="name" required>
  </div>
  <!-- <div class="col-md-4">
    <label for="validationBirth" class="form-label">Birth</label>
    <input type="text" class="form-control" id="validationBirth" value="YYYYMMDD" required>
  </div>
  <div class="col-md-2">
    <label for="sex" class="form-label">Sex</label>
    <select class="form-select" id="validationSex" required>
      <option>Man</option>
      <option>Woman</option>
    </select>
  </div> -->
  <div class="col-md-10">
    <label for="email" class="form-label">Email</label>
    <div class="input-group">
      <input type="text" class="form-control" id="email"  aria-describedby="inputGroupPrepend2" required>
      <span class="input-group-text" id="inputGroupPrepend2">@</span>
      <!-- <input type="text" class="form-control" id="email"  aria-describedby="inputGroupPrepend2" required> -->
    </div>
  </div>
  <div class="col-md-5">
    <label for="password" class="form-label">Password</label>
    <input type="text" class="form-control" id="password" required>
  </div>
  <div class="col-md-5">
    <label for="passwordConfirm" class="form-label">PasswordConfirm</label>
    <input type="text" class="form-control" id="passwordConfirm" required>
  </div>
  <div class="col-10">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required>
      <label class="form-check-label" for="invalidCheck2">
        Agree to terms and conditions
      </label>
    </div>
  </div>
  <div class="col-10">
    <button class="btn btn-primary" type="submit" @click="SignUp">Sign Up</button>
  </div>
</form>
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
      // age: '',
      // sex: '',
      email: '',
      password: '',
      passwordConfirm: '',
    }
  },
  methods: {
    SignUp: function () {
      const userdata = {
        username: this.username,
        // age: this.age,
        // sex: this.sex,
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

<style>

</style>