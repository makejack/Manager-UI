<template>
  <el-container class="h-100">
    <el-header>
      <TopBar />
    </el-header>
    <el-container style="overflow-y: hidden;">
      <el-aside>
        <Navbar />
      </el-aside>
      <el-main>
        <div class="main-container">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { TopBar, Navbar } from './components'

export default {
  name: 'layout',
  components: {
    TopBar,
    Navbar
  }
}
</script>

<style scoped>
.el-header {
  padding: 0px;
  border-bottom: 1px solid #e6e6e6;
  background-color: #fff;
}
.el-main {
  flex-basis: 0%;
}
.main-container {
  background: #fff;
  border-radius: 5px;
  border: 1px solid #e6e6e6;
  padding: 20px;
}
</style>
