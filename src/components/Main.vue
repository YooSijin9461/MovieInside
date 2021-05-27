<template>
  <div class="hello text-center">
    <h1 class="maintext">여러분의 의견을 마음껏 작성하세요!</h1>
    <img src="https://media1.tenor.com/images/9b2cbf132ef63d300fa42a536eb1b93b/tenor.gif?itemid=12366888" alt="">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.hello {
  height: 100%;
  width: 100%;
}

.maintext {
  color: black;
}
</style>
