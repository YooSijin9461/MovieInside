<template>
  <div id="commenthistorylist">
    <ul>
      <li>
        <div>이전 내용 : {{ historycomment.beforeContent }} | 작성 시각 : {{ historycomment.created_at }}</div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'CommentHistoryList',
  data: function () {
    return {
    
    }
  },
  props: {
    historycomment: Object,
  },
  methods: {
    
  },
  computed: {

  },
}
</script>

<style>

</style>