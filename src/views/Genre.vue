<template>
  <div id="Genre">
    <span class="genrebutton">
      <MovieCardGenre v-for="(moviegenre, idx) in moviesgenre" :key="idx" :moviegenre="moviegenre"/>
    </span>
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
    moviesgenre: function () {
      return this.$store.state.moviesgenre
    },
    genremovies: function () {
      return this.$store.state.genremovies
    }
  },
  mounted: function () {
    this.$store.dispatch('genreMovieList')
  },
}
</script>

<style>
.genrebutton {
  display: flex;
  flex-flow: row wrap;
  
}
</style>