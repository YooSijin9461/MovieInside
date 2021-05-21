<template>
  <div id="Genre">
    <h2>장르별 영화 추천</h2>
    
    <span v-if="moviesgenre.length===0">
      <button @click="getMovieGenre">보기</button>
    </span>
    <div v-else class="row row-cols-6">
      <MovieCardGenre v-for="(moviegenre, idx) in moviesgenre" :key="idx" :moviegenre="moviegenre"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MovieCardGenre from '@/components/MovieCardGenre.vue'

const MOVIE_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'Genre',
  components: {
    MovieCardGenre,
  },
  methods: {
  getToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
  },

  getMovieGenre: function () {
    axios({
      method: 'get',
      url: `${MOVIE_URL}/movies/genre`,
      headers: this.getToken()
    })
      .then((res) => {
        if (this.$store.state.moviesgenre.length === 0) {
          this.$store.state.moviesgenre = res.data
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  computed: {
    moviesgenre: function () {
      return this.$store.state.moviesgenre
    }
  }
}
</script>

<style>

</style>