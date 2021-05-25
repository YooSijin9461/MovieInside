<template>
  <div id="commentlist">
    <ul>
        <li>{{ comment.username }}|{{ comment.contents }}
          <input v-if="username === comment.username" type="text" @keyup.enter="updateComment(idx)" :value="comment.contents">
          <button v-if="username === comment.username" @click="updateComment(comment)">수정하기</button>
          <button v-if="updatecount>0" @click="watchHistory">수정내역</button>
          <button v-if="username === comment.username" @click="deleteComment(comment)">X</button>
        </li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CommentList',
  props: {
    comment: Object,
  },
  data: function () {
    return {
      updatecount: 0,
      username: this.$store.state.username,
    }
  },
  methods: {
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
          this.data.updatecount += 1
          
        })
    },
    deleteComment: function (comment) {
      const review = {
        username: this.$store.state.username,
        contents: this.contents,
      }
      // console.log(idx)
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/comments/delete/${comment.id}/`,
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
  }
}
</script>

<style>

</style>