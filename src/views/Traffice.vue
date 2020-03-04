<template>
  <div class="traffice" v-loading="loading">
    <div class="toolbar">
      <el-button type="primary" icon="el-icon-refresh" @click="loadTraffice">刷 新</el-button>
    </div>
    <el-table :data="trafficeData" border>
      <el-table-column label="管理员名称" prop="userName"></el-table-column>
      <el-table-column label="场地" prop="companyName"></el-table-column>
      <el-table-column label="芯片编码" prop="hardwareCode"></el-table-column>
      <el-table-column label="接收流量" prop="receivedTraffice" :formatter="trafficeFormatter"></el-table-column>
      <el-table-column label="发送流量" prop="sendTraffice" :formatter="trafficeFormatter"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="closeModule(scope.row)">关闭</el-button>
        </template>
      </el-table-column>
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

export default {
  name: 'traffice',
  data() {
    return {
      loading: false,
      totalRow: 0,
      trafficeData: [],
      pagination: {
        offset: 1,
        limit: 10
      }
    }
  },
  methods: {
    closeModule(row) {
      this.$confirm('确认是否关闭无线模块', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const fullScrollLoading = this.$loading({
            lock: true
          })
          // 关闭模块
          http
            .get(`wireless/CloseModule/${row.hardwareCode}`)
            .then(res => {
              fullScrollLoading.close()
              const body = res.data
              if (body.code === 200) {
                this.$message({
                  message: '目标已断开',
                  type: 'success'
                })
              } else if (body.code === 404) {
                this.$message({
                  message: '目标已断开',
                  type: 'warning'
                })
              }
            })
            .catch(() => {
              fullScrollLoading.close()
              this.$message({
                message: '操作失败，请重新尝试。',
                type: 'danger'
              })
            })
        })
        .catch(() => {})
    },
    sizeChange(val) {
      this.pagination.limit = val
      this.loadTraffice()
    },
    pageChange(val) {
      this.pagination.offset = val
      this.loadTraffice()
    },
    trafficeFormatter(row, column, cellValue) {
      if (cellValue / (1024 * 1024 * 1024) > 10) {
        return (cellValue / (1024 * 1024 * 1024)).toFixed(2) + ' G'
      } else if (cellValue / (1024 * 1024) > 10) {
        return (cellValue / (1024 * 1024)).toFixed(2) + ' M'
      } else if (cellValue / 1024 > 10) {
        return (cellValue / 1024).toFixed(2) + ' KB'
      } else {
        return cellValue + ' B'
      }
    },
    loadTraffice() {
      this.loading = true
      http
        .post('wireless/Get', this.pagination)
        .then(res => {
          const body = res.data
          if (body.code === 200) {
            this.totalRow = body.data.totalRow
            this.trafficeData = body.data.data
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  created() {
    this.loadTraffice()
  }
}
</script>
