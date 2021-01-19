<template>
  <div id="app">
    <router-view />
    <ask-dialog />
  </div>
</template>
<script>
import AskDialog from 'components/common/AskDialog'
export default {
  components: {
    AskDialog
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background-color: #eee;
}
li {
  list-style: none;
}
input {
  outline: none;
  border: none;
}
a {
  text-decoration: none;
  cursor: pointer;
}
</style>
