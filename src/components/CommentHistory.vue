<template>
  <div id="commenthistory">
    <CommentHistoryList :comment="comment" v-for="(historycomment, idx) in historycomments" :key="idx" :historycomment="historycomment"/>
  </div>
</template>

<script>

import CommentHistoryList from '@/components/CommentHistoryList.vue'

export default {
  name: 'CommentHistory',
  data: function () {
    return {
      historycommentslist: [],
    }
  },
  components: {
    CommentHistoryList,
  },
  props: {
    comment: Object,
    historycomments: Array,
  },
  methods: {
    
  },
  computed: {
    // historycomments: function () {
    //   // this.getHistoryComment()
    //   return this.historycommentslist
    // }
    // // getHistoryComments: function () {
    // //   return this.$store.dispatch('getHistoryComments', comment)
    // // },
  }
}
</script>

<style>
#commenthistory {
  display: flex;
  justify-content: start;
}
</style>