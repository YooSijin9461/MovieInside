<template>
  <div id="recomment">
    <RecommentList v-for="(recomment, idx) in recommentslist" :key="idx" :recomment="recomment" :comment="comment"/>
    <div v-if="recommentstate">
      <input class="commentform" type="text" v-model.trim="contents">
      <button class="inputbtn" @click="addRecomment">등록</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import RecommentList from '@/components/RecommentList.vue'

export default {
  name: 'Recomment',
  data: function () {
    return {
      contents: '',
      datarecomments: [],
    }
  },
  props: {
    comment: Object,
    recommentstate: Boolean,
    username: String,
  },
  components: {
    RecommentList,
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
      const COMMENT_ID = this.comment.id
      const config = this.setToken()
      const recommentItem = {
        contents: this.contents,
      }
      if (recommentItem.contents) {
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/comments/recomments/${COMMENT_ID}/`,
          data: recommentItem,
          headers: config,
        })
          .then(() => {
            // console.log(res)
            this.getRecomment()
            this.contents = ''
          })
          .catch((err) => {
            console.log(err)
          })
        }
    },
    getRecomment: function () {
      const COMMENT_ID = this.comment.id
      const config = this.setToken()
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/comments/recomments/${COMMENT_ID}/`,
        headers: config
      })
        .then((res) => {
          // this.$store.state.recomments = res.data
          // console.log(res)
          this.datarecomments = res.data
          // this.$store.state.recomments = res.data
          // return this.datarecomments
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  mounted: function () {
    this.getRecomment()
  },
  // updated: function () {
  //   this.getRecomment()
  // },
  computed: {
  // recomments: function () {
  //   return this.$store.state.recomments
  // },
  recommentslist: function () {
    return this.datarecomments
  },
  }
}
</script>

<style>

</style>