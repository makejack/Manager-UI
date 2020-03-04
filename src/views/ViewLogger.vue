<template>
  <div class="view-logger">
    <el-form :model="loggerForm" label-width="120px">
      <el-form-item label="应用程序">
        <el-input readonly v-model="loggerForm.application"></el-input>
      </el-form-item>
      <el-form-item label="级别">
        <el-input readonly v-model="loggerForm.level"></el-input>
      </el-form-item>
      <el-form-item label="操作">
        <el-input readonly v-model="loggerForm.action"></el-input>
      </el-form-item>
      <el-form-item label="日志">
        <el-input readonly v-model="loggerForm.logger"></el-input>
      </el-form-item>
      <el-form-item label="callsite">
        <el-input readonly v-model="loggerForm.callsite"></el-input>
      </el-form-item>
      <el-form-item label="请求地址">
        <el-input readonly v-model="loggerForm.requestURL"></el-input>
      </el-form-item>
      <el-form-item label="IP 地址">
        <el-input readonly v-model="loggerForm.remoteAddress"></el-input>
      </el-form-item>
      <el-form-item label="记录时间">
        <el-input readonly v-model="loggerForm.operatingtime"></el-input>
      </el-form-item>
      <el-form-item label="信息">
        <el-input readonly v-model="loggerForm.message"></el-input>
      </el-form-item>
      <el-form-item label="异常">
        <el-input v-model="loggerForm.exception" readonly type="textarea" :rows="10"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import http from '@/utils/http'

export default {
  name: 'viewLogger',
  data() {
    return {
      loggerForm: {}
    }
  },
  methods: {
    getLoggerInfo(id) {
      http.get(`logger/get/${id}`).then(res => {
        const body = res.data
        if (body.code === 200) {
          this.loggerForm = body.data
        }
      })
    }
  },
  created() {
    const id = this.$route.query['id']
    this.getLoggerInfo(id)
  }
}
</script>
