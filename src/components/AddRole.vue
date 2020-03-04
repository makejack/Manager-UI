<template>
  <el-dialog :visible.sync="dialogVisible" title="添加角色" @closed="closeDialog">
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
      <el-button @click="dialogVisible = false" :disabled="loading" icon="el-icon-close">取消</el-button>
      <el-button type="primary" @click="submitForm" :disabled="loading" icon="el-icon-check">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import http from '@/utils/http'

export default {
  name: 'adminRole',
  props: {
    value: {
      type: Boolean,
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
    submitForm() {
      this.$refs['roleForm'].validate(valid => {
        if (valid) {
          http
            .post('role/AddRole', this.roleForm)
            .then(res => {
              const body = res.data
              if (body.code === 201) {
                this.$emit('completed')
                this.dialogVisible = false
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
