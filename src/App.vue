<template>
  <div id="app">
    <div>
      <b-nav tabs fill class="routerbtn">
        <b-nav-item :to="{ name: 'Home' }">
          <img alt="Vue logo" src="@/assets/logoo.png" id="logo">
        </b-nav-item>
        <b-nav-item><router-link :to="{ name: 'Home' }">Home</router-link></b-nav-item>
        <b-nav-item><router-link :to="{ name: 'All' }">All</router-link></b-nav-item>
        <b-nav-item><router-link :to="{ name: 'Genre' }">Genre</router-link></b-nav-item>
        <b-nav-item v-if="isLogin"><a @click="goRecommend()">Recommend</a></b-nav-item>
        <b-nav-item v-if="isLogin"><router-link @click.native="logout" to="#">Logout</router-link></b-nav-item>
        <b-nav-item v-else><router-link to="/signup">Sign Up</router-link></b-nav-item>
        <b-nav-item v-if="!isLogin"><router-link to="/login">Login</router-link></b-nav-item>
      </b-nav>
    </div>
  <router-view @login="login" />
  </div>
</template>

<script>
import jwt_decode from "jwt-decode"
import axios from "axios"

export default {
  name: 'App',
  data: function () {
    return {
      isLogin: false,
      username: '',
    }
  },
  methods: {
    setToken: function () {
      const jwt = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${jwt}`
      }
      return config
    },
    logout: function () {
      localStorage.removeItem('jwt')
      this.isLogin = false,
      this.$router.push({ name: 'Login' })
    },
    login: function () {
      this.isLogin = true
      const JWT = localStorage.getItem('jwt')
      let decoded = jwt_decode(JWT)
      this.username = decoded.username
    },
    goRecommend() {
      if (this.$store.state.moviedetail.length !== 0) {
        this.$store.state.watchrecommend = true
        const MOVIE_ID = this.$store.state.moviedetail.id
        const config = this.setToken()
        axios({
          method: 'get',
          url: `http://127.0.0.1:8000/movies/recommend/${MOVIE_ID}/`,
          headers: config
        })
          .then((res) => {
            console.log("recommended: ", res)
            this.$store.state.moviedetail = res.data
            this.$router.push({ name: 'Recommend'});
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.watchrecommend = false
      }
    },
  },
  created: function () {
    const JWT = localStorage.getItem('jwt')
    if (JWT) {
      this.isLogin = true
      let decoded = jwt_decode(JWT)
      this.username = decoded.username
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url('assets/background.png');
  /* height: 100vh; */
  background-size: cover;
  /* opacity: 0.5; */
  /* background-blend-mode: lighten; */
  /* background-color: rgb(0, 0, 0, 0.5); */
}
#app nav-bar-auto


#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#logo {
  width: 30px;
  height: 30px;
}

.routerbtn {
  font-size: 20px;
}

.a:hover {
  text-decoration-style: none;
}
</style>
