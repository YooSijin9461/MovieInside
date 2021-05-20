<template>
  <div id="All">
    <h2>전체 영화 페이지</h2>
    {{ movies }}
  </div>
</template>

<script>
import axios from 'axios'

const MOVIE_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'All',
  data: function () {
    return {
      movies: [],
    }
  },
  methods: {
    getToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        headers: {
          Authorization: `JWT ${token}`
        }
      }
      return config
    },

    getMovieDatas: function () {
      axios.get(`${MOVIE_URL}/movies/0/1`)
        .then((res) => {
          console.log(res)
          if (this.$store.state.movies.length === 0) {
            this.$store.state.movies = res.data
            console.log('1')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>