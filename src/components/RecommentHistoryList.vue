<template>
  <div id="recommendhistorylist">
    <div>이전 내용 : {{ historyrecomment.beforeContent }} | 작성 시각 : {{ historyrecomment.created_at }}</div>
  </div>
</template>

<script>
export default {
  name: 'RecommentHistoryList',
  props: {
    historyrecomment: Object,
  },
}
</script>

<style>

</style>