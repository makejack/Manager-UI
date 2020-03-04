<template>
  <div v-loading="loading" class="logger">
    <div class="toolbar">
      <el-button type="primary" icon="el-icon-refresh" @click="refreshLogger">刷 新</el-button>
    </div>
    <el-table :data="loggerData" border class="w-100">
      <el-table-column label="应用程序" prop="application"></el-table-column>
      <el-table-column label="级别" prop="level" width="60"></el-table-column>
      <el-table-column label="请求地址" prop="requestURL"></el-table-column>
      <el-table-column label="信息" prop="message">
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'view-logger', query: { id: scope.row.id }}"
          >{{scope.row.message}}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="时间" prop="operatingtime" :formatter="dateFormatter" width="160"></el-table-column>
    </el-table>
    <el-pagination
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
  name: 'logger',
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
    sizeChange(val) {
      this.pagination.limit = val
      this.loadLogger()
    },
    pageChange(val) {
      this.pagination.offset = val
      this.loadLogger()
    },
    dateFormatter(row, column, cellValue) {
      return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss')
    },
    refreshLogger() {
      this.pagination.offset = 1
      this.loadLogger()
    },
    loadLogger() {
      this.loading = true
      http
        .post('logger/GetAll', this.pagination)
        .then(res => {
          const body = res.data
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
    this.loadLogger()
  }
}
</script>
