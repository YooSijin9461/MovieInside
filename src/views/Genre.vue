<template>
  <div id="Genre">
    <h2>장르별 영화 목록</h2>
    <div class="row row-cols-6">
      <MovieCardGenre v-for="(moviegenre, idx) in moviesgenre" :key="idx" :moviegenre="moviegenre"/>
    </div>
    <GenreMovie />
  </div>
</template>

<script>
import MovieCardGenre from '@/components/MovieCardGenre.vue'
import GenreMovie from '@/components/GenreMovie.vue'

export default {
  name: 'Genre',
  components: {
    MovieCardGenre,
    GenreMovie,
  },
  methods: {
  },
  computed: {
    genreMovieList: function () {
      return this.$store.dispatch('genreMovieList')
    },
    moviesgenre: function () {
      return this.$store.state.moviesgenre
    },
    genremovies: function () {
      return this.$store.state.genremovies
    }
  }
}
</script>

<style>

</style>