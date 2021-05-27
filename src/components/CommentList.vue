<template>
  <div id="commentlist">
    <h4 class="comment">
      <i class="far fa-heart" v-if="!comment.myLike" @click="commentLike()">&#160; </i>
      <i class="fas fa-heart" v-else @click="commentLike()">&#160;</i>
      <p class="comm"> {{ comment.user.username }} | 내용: {{ comment.contents }} | 좋아요 {{ comment.likeCount }} 개</p>
      <span v-if="comment.history">(수정됨)</span>
      <p class="recommbtn">
        <input v-if="updateInput" type="text" @keyup.enter="updateComment(idx)" v-model.trim="contents">
        <b-button class="btn-warning" v-if="username === comment.user.username" @click="[updateComment(comment), updateOn()]">수정하기</b-button>
        <b-button class="btn-success" v-if="comment.history" @click="[historyOnOff(), getHistoryComment()]">수정내역 보기</b-button>
        <b-button variant="danger" v-if="username === comment.user.username" @click="deleteComment(comment)">X</b-button>
        <b-button class="btn-info" @click="changeRecommentState">답글달기</b-button>
      </p>
    </h4>
    <hr>
    <CommentHistory v-if="historymode" :comment="comment" :historycomments="historycomments"/>
    <Recomment :comment="comment" :recommentstate="recommentstate" :username="username" />
  </div>
</template>

<script>
import axios from 'axios'
import CommentHistory from '@/components/CommentHistory.vue'
import Recomment from '@/components/Recomment.vue'


export default {
  name: 'CommentList',
  props: {
    comment: Object,
    moviedetail: Object,
  },
  components: {
    CommentHistory,
    Recomment,
  },
  data: function () {
    return {
      username: this.$store.state.username,
      updateInput: false,
      historymode: false,
      contents: this.contents,
      historycomments: [],
      recommentstate: false,
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
          this.getRecomment()
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
    commentLike: function () {
      const COMMENT_ID = this.comment.id
      const config = this.setToken()
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/comments/like/${COMMENT_ID}/`,
        headers: config
      })
        .then((res) => {
          this.getComment()
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changeRecommentState: function () {
      this.recommentstate = !this.recommentstate
    },
    getRecomment: function () {
      const COMMENT_ID = this.comment.id
      const config = this.setToken()
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/comments/recomments/${COMMENT_ID}/`,
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
.comment {
  display: flex;
}

.comm {
  margin-left: 20px;
}
</style>