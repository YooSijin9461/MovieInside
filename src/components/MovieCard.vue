<template>
  <div id="moviecard" @click="[watchDetail(), getMovieGenre(), getComment()]">
    <div class="col">
      <div class="card">
        <img :src="movieUrl" class="card-img-top" alt="..." height="100%">
        <!-- <div class="card-body">
          <h5 class="card-title title">{{ movie.title }}</h5>
          <p class="card-text">평점 : {{ movie.vote_average}}</p> -->
          <!-- <p class="card-text">{{ movie.overview }}</p> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MovieCard',
  data: function () {
    return {
      movieId: '',
    }
  },
  props: {
    movie: Object,
  },
  methods: {
    watchDetail: function () {
      this.$store.dispatch('watchDetail', this.movie)
    },
    getMovieGenre: function () {
      this.$store.dispatch('getMovieGenre', this.movie)
    },
    setToken: function () {
      const jwt = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${jwt}`
      }
      return config
    },
    getComment: function () {
      const MOVIE_ID = this.movie.id
      const config = this.setToken()
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/comments/${MOVIE_ID}/1/`,
        headers: config
      })
        .then((res) => {
          this.$store.state.comments = res.data
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  computed: {
    movieUrl: function () {
      return "https://image.tmdb.org/t/p/original" + `${this.movie.poster_path}`
    }
  }
}
</script>

<style>
.card {
  height: 100%;
  width: 300px;
}
#moviecard {
  height: 450px;
  width: 300px;
  display: flex;
  justify-content: center;
  border: 2px solid darkgray;
  background-color: rgb(202, 240, 221);
}
#moviecard:hover {
  opacity: 0.5;
  /* background-color:; */
}
</style>