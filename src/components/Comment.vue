<template>
  <div id="comment">
    <CommentList v-for="(comment, idx) in comments" :key="idx" :comment="comment" :moviedetail="moviedetail"/>
    <input type="text" v-model.trim="contents">
    <button @click="addComment">등록</button>
  </div>
</template>

<script>
import axios from 'axios'
import CommentList from '@/components/CommentList.vue'

export default {
  name: 'Comment',
  props: {
    moviedetail: Object,
  },
  components: {
    CommentList,
  },
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
    addComment: function () {
      const MOVIE_ID = this.moviedetail.id
      const config = this.setToken()
      const commentItem = {
        contents: this.contents,
      }
      if (commentItem.contents) {
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/comments/${MOVIE_ID}/1/`,
          data: commentItem,
          headers: config,
        })
          .then((res) => {
            console.log(res)
            // console.log(review)
            this.getComment()
            this.contents = ''
          })
          .catch((err) => {
            console.log(err)
          })
        }
    },
    getComment: function () {
      const MOVIE_ID = this.moviedetail.id
      const config = this.setToken()
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/comments/${MOVIE_ID}/1/`,
        headers: config
      })
        .then((res) => {
          this.$store.state.comments = res.data
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  computed: {
    // getComment: function () {
    //   return this.$store.dispatch('getComment', this.moviedetail, this.config)
    // },
    comments: function () {
      return this.$store.state.comments
    },
  },
}
</script>

<style>

</style>