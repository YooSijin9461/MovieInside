<template>
  <div id="genremovie">
    <MovieDetail v-if="watchdetail"/>
    <div id="cards" class="row row-cols-3 row-cols-md-5" v-else>
      <MovieCard v-for="(movie, idx) in genremovies" :key="idx" :movie="movie"/>
    </div>
    <div class="empty" v-if="genremovies.length === 0">
      <p class=""></p>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import MovieDetail from '@/components/MovieDetail.vue'

export default {
  name: 'GenreMovie',
  data: function () {
    return {
      movieId: '',
    }
  },
  components: {
    MovieCard,
    MovieDetail,
  },
  methods: {
  },
  computed: {
    genremovies: function () {
      return this.$store.state.genremovies
    },
    watchdetail: function () {
      return this.$store.state.watchdetail
    }
  },
  mounted() {
    console.log(this.genremovies.length === 0);
  }
}
</script>

<style>
.empty {
  height:100vh;
}
</style>