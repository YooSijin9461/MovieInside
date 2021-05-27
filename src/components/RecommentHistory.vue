<template>
  <div id="recommenthistory">
    <RecommentHistoryList v-for="(historyrecomment, idx) in historyrecomments" :key="idx" :historyrecomment="historyrecomment"/>
  </div>
</template>

<script>
import RecommentHistoryList from '@/components/RecommentHistoryList.vue'

export default {
  name: 'RecommentHistory',
  components: {
    RecommentHistoryList,
  },
  props: {
    historyrecomments: Array,
  }
}
</script>

<style>
#recommenthistory {
  display: flex;
  justify-content: start;
}
</style>