<template>
  <div id="moviecard" @click="watchDetail">
    <div class="col">
      <div class="card">
        <img :src="movieUrl" class="card-img-top" alt="..." height="300px">
        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
          <p class="card-text">{{ movie.overview }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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
  height: 600px;
}
</style>