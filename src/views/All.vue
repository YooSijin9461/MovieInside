<template>
  <div id="All">
    <h2>전체 영화 페이지</h2>
    <MovieDetail v-if="watchdetail"/>
    <div id="cards" class="row row-cols-3 row-cols-md-5">
      <MovieCard v-for="(movie, idx) in movies" :key="idx" :movie="movie"/>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import MovieDetail from '@/components/MovieDetail.vue'

export default {
  name: 'All',
  components: {
    MovieCard,
    MovieDetail,
  },
  methods: {
  },
  computed: {
    allMovieList: function () {
      return this.$store.dispatch('allMovieList')
    },
    movies: function () {
      return this.$store.state.movies
    },
    watchdetail: function () {
      return this.$store.state.watchdetail
    },
  }
}
</script>

<style>
#cards {
  margin: 1px;
}
</style>