<template>
  <el-dialog :visible.sync="dialobVisible" title="添加管理员" @closed="closeDialog">
    <el-form
      v-loading="loading"
      :model="adminForm"
      ref="adminForm"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="用户名" prop="userName" :error="errMsg.UserName">
        <el-input v-model="adminForm.userName" placeholder="用户名 6-32个字符"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :error="errMsg.Password">
        <el-input v-model="adminForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input v-model="adminForm.confirmPwd" type="password" placeholder="请输入确认密码"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roles" :error="errMsg.Roles">
        <el-select v-model="adminForm.roles" multiple placeholder="请选择" class="w-100">
          <el-option
            v-for="(item,index) in adminRoles"
            :key="index"
            :label="item.roleName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button icon="el-icon-close" @click="dialobVisible =false">取消</el-button>
      <el-button type="primary" icon="el-icon-check" @click="submitForm">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import http from '@/utils/http'

export default {
  name: 'addAdmin',
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    },
    roles: {
      type: Array,
      required: true
    }
  },
  watch: {
    value(val) {
      this.dialobVisible = val
    },
    roles(val) {
      this.adminRoles = val
    },
    dialobVisible(val) {
      this.$emit('input', val)
    }
  },
  data() {
    var checkPassword = (rule, value, callback) => {
      if (value) {
        this.$refs['adminForm'].validateField('confirmPwd')
      }
      callback()
    }
    var checkConfirmPwd = (rule, value, callback) => {
      if (value !== this.adminForm.password) {
        callback(new Error('密码与确认密码不一致'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      dialobVisible: this.value,
      adminRoles: this.roles,
      adminForm: {
        userName: '',
        password: '',
        confirmPwd: '',
        roles: []
      },
      errMsg: {
        UserName: '',
        Password: '',
        Roles: ''
      },
      rules: {
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['change', 'blur']
          },
          {
            min: 6,
            max: 32,
            message: '用户名长度为6-32个字符的数字和字母',
            trigger: ['change', 'blur']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['change', 'blur']
          },
          {
            min: 6,
            max: 32,
            message: '密码长度为6-32个字符的数字和字母',
            trigger: ['change', 'blur']
          },
          {
            validator: checkPassword,
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
        ],
        roles: [{ required: true, message: '请选择角色 ', trigger: 'blur' }]
      }
    }
  },
  methods: {
    closeDialog() {
      this.$refs['adminForm'].resetFields()
    },
    submitForm() {
      this.$refs['adminForm'].validate(valid => {
        if (valid) {
          this.loading = true
          const { userName, password, roles } = this.adminForm
          http
            .post('auth/Register', { userName, password, roles })
            .then(res => {
              const body = res.data
              if (body.code === 200) {
                this.$emit('completed')
                this.dialobVisible = false
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
