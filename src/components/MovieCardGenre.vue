<template>
  <div id="moviecardgenre">
    <div id="genreid">
      <b-button class="btn-primary" @click="[getGenreMovie(), watchCard()]">{{ moviegenre.name }}</b-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const MOVIE_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'MovieCardGenre',
  props: {
    moviegenre: Object,
  },
  methods: {
  watchCard: function () {
    this.$store.dispatch('watchCard')
  },
  getToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
  },
  getGenreMovie: function () {
    const genreId = this.moviegenre.id
    axios({
      method: 'get',
      url: `${MOVIE_URL}/movies/${genreId}/1`,
      headers: this.getToken()
    })
      .then((res) => {
        this.$store.state.genremovies = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
}
</script>

<style>
.card {
  height: 600px;
}
</style>