<template>
  <div id="moviedetail">
    <img :src="movieUrl" class="card-img-top" alt="..." height="700px">
    <h2>제목: {{ moviedetail.title }}</h2>
    <h4>내용: {{ moviedetail.overview }}</h4>
    <h5>출시일자: {{ moviedetail.release_date }}</h5>
    <h5>평점: {{ moviedetail.vote_average }}</h5>
    <h5>투표수: {{ moviedetail.vote_count }}</h5>
    <div v-for="(genre, idx) in detailgenre" :key="idx" :genre="genre">
      장르: {{ genre.name }}
    </div>
    임시용 영화id {{ moviedetail.id}}
    <Comment :moviedetail="moviedetail"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Comment from '@/components/Comment.vue'

export default {
  name: 'MovieDetail',
  components: {
    Comment,
  },
  methods: {
    
  },
  computed: {
    movieUrl: function () {
      return "https://image.tmdb.org/t/p/original" + `${this.moviedetail.poster_path}`
    },
    ...mapState([
      'detailgenre',
      'moviedetail',
    ])
  }
}
</script>

<style>

</style>