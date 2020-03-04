<template>
  <el-dialog :visible.sync="dialogVisible" title="添加客户编号" @closed="closeDialog">
    <el-form
      v-loading="loading"
      :model="clientNoForm"
      ref="clientNoForm"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="客户名称" prop="clientName">
        <el-input v-model="clientNoForm.clientName" placeholder="请输入客户名称"></el-input>
      </el-form-item>
      <el-form-item label="客户编号" prop="clientNo" :error="errMsg.ClientNo">
        <el-input v-model="clientNoForm.clientNo" placeholder="请输入客户编号"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          :rows="2"
          maxlength="100"
          v-model="clientNoForm.description"
          placeholder="描述"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button icon="el-icon-close" @click="dialogVisible = false" :disabled="loading">取消</el-button>
      <el-button type="primary" icon="el-icon-check" @click="submitSave" :disabled="loading">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import http from '@/utils/http'

export default {
  name: 'addClientNo',
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
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
      clientNoForm: {
        clientName: '',
        clientNo: 0,
        description: ''
      },
      errMsg: {
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
    submitSave() {
      this.$refs['clientNoForm'].validate(valid => {
        if (valid) {
          this.loading = true
          http
            .post('clientnumber/Create', this.clientNoForm)
            .then(res => {
              const body = res.data
              if (body.code === 201) {
                this.$emit('completed')
                this.dialogVisible = false
              } else if (body.code === 400) {
                body.data.foreach(item => {
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
