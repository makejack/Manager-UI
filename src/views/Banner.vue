<template>
  <div>
    <div class="page-title">微信小程序首页横幅上传</div>
    <el-upload
      drag
      action="/api/liteapp/uploadbanner"
      list-type="picture"
      :limit="1"
      accept="image/png, image/jpeg"
      :before-upload="handlerBeforeUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此外，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">横幅大小为(750 x 320)只能上传jpg/png文件，且不超过 2M (只能上传1张图片)</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'liteApp',
  methods: {
    handlerBeforeUpload(file) {
      const length = file.size / 1024 / 1024 < 2
      if (!length) {
        this.$message.error('上专图片大小不能超过 2MB')
      }
      return length
    }
  }
}
</script>
