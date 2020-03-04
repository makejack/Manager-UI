<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
body {
  background-color: #f0f2f5;
}
.el-pagination {
  margin-top: 20px;
}
.toolbar {
  margin-bottom: 20px;
}
.h-100 {
  height: 100%;
}
.w-100 {
  width: 100%;
}
.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
