<template>
  <el-dialog title="编辑客户编号" :visible.sync="dialogVisible" @closed="closeDialog" @open="openDialog">
    <el-form
      v-loading="loading"
      :model="clientNoForm"
      ref="clientNoForm"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="客户名称" prop="clientName" :error="errMsg.ClientName">
        <el-input v-model="clientNoForm.clientName" placeholder="请输入客户名称"></el-input>
      </el-form-item>
      <el-form-item label="客户编号" prop="clientNo" :error="errMsg.ClientNo">
        <el-input v-model="clientNoForm.clientNo" placeholder="请输入客户编号"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          :rows="2"
          v-model="clientNoForm.description"
          placeholder="描述"
          maxlength="100"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-check" @click="submitSave">确 认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import http from '@/utils/http'

export default {
  name: 'editClientNo',
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
    },
    id(val) {
      this.clientId = val
    },
    dialogVisible(val) {
      this.$emit('input', val)
    }
  },
  data() {
    var checkNo = (rule, value, callback) => {
      if (value) {
        if (!/^[0-9]{4}$/.test(value)) {
          callback(new Error('客户编号只能是数字长度4位'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      loading: false,
      dialogVisible: this.value,
      clientId: this.id,
      clientNoForm: {
        Id: 0,
        clientName: '',
        clientNo: 0,
        description: ''
      },
      errMsg: {
        ClientName: '',
        ClientNo: ''
      },
      rules: {
        clientName: [
          {
            required: true,
            message: '请输入客户名称',
            trigger: ['change', 'blur']
          }
        ],
        clientNo: [
          {
            required: true,
            message: '请输入客户编号',
            trigger: ['change', 'blur']
          },
          {
            validator: checkNo,
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  methods: {
    closeDialog() {
      this.$refs['clientNoForm'].resetFields()
    },
    openDialog() {
      this.loadClientNo(this.clientId)
    },
    loadClientNo(id) {
      this.loading = true
      http
        .get(`clientnumber/Get/${id}`)
        .then(res => {
          var body = res.data
          if (body.code === 200) {
            this.clientNoForm = body.data
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    submitSave() {
      this.$refs['clientNoForm'].validate(valid => {
        if (valid) {
          this.loading = true
          http
            .put('clientnumber/Update', this.clientNoForm)
            .then(res => {
              const body = res.data
              if (body.code === 204) {
                this.$emit('completed')
                this.dialogVisible = false
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
