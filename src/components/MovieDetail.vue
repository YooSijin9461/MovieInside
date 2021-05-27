<template>
  <div id="moviedetail">
    <div class="container">
      <div class="row">
        <div class="moviedetailimg col-md-6">
          <img :src="movieUrl" class="card-img-top" alt="..." height="500px">
        </div>
        <div class="col-md-6 detail-text">
          <h2 class="title">{{ moviedetail.title }}</h2>
          <i class="fas fa-star">  {{ moviedetail.vote_average.toFixed(1) }}</i>
          <hr>
          <h4 class="contents">{{ moviedetail.overview }}</h4>
          <br>
          <p>
            장르: 
            <span v-for="(genre, idx) in detailgenre" :key="idx" :genre="genre">
              {{ genre.name }}
            </span>
          </p>
          <p>출시일자: {{ moviedetail.release_date }}</p>
          <p>평점: {{ moviedetail.vote_average.toFixed(1) }}</p>
          <p>투표수: {{ moviedetail.vote_count }}</p>
      </div>
    </div>
    </div>
    <!-- 임시용 영화id {{ moviedetail.id}} -->
    <Comment />
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
  mounted() {
    // console.log('제발제발',this.moviedetail);
    console.log('asdf',typeof(this.moviedetail.vote_average))
  },
  computed: {
    movieUrl: function () {
      return "https://image.tmdb.org/t/p/original" + `${this.moviedetail.poster_path}`
    },
    ...mapState([
      'detailgenre',
      'moviedetail',
      'movievote',
    ])
  }
}
</script>

<style >
#moviedetail {
  border: 3px solid rgb(228, 200, 228);
  /* display: flex; */
  margin: 10px;
  padding: 10px;
  background-color: rgb(0, 0, 0);
  color: white;
  height: 100%;
}

.moviedetailimg {
  width: 50%;
}

.title {
  font-weight: bold;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 10px;
}

h5 {
  margin: 20px;
}
/* .contents {
  display: flex;
} */
.detail-text {
  text-align: left;
}

.contents {
  line-height: 1.4;
}

.fa-star {
  font-size: 20px;
  width: 100%;
  text-align: right;
}
</style>