<template>
  <div id="moviedetail">
    <img :src="movieUrl" class="card-img-top" alt="..." height="700px">
    <h2>제목: {{ moviedetail.title }}</h2>
    <h4>내용: {{ moviedetail.overview }}</h4>
    <h5>출시일자: {{ moviedetail.release_date }}</h5>
    <h5>평점: {{ moviedetail.vote_average }}</h5>
    <h5>투표수: {{ moviedetail.vote_count }}</h5>
    {{ detailgenre }}
    <div v-for="(genre, idx) in detailgenre" :key="idx" :genre="genre">
      {{ genre.name }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'MovieDetail',
  methods: {
    
  },
  computed: {
    getMovieGenre: function () {
      return this.$store.dispatch('getMovieGenre')
    },
    detailgenre: function () {
      return this.$store.state.detailgenre
    },
    movieUrl: function () {
      return "https://image.tmdb.org/t/p/original" + `${this.moviedetail.poster_path}`
    },
    moviedetail: function () {
      return this.$store.state.moviedetail
    },
  }
}
</script>

<style>

</style>