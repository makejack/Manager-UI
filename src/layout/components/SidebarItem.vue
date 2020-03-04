<template>
  <div v-if="!item.hidden">
    <el-menu-item v-if="hasChildren(item.children,item)" :index="resolvePath(item.path)">
      <i :class="item.meta && item.meta.icon"></i>
      <span slot="title">{{item.meta.title}}</span>
    </el-menu-item>

    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <i :class="item.meta && item.meta.icon"></i>
        <span>{{item.meta.title}}</span>
      </template>
      <sidebar-item v-for="(subItem,index) in item.children" :key="index" :item="subItem"></sidebar-item>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'

export default {
  name: 'sidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    hasChildren(children = [], parent) {
      if (parent.hiddenChildren) {
        return true
      }

      if (children.length === 0) {
        return true
      }

      return false
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
