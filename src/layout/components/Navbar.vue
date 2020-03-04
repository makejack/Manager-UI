<template>
  <div class="navbar h-100">
    <el-menu router class="h-100" :default-active="active">
      <sidebar-item v-for="(route,index) in pRoutes" :key="index" :item="route" />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  name: 'navbar',
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters({
      pRoutes: 'permission/permissionRoutes'
    }),
    active() {
      return this.$route.fullPath
    }
  }
}
</script>
