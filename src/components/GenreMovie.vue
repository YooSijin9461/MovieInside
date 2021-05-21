<template>
  <div id="genremovie">
    <div id="cards" class="row row-cols-3 row-cols-md-6">
      <MovieCard v-for="(movie, idx) in genremovies" :key="idx" :movie="movie"/>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'GenreMovie',
  components: {
    MovieCard,
  },
  computed: {
    genremovies: function () {
      return this.$store.state.genremovies
    }
  }
}
</script>

<style>

</style>