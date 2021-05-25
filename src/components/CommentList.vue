<template>
  <div id="commentlist">
    <ul>
        <li>{{ comment.user.username }}|{{ comment.contents }} 좋아요 {{ comment.likeCount }} 개
          <span v-if="comment.history">(수정됨)</span>
          <input v-if="updateInput" type="text" @keyup.enter="updateComment(idx)" v-model.trim="contents">
          <button v-if="username === comment.user.username" @click="[updateComment(comment), updateOn()]">수정하기</button>
          <button v-if="username === comment.user.username" @click="deleteComment(comment)">X</button>
        </li>
        <button v-if="comment.history" @click="[historyOnOff(), getHistoryComment()]">수정내역 보기</button>
        <CommentHistory v-if="historymode" :comment="comment" :historycomments="historycomments"/>
      </ul>
  </div>
</template>

<script>
import axios from 'axios'
import CommentHistory from '@/components/CommentHistory.vue'

export default {
  name: 'CommentList',
  props: {
    comment: Object,
    moviedetail: Object,
  },
  components: {
    CommentHistory,
  },
  data: function () {
    return {
      username: this.$store.state.username,
      updateInput: false,
      historymode: false,
      contents: this.contents,
      historycomments: [],
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
    updateComment: function (comment) {
      const review = {
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
          this.getComment()
        })
    },
    deleteComment: function (comment) {
      const review = {
        contents: this.contents,
      }
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/comments/delete/${comment.id}/`,
        data: review,
        headers: this.setToken()
      })
        .then((res) => {
          console.log(res)
          this.contents = res.data.contents
          this.getComment()
        })
        .catch((err) => {
          console.log(err)
        })
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
    updateOn: function () {
      this.updateInput = !this.updateInput
    },
    historyOnOff: function () {
      this.historymode = !this.historymode
    },
    getHistoryComment: function () {
      const COMMENT_ID = this.comment.id
      // const config = this.setToken()
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/comments/history/${COMMENT_ID}/`,
        // headers: config
      })
        .then((res) => {
          console.log(res.data)
          this.historycomments = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
  }
}
</script>

<style>

</style>