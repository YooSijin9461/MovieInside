<template>
  <div id="All">
    <h2>전체 영화 페이지</h2>
    {{ movies }}
    <div id="cards" class="row row-cols-3 row-cols-md-6">
      <MovieCard v-for="(movie, idx) in movies" :key="idx" :movie="movie"/>
    </div>
    <button @click="getMovieDatas">xx</button>
  </div>
</template>

<script>
import axios from 'axios'
import MovieCard from '@/components/MovieCard.vue'

const MOVIE_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'All',
  components: {
    MovieCard,
  },
  methods: {
  getToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
  },

  getMovieDatas: function () {
    axios({
      method: 'get',
      url: `${MOVIE_URL}/movies/main/1`,
      headers: this.getToken()
    })
      .then((res) => {
        if (this.$store.state.movies.length === 0) {
          this.$store.state.movies = res.data
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  computed: {
    movies: function () {
      return this.$store.state.movies
    }
  }
}
</script>

<style>
#cards {
  margin: 1px;
}
</style>