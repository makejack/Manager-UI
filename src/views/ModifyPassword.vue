<template>
  <div class="modify-password" v-loading="loading">
    <el-form
      :model="modifyPasswordForm"
      ref="modifyPasswordForm"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="旧密码" prop="oldPassword" :error="errMsg.OldPassword">
        <el-input type="password" v-model="modifyPasswordForm.oldPassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword" :error="errMsg.NewPassword">
        <el-input type="password" v-model="modifyPasswordForm.newPassword" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input type="password" v-model="modifyPasswordForm.confirmPwd" placeholder="请输入确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-check" @click="sumitModify">确 认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import http from '@/utils/http'

export default {
  name: 'modifyPassword',
  data() {
    var checkNewPwd = (rule, value, callback) => {
      if (value) {
        this.$refs['modifyPasswordForm'].validateField('confirmPwd')
      }
      callback()
    }
    var checkConfirmPwd = (rule, value, callback) => {
      if (value !== this.modifyPasswordForm.newPassword) {
        callback(new Error('新密码与确认密码不一致'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      modifyPasswordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPwd: ''
      },
      errMsg: {
        OldPassword: '',
        NewPassword: ''
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: '请输入旧密码',
            trigger: ['change', 'blur']
          }
        ],
        newPassword: [
          {
            required: true,
            message: '请输入新密码',
            trigger: ['change', 'blur']
          },
          {
            validator: checkNewPwd,
            trigger: 'blur'
          }
        ],
        confirmPwd: [
          {
            required: true,
            message: '请输入确认密码',
            trigger: ['change', 'blur']
          },
          {
            validator: checkConfirmPwd,
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  methods: {
    sumitModify() {
      this.$refs['modifyPasswordForm'].validate(valid => {
        if (valid) {
          this.loading = true
          const { oldPassword, newPassword } = this.modifyPasswordForm
          http
            .put('admin/ModifyPassword', { oldPassword, newPassword })
            .then(res => {
              const body = res.data
              if (body.code === 204) {
                this.$message({ message: '密码修改成功', type: 'success' })
                this.$refs['modifyPasswordForm'].resetFields()
              } else if (body.code === 400) {
                body.data.forEach(item => {
                  this.errMsg[item.key] = item.message
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
