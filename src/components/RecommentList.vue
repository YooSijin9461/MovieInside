<template>
  <div id="recommentlist">
    <ul>
      <li>
        <h5 class="recomment">
          <i class="far fa-heart" v-if="!recomment.myLike" @click="recommentLike()">   {{ recomment.likeCount }}</i>
          <i class="fas fa-heart" v-else @click="recommentLike()">   {{ recomment.likeCount }}</i>
          <p class="comm">{{ recomment.user.username }} | {{ recomment.contents }}     </p>
          <span v-if="recomment.history">(수정됨)</span>
          <p class="recommbtn">
          <input v-if="updateInput" type="text" @keyup.enter="updateRecomment()" v-model.trim="contents">
            <b-button pill class="btn-warning" v-if="username === recomment.user.username" @click="[updateRecomment(), updateOn()]">수정하기</b-button>
            <b-button pill variant="success" v-if="recomment.history" @click="[historyOnOff(), getHistoryRecomment()]">수정내역 보기</b-button>
            <b-button class="btn-danger" v-if="username === recomment.user.username" @click="deleteRecomment()">X</b-button>
          </p>
        </h5>
        <hr>
      </li>
      <RecommentHistory v-if="historymode" :comment="comment" :historyrecomments="historyrecomments"/>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import RecommentHistory from '@/components/RecommentHistory.vue'

export default {
  name: 'RecommentList',
  props: {
    recomment: Object,
    comment: Object,
  },
  components: {
    RecommentHistory,
  },
  data: function () {
    return {
      username: this.$store.state.username,
      updateInput: false,
      historymode: false,
      contents: this.contents,
      historyrecomments: [],
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
    updateRecomment: function () {
      const review = {
        contents: this.contents,
      }
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/comments/recomments/update/${this.recomment.id}/`,
        data: review,
        headers: this.setToken()
      })
        .then((res) => {
          console.log(res)
          this.getRecomment()
        })
    },
    deleteRecomment: function () {
      const review = {
        contents: this.contents,
      }
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/comments/recomments/delete/${this.recomment.id}/`,
        data: review,
        headers: this.setToken()
      })
        .then((res) => {
          console.log(res)
          this.contents = res.data.contents
          this.getRecomment()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getRecomment: function () {
      const COMMENT_ID = this.comment.id
      const config = this.setToken()
      // const idx = this.recomment.id
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/comments/recomments/${COMMENT_ID}/`,
        headers: config
      })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            if (this.recomment.id === res.data[i].id) {
              this.recomment.contents = res.data[i].contents
              this.recomment.created_at = res.data[i].created_at
              this.recomment.history = res.data[i].history
              this.recomment.likeCount = res.data[i].likeCount
              this.recomment.myLike = res.data[i].myLike
              this.recomment.status = res.data[i].status
            }
          }
          // console.log(res)
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
    getHistoryRecomment: function () {
      const COMMENT_ID = this.recomment.id
      // const config = this.setToken()
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/comments/recomments/history/${COMMENT_ID}/`,
        // headers: config
      })
        .then((res) => {
          console.log(res.data)
          this.historyrecomments = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    recommentLike: function () {
      const COMMENT_ID = this.recomment.id
      const config = this.setToken()
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/comments/recomments/like/${COMMENT_ID}/`,
        headers: config
      })
        .then(() => {
          this.getRecomment()
          // console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  mounted: function () {
    this.getRecomment()
  }
}
</script>

<style>
.recomment {
  display: flex;
  align-content: center;
}
.recommbtn {
  margin-left: auto;
  color: black;
}
</style>