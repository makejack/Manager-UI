<template>
  <div v-loading="loading">
    <div class="toolbar">
      <el-button type="primary" icon="el-icon-refresh" @click="refreshTransfers">刷 新</el-button>
    </div>
    <el-table :data="transfersData" border class="w-100">
      <el-table-column label="用户名" prop="userName"></el-table-column>
      <el-table-column label="电话号码" prop="phoneNumber"></el-table-column>
      <el-table-column label="商户订单号" prop="partnerTradeNo"></el-table-column>
      <el-table-column label="支付状态" prop="status">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.status === 1" type="success">分账成功</el-tag>
            <el-tag v-else type="danger">分账失败</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="总金额" prop="totalAmount"></el-table-column>
      <el-table-column label="手续费" prop="serviceFee"></el-table-column>
      <el-table-column label="支付金额" prop="paymentAmount"></el-table-column>
      <el-table-column label="描述" prop="description"></el-table-column>
      <el-table-column label="支付时间" prop="paymentTime" :formatter="dateFormatter" width="160"></el-table-column>
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
import { formatDate } from '../utils/date'

export default {
  name: 'transfers',
  data() {
    return {
      loading: false,
      transfersData: [],
      totalRow: 0,
      pagination: {
        offset: 1,
        limit: 10
      }
    }
  },
  methods: {
    dateFormatter(row, column, cellValue) {
      return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss')
    },
    refreshTransfers() {
      this.getTransfers()
    },
    sizeChange(val) {
      this.pagination.limit = val
      this.getTransfers()
    },
    pageChange(val) {
      this.pagination.offset = val
      this.getTransfers()
    },
    getTransfers() {
      this.loading = true
      http
        .post('/transfers/GetAll', this.pagination)
        .then(res => {
          const body = res.data
          if (body.code === 200) {
            this.transfersData = body.data.data
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
    this.getTransfers()
  }
}
</script>
