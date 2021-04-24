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

<style lang="stylus">
mainColor = pink
bgColor = #eee
* {
  box-sizing: border-box;
}
ul,h1,h2,h3,h4,button {
  padding: 0;
  margin: 0;
}
body {
  background-color: bgColor;
  font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
  font-size: 15px;
  color: #121212;
  margin: 0;
}
li {
  list-style: none;
}
input, textarea {
  outline: none;
  border: none;
}
a {
  text-decoration: none;
  cursor: pointer;
}
button {
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
}
</style>
