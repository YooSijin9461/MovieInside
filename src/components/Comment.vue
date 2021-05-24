<template>
  <div id="comment">
    <div v-for="(comment, idx) in comments" :key="idx" :comment="comment">
      <ul>
        <li>{{ comment.username }}|{{ comment.contents }}
        <div>
          <input type="text" v-model.trim="contents" @keyup.enter="updateComment(comment)">
          <button @click="updateComment(comment)">수정</button>
          <button @click="deleteComment(comment)">X</button>
        </div>
        </li>
      </ul>
    </div>
    댓글 : <input type="text" v-model.trim="contents" @keyup.enter="addComment">
    <button @click="addComment">등록</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Comment',
  props: {
    moviedetail: Object,
  },
  data: function () {
    return {
      contents: '',
      username: '',
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
      const review = {
        username: this.$store.state.username,
        contents: this.contents,
      }
      if (review.contents) {
        const MOVIE_ID = this.moviedetail.id
        const config = this.setToken()
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/comments/${MOVIE_ID}/1/`,
          data: review,
          headers: config,
        })
          .then(() => {
            // console.log(res)
            this.$store.state.comments.push(review)
            // this.$store.dispatch('getComment', this.moviedetail)
            this.contents = ''
          })
          .catch((err) => {
            console.log(err)
          })
        }
    },
    updateComment: function (comment) {
      const review = {
        username: this.$store.state.username,
        contents: this.contents,
      }
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/comments/update/${comment.id}/`,
        data: review,
        headers: this.setToken()
      })
        .then((res) => {
          console.log(res)
          
        })
    },
    deleteComment: function (comment) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/comments/delete/${comment.id}/`,
        headers: this.setToken()
      })
        .then((res) => {
          console.log(res)
          this.getComment()
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  computed: {
    comments: function () {
      return this.$store.state.comments
    },
    getComment: function () {
      return this.$store.dispatch('getComment', this.moviedetail)
    },
  },
}
</script>

<style>

</style>