<template>
  <div>
    <div class="page-title">公司简介</div>
    <el-form v-loading="loading" :model="form" ref="form" :rules="rules">
      <el-form-item prop="description">
        <el-input v-model="form.description" type="textarea" class="w-100" :rows="10"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-check" @click="submitForm">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import http from '@/utils/http'

export default {
  naem: 'companyProfile',
  data() {
    return {
      loading: false,
      form: {
        id: 0,
        description: ''
      },
      rules: {
        description: [
          {
            required: true,
            message: '请输入公司简介',
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          http
            .post('/liteapp/SaveCompanyProfile', this.form)
            .then(res => {
              const body = res.data
              if (body.code === 200) {
                this.$alert('公司简介保存成功', '提示', {
                  confirmButtonText: '确认',
                  type: 'success'
                })
              } else if (body.code === 400) {
                this.$message({
                  message: '保存失败，数据有误，请重新操作。',
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
    },
    getCompanyProfile() {
      http
        .get('/liteapp/GetCompanyProfile')
        .then(res => {
          const body = res.data
          if (body.code === 200) {
            this.form = body.data
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
