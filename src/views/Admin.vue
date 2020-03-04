<template>
  <div class="admin">
    <div class="toolbar">
      <el-button type="primary" icon="el-icon-plus" @click="addDialogVisible = true">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="adminData" border>
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="账号" prop="userName"></el-table-column>
      <el-table-column label="角色" prop="roles">
        <template slot-scope="scope">
          <div v-html="scope.row.roles"></div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button :disabled="!canEdit()" size="mini" @click="editAdmin(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <add-admin v-model="addDialogVisible" :roles="roles" @completed="loadAdmins"></add-admin>
    <edit-admin v-model="editDialogVisible" :id="adminId" :roles="roles" @completed="loadAdmins"></edit-admin>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import http from '@/utils/http'
import AddAdmin from '@/components/AddAdmin'
import EditAdmin from '@/components/EditAdmin'

export default {
  name: 'admin',
  components: {
    AddAdmin,
    EditAdmin
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/getUser'
    })
  },
  data() {
    return {
      loading: false,
      addDialogVisible: false,
      editDialogVisible: false,
      adminId: 0,
      totalRow: 0,
      adminData: [],
      roles: []
    }
  },
  methods: {
    canEdit() {
      let res = false
      if (this.userInfo) {
        res = this.userInfo.roles.includes('admin')
      }
      return res
    },
    formatterRole(value) {
      let html = ''
      value.forEach(item => {
        html += `<span class="el-tag">${item}</span>`
      })
      return html
    },
    editAdmin(row) {
      this.adminId = row.id
      this.editDialogVisible = true
    },
    loadAdmins() {
      this.loading = true
      http
        .get('admin/GetAllAdmins')
        .then(res => {
          const body = res.data
          if (body.code === 200) {
            this.adminData = body.data.data
            for (let i = 0; i < this.adminData.length; i++) {
              const arr = this.adminData[i]
              this.adminData[i].roles = this.formatterRole(arr.roles)
            }
            this.totalRow = body.data.totalRow
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    loadRoles() {
      http
        .get('role/GetRoles')
        .then(res => {
          const body = res.data
          if (body.code === 200) {
            this.roles = body.data
          }
        })
        .catch(() => {})
    }
  },
  created() {
    this.loadAdmins()
    this.loadRoles()
  }
}
</script>
