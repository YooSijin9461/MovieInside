<template>
  <div id="recomment">
    <RecommentList v-for="(recomment, idx) in recomments" :key="idx" :recomment="recomment"/>
    <input type="text" v-model.trim="contents">
    <button @click="addRecomment">등록</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Recomment',
  data: function () {
    return {
      contents: '',
    }
  },
  methods: {
    setToken: function () {
      const jwt = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${jwt}`
      }
      return config
    },
    addRecomment: function () {
      // const MOVIE_ID = this.moviedetail.id
      const config = this.setToken()
      const recommentItem = {
        contents: this.contents,
      }
      if (recommentItem.contents) {
        axios({
          // method: 'post',
          // url: `http://127.0.0.1:8000/comments/${MOVIE_ID}/1/`,
          data: recommentItem,
          headers: config,
        })
          .then((res) => {
            console.log(res)
            this.getRecomment()
            this.contents = ''
          })
          .catch((err) => {
            console.log(err)
          })
        }
    },
    getRecomment: function () {
      // const MOVIE_ID = this.moviedetail.id
      const config = this.setToken()
      axios({
        // method: 'get',
        // url: `http://127.0.0.1:8000/comments/${MOVIE_ID}/1/`,
        headers: config
      })
        .then((res) => {
          this.$store.state.recomments = res.data
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style>

</style>