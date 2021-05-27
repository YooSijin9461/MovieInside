<template>
  <div id="All">
    <MovieDetail v-if="watchdetail"/>
    <!-- <div id="cards" class="row row-cols-3 row-cols-md-5"> -->
    <div id="cards">
      <MovieCard v-for="(movie, idx) in movies" :key="idx" :movie="movie"/>
    </div>
    <!-- <paginate
    v-model="page" 
    :page-count="20" 
    :page-range="3" 
    :margin-pages="2" 
    :click-handler="clickCallback" 
    :prev-text="'Prev'" 
    :next-text="'Next'" 
    :container-class="'pagination'" 
    :page-class="'page-item'">
    </paginate> -->
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
  data: function () {
    return {
      page: 1,
      pageNum: 1,
    }
  },
  methods: {
    clickCallback: function (pageNum) {
      console.log(pageNum)
    }
  },
  mounted: function () {
      this.$store.dispatch('allMovieList')
  },
  computed: {
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
  display: flex;
  flex-flow: row wrap;
}

#all {
  display: flex;
  justify-content: center;
}
</style>