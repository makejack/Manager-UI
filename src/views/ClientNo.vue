<template>
  <div class="client-number" v-loading="loading">
    <div class="toolbar">
      <el-button type="primary" icon="el-icon-refresh" @click="loadClient">刷 新</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="addDialogVisible = true">添加</el-button>
    </div>
    <el-table :data="clientData" border>
      <el-table-column label="客户名称" prop="clientName"></el-table-column>
      <el-table-column label="客户编号" prop="clientNo"></el-table-column>
      <el-table-column label="描述" prop="description"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" @click="editClient(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="download(scope.row)">下载</el-button>
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

    <add-client-no v-model="addDialogVisible" @completed="loadClient"></add-client-no>
    <edit-client-no v-model="editDialogVisible" :id="clientId" @completed="loadClient"></edit-client-no>
  </div>
</template>

<script>
import http from '@/utils/http'
import AddClientNo from '@/components/AddClientNo'
import EditClientNo from '@/components/EditClientNo'

export default {
  name: 'clientNumber',
  components: {
    AddClientNo,
    EditClientNo
  },
  data() {
    return {
      loading: false,
      addDialogVisible: false,
      editDialogVisible: false,
      clientId: 0,
      totalRow: 0,
      clientData: [],
      pagination: {
        offset: 1,
        limit: 10
      }
    }
  },
  methods: {
    sizeChange(val) {
      this.pagination.limit = val
      this.loalClient()
    },
    pageChange(val) {
      this.pagination.offset = val
      this.loalClient()
    },
    editClient(row) {
      this.clientId = row.id
      this.editDialogVisible = true
    },
    download(row) {
      http.get(`clientnumber/Download/${row.id}`).then(res => {
        this.downloadFile(row.clientName, res.data)
      })
    },
    downloadFile(name, data) {
      // 文件导出
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', `${name}.cfg`)

      document.body.appendChild(link)
      link.click()
    },
    loadClient() {
      this.loading = true
      http
        .post('clientnumber/GetAll', this.pagination)
        .then(res => {
          const body = res.data
          if (body.code === 200) {
            this.clientData = body.data.data
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
    this.loadClient()
  }
}
</script>
