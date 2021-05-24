<template>
  <div id="comment">
    <div v-for="(comment, idx) in comments" :key="idx" :comment="comment">
      <ul>
        <li>{{ comment.username }}|{{ comment.contents }}{{comment}}{{idx}}
          <input v-if="username === comment.username" type="text" @keyup.enter="updateComment(idx)" :value="comment.contents">
          <button @click="updateComment(idx)">수정하기</button>
          <button v-if="updatecount>0" @click="watchHistory">수정내역</button>
          <button @click="deleteComment(idx)">X</button>
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
      updatecount: 0,
      history: [],
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

    updateComment: function (idx) {
      const review = {
        username: this.$store.state.username,
        contents: this.contents,
      }
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/comments/update/${idx}/`,
        data: review,
        headers: this.setToken()
      })
        .then((res) => {
          console.log(res)
          this.data.updatecount += 1
          
        })
    },
    deleteComment: function (idx) {
      const review = {
        username: this.$store.state.username,
        contents: this.contents,
      }
      // console.log(idx)
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/comments/delete/${idx}/`,
        data: review,
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