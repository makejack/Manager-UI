<template>
  <el-dialog
    title="编辑角色"
    :visible.sync="dialogVisible"
    @open="loadRole"
    @closed="closeDialog"
  >
    <el-form
      v-loading="loading"
      :model="roleForm"
      ref="roleForm"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="roleForm.roleName" maxlength="32" placeholder="角色名称"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible = false" icon="el-icon-close" :disabled="loading">取消</el-button>
      <el-button @click="submitForm" type="primary" icon="el-icon-check" :disabled="loading">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import http from '@/utils/http'

export default {
  name: 'editRole',
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
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
    },
    dialogVisible(val) {
      this.$emit('input', val)
    }
  },
  data() {
    return {
      loading: false,
      dialogVisible: this.value,
      roleForm: {
        id: 0,
        roleName: ''
      },
      rules: {
        roleName: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  methods: {
    closeDialog() {
      this.$refs['roleForm'].resetFields()
    },
    loadRole() {
      this.loading = true
      http
        .get(`role/GetRole/${this.id}`)
        .then(res => {
          const body = res.data
          if (body.code === 200) {
            this.roleForm = body.data
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    submitForm() {
      this.$refs['roleForm'].validate(valid => {
        if (valid) {
          this.loading = true
          http
            .put('role/EditRole', this.roleForm)
            .then(res => {
              const body = res.data
              if (body.code === 204) {
                this.$emit('completed')
                this.dialogVisible = false
              } else if (body.code === 404) {
                this.$message({
                  message: '更新的目标不存在',
                  type: 'warning'
                })
              }
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
