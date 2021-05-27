<template>
  <div id="recommend">
    <div v-if="!watchrecommend">
      <p class="norecommend"></p>
    </div>
    <MovieDetail v-else/>
  </div>
</template>

<script>
import axios from 'axios'
import MovieDetail from '@/components/MovieDetail.vue'
import { mapState } from 'vuex'

export default {
  name: 'Recommend',
  data: function () {
    return {
      watchrecommend: this.$store.state.watchrecommend,
    }
  },
  components: {
    MovieDetail,
  },
  methods: {
    setToken: function () {
      const jwt = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${jwt}`
      }
      return config
    },
    movieRecommend: function () {
      if (this.$store.state.moviedetail.length !== 0) {
        this.watchrecommend = true
        const MOVIE_ID = this.$store.state.moviedetail.id
        const config = this.setToken()
        axios({
          method: 'get',
          url: `http://127.0.0.1:8000/movies/recommend/${MOVIE_ID}/`,
          headers: config
        })
          .then((res) => {
            // console.log("recommended: ", res)
            this.$store.state.moviedetail = res.data
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.watchrecommend = false
      }
    },
  },
  created: function () {
    // this.movieRecommend()
  },
  computed: {
    ...mapState([
      'moviedetail',
    ])
  }
}
</script>

<style>
.norecommend {
  font-size: 100px;
  color: white;
  height: 100vh;
}
</style>
