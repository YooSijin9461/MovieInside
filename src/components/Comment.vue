<template>
  <div id="comment" class="col-12">
    <CommentList v-for="(comment, idx) in comments" :key="idx" :comment="comment" :moviedetail="moviedetail"/>
    <div id="votename">
      <label style="margin-right: 10px;" for="vote">평점:</label>
      <select name="vote" id="vote" v-model="vote">
        <option value=1 selected>1</option>
        <option value=2>2</option>
        <option value=3>3</option>
        <option value=4>4</option>
        <option value=5>5</option>
        <option value=6>6</option>
        <option value=7>7</option>
        <option value=8>8</option>
        <option value=9>9</option>
        <option value=10>10</option>
      </select>
    <input class="commentform" type="text" v-model.trim="contents">
    <button id="vote" class="inputbtn" @click="[addComment(), getVote()]">등록</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CommentList from '@/components/CommentList.vue'
import { mapState } from 'vuex'

export default {
  name: 'Comment',
  components: {
    CommentList,
  },
  data: function () {
    return {
      contents: '',
      vote: 1,
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
          .then(() => {
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
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getVote: function () {
      const MOVIE_ID = this.moviedetail.id
      const config = this.setToken()
      const voteItem = {
        vote: this.vote,
      }
      if (voteItem.vote) {
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/movies/vote/${MOVIE_ID}/`,
          data: voteItem,
          headers: config
        })
          .then((res) => {
            this.$store.state.moviedetail.vote_average = res.data.vote_average
            this.$store.state.moviedetail.vote_count = res.data.vote_count
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    
  },
  mounted: function () {
    this.getComment()
  },
  computed: {
    ...mapState(['moviedetail']),
    comments: function () {
      return this.$store.state.comments
    },
  },
}
</script>

<style>
.inputbtn {
  color: black;
}

.commentform {
  width: 80%;
  color: black;
}

#vote {
  color: black;
}

select {
  height: 26px;
  width: 50px;
}
</style>