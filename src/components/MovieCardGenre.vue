<template>
  <div id="moviecardgenre">
    <b-button class="btn-primary" @click="getGenreMovie" :genreId="moviegenre.id">{{ moviegenre.name }}</b-button>
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
  getToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
  },
  getGenreMovie: function () {
    axios({
      method: 'get',
      url: `${MOVIE_URL}/movies/${genreId}/1`,
      headers: this.getToken()
    })
      .then((res) => {
        if (this.$store.state.genremovies.length === 0) {
          this.$store.state.genremovies = res.data
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  computed: {
    genremovies: function () {
      return this.$store.state.genremovies
    }
  }
}
</script>

<style>
.card {
  height: 600px;
}
</style>