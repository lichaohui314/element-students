<template>
  <div class="personalCenter">
    <div class="personalCenter-left">
      <!-- 用户头像 -->
      <div class="demo-type">
        <img :src="avatar" class="avatar">
        <el-upload
          action="http://132.232.89.22:8080/uploadAvatar"
          class="avatar-uploader"
          :data="{ id }"
          :show-file-list="false"
          name="files"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <div class="modify">
            修改头像
          </div>
        </el-upload>
      </div>
      <!-- 用户名 -->
      <div class="personalCenter-name">{{ name }}</div>
      <!-- 修改密码 -->
      <div class="modify-password">
        <el-button type="text" @click="dialogFormVisible = true">修改密码</el-button>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="原始密码" prop="age">
              <el-input v-model="ruleForm.age" type="password" />
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input
                v-model="ruleForm.pass"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                v-model="ruleForm.checkPass"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
              <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              <el-button
                @click="
                  dialogFormVisible = false;
                  resetForm('ruleForm');
                "
              >取 消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
    <!-- 占位 -->
    <div class="exhibition">
      <img :src="avatar" class="avatar">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateAdminPass } from '@/api/api'
export default {
  data() {
    //  原始密码
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('原始密码不能为空'))
      } else {
        callback()
      }
    }
    // 新密码
    var validatePass = (rule, value, callback) => {
      var regularpassword = /(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,16}$/
      if (value === this.ruleForm.age) {
        callback(new Error('新密码不能与原密码相同!'))
      } else if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!regularpassword.test(value)) {
        callback(new Error('格式为：数字+英文且不能小于8位不能大于16位'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    // 确认密码
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        // 修改密码
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        // 修改密码
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        age: [{ validator: checkAge, trigger: 'blur' }]
      },
      dialogFormVisible: false, // 点击确定退出
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'name', // 从vuex中拿用户名字
      'avatar', // 从vuex中拿用户头像
      'id'
    ])
  },
  methods: {
    errorHandler() {
      return true
    },
    //   点击确定修改密码
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { data } = await updateAdminPass({
            _id: this.id,
            oldpassword: this.ruleForm.age,
            newpassword: this.ruleForm.pass
          })
          if (data.code === 201) {
            this.$message.error(data.msg)
          } else {
            this.$message({
              message: data.msg + ',3秒后跳转到登录页！',
              type: 'success'
            })
            this.dialogFormVisible = false // 确定退出弹框
            this.resetForm(formName) // 调用重设方法
            setTimeout(() => {
              this.logout() // 调用跳转到登陆页的方法
            }, 3000)
          }
        } else {
          return false
        }
      })
    },
    // 重设方法
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 退出返回到登录页方法
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
      this.$store.dispatch('user/getInfo')
    },
    beforeAvatarUpload(file) {
      const isJPG = /^image\/(jpeg|png|jpg|gif)$/.test(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpg/gif/png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
.personalCenter {
  height: 560px;
  // background-color: red;
  margin: 20px;
  .personalCenter-left {
    width: 30%;
    height: 100%;
    float: left;
    .demo-type {
      width: 120px;
      height: 120px;
      margin: 10px 0;
      position: relative;
      border-radius: 50%;
      overflow: hidden;
      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .avatar-uploader {
        display: none;
        width: 100%;
        height: 27px;
        position: absolute;
        top: 94px;
        background: #304156;
        z-index: 100;
        opacity: 0.8;
        .modify {
          width: 100%;
          margin-left: 20px;
          color: rgb(191, 203, 217);
        }
      }
    }
    .demo-type:hover .avatar-uploader {
      display: block;
    }
    .personalCenter-name {
      margin: 20px 0;
      width: 120px;
      height: 20px;
      text-align: center;
    }
    .modify-password {
      // margin: 10px;
      width: 120px;
      text-align: center;
    }
  }
  .exhibition {
    width: 60%;
    height: 99%;
    float: left;
    margin: 3px 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
