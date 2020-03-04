<template>
  <el-dialog :visible.sync="dialogVisible" title="编辑管理员" @open="openDialog" @closed="closeDialog">
    <el-form
      v-loading="loading"
      :model="adminForm"
      :rules="rules"
      ref="adminForm"
      label-width="120px"
    >
      <el-form-item label="用户名">
        <el-input v-model="adminForm.userName" readonly></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-select v-model="adminForm.roles" multiple class="w-100">
          <el-option
            v-for="(item,index) in adminRoles"
            :key="index"
            :value="item.id"
            :label="item.roleName"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button icon="el-icon-close" @click="dialogVisible =false" :disabled="loading">取消</el-button>
      <el-button icon="el-icon-check" type="primary" @click="submitForm" :disabled="loading">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import http from '@/utils/http'

export default {
  name: 'editForm',
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    },
    id: {
      type: Number,
      default: 0,
      required: true
    },
    roles: {
      type: Array,
      required: true
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
    },
    id(val) {
      this.adminId = val
    },
    roles(val) {
      this.adminRoles = val
    },
    dialogVisible(val) {
      this.$emit('input', val)
    }
  },
  data() {
    return {
      loading: false,
      dialogVisible: this.value,
      adminId: this.id,
      adminRoles: this.roles,
      adminForm: {
        id: 0,
        userName: '',
        roles: []
      },
      rules: {
        roles: [
          { required: true, message: '请输入角色', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.loading = true
      http
        .put('admin/EditAdmin', this.adminForm)
        .then(res => {
          const body = res.data
          if (body.code === 204) {
            this.$emit('completed')
            this.dialogVisible = false
          } else if (body.code === 404) {
            this.$message({
              message: '编辑的目标不存在',
              type: 'warning'
            })
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    closeDialog() {
      this.$refs['adminForm'].resetFields()
    },
    openDialog() {
      this.loading = true
      http
        .get(`admin/GetAdmin/${this.adminId}`)
        .then(res => {
          const body = res.data
          if (body.code === 200) {
            this.adminForm = body.data
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
