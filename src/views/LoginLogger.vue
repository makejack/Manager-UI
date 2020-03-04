<template>
  <div>
    <el-table v-loading="loading" :data="loggerData" border>
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="userName"></el-table-column>
      <el-table-column label="登录时间" prop="loginTime" :formatter="formatterTime"></el-table-column>
      <el-table-column label="IP地址" prop="loginIp"></el-table-column>
    </el-table>
    <el-pagination
      :disabled="loading"
      :total="totalRow"
      background
      layout="sizes, prev, pager, next"
      @size-change="sizeChange"
      @current-change="pageChange"
    ></el-pagination>
  </div>
</template>

<script>
import http from '@/utils/http'
import { formatDate } from '@/utils/date'

export default {
  name: 'loginLogger',
  data() {
    return {
      loading: false,
      totalRow: 0,
      loggerData: [],
      pagination: {
        offset: 1,
        limit: 10
      }
    }
  },
  methods: {
    formatterTime(row, column, cellValue) {
      return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss')
    },
    sizeChange(val) {
      this.pagination.limit = val
      this.LoadLogger()
    },
    pageChange(val) {
      this.pagination.offset = val
      this.LoadLogger()
    },
    LoadLogger() {
      this.loading = true
      http
        .post('loginLogger/GetLoginLoggers', this.pagination)
        .then(res => {
          var body = res.data
          if (body.code === 200) {
            this.loggerData = body.data.data
            this.totalRow = body.data.totalRow
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  created() {
    this.LoadLogger()
  }
}
</script>
