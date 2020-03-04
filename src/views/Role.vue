<template>
  <div>
    <div class="toolbar">
      <el-button :loading="loading" type="primary" icon="el-icon-plus" @click="addRoleVisible = true">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="roleData" border>
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scoped">
          <el-button size="mini" @click="editRole(scoped.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteRole(scoped.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <add-role v-model="addRoleVisible" @completed="loadRoles"></add-role>
    <edit-role v-model="editRoleVisible" :id="id" @completed="loadRoles"></edit-role>
  </div>
</template>

<script>
import http from '@/utils/http'
import AddRole from '@/components/AddRole'
import EditRole from '@/components/EditRole'

export default {
  name: 'role',
  components: {
    AddRole,
    EditRole
  },
  data() {
    return {
      loading: false,
      addRoleVisible: false,
      editRoleVisible: false,
      id: 0,
      roleData: []
    }
  },
  methods: {
    editRole(row) {
      this.id = row.id
      this.editRoleVisible = true
    },
    deleteRole(row) {
      this.$confirm(`确认是否删除角色：${row.roleName} `, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          http
            .delete(`role/DeleteRole/${row.id}`)
            .then(res => {
              const body = res.data
              if (body.code === 204) {
              } else if (body.code === 404) {
                this.$message({
                  message: '删除的目标不存在',
                  type: 'warning'
                })
              }
              this.loadRoles()
            })
            .catch(() => {
              this.loading = false
            })
        })
        .catch(() => {})
    },
    loadRoles() {
      this.loading = true
      http
        .get('role/GetRoles')
        .then(res => {
          const body = res.data
          if (body.code === 200) {
            this.roleData = body.data
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  created() {
    this.loadRoles()
  }
}
</script>
