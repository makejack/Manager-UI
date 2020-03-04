<template>
  <div class="home" v-loading="loading">
    <div class="page-title">客户列表</div>
    <el-table :data="userData" border>
      <el-table-column label="账号名称" prop="userName"></el-table-column>
      <el-table-column label="电话号码" prop="phoneNumber"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="注册时间" prop="createTime" :formatter="formattedDateTime"></el-table-column>
      <el-table-column label="最近登录时间" prop="loginTime" :formatter="formattedDateTime"></el-table-column>
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
  name: 'home',
  data() {
    return {
      loading: false,
      userData: [],
      totalRow: 0,
      pagination: {
        offset: 1,
        limit: 10
      }
    }
  },
  methods: {
    sizeChange(val) {
      this.pagination.limit = val
      this.loadUsers()
    },
    pageChange(val) {
      this.pagination.offset = val
      this.loadUsers()
    },
    formattedDateTime(row, column, cellValue) {
      return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss')
    },
    loadUsers() {
      this.loading = true
      http
        .post('user/GetUsers', this.pagination)
        .then(res => {
          const body = res.data
          if (body.code === 200) {
            this.userData = body.data.data
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
    this.loadUsers()
  }
}
</script>
