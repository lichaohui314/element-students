<template>
  <div>
    <div class="user_message">
      <img
        :src="avatar"
        class="user_img_small"
      >
      <p>{{ name }}</p>
      <el-button
        type="text"
        @click="dialogFormVisible = true"
      >修改密码</el-button>
    </div>
    <img
      :src="avatar"
      class="user_img"
    >
    <el-dialog
      title="修改地址"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="password">
        <el-form-item
          label="原密码: "
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="formLabelAlign.password"
            class="el_input_lch"
            show-password
          />
        </el-form-item>
        <el-form-item
          label="新密码: "
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="formLabelAlign.newPassword"
            class="el_input_lch"
            show-password
          />
        </el-form-item>
        <el-form-item
          label="确认密码: "
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="formLabelAlign.confirmPwd"
            class="el_input_lch"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <div class="operate_lch">
            <el-button @click="cancelPwd">取 消</el-button>
            <el-button
              type="primary"
              @click="modifyPwd(`${username}`)"
            >确 定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { modifyAdmin } from '@/api/api.js'
export default {
  data() {
    return {
      formLabelAlign: {
        password: '',
        newPassword: '',
        confirmPwd: '',
        username: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'username'])
  },
  methods: {
    modifyPwd(username) {
      const PWD = this.formLabelAlign
      PWD.username = username
      // 验证表单
      if (
        PWD.password === '' ||
        PWD.newPassword === '' ||
        PWD.confirmPwd === ''
      ) {
        this.$message({
          showClose: true,
          message: '请把表单填写完整',
          type: 'warning'
        })
      } else if (
        PWD.password.length < 6 ||
        PWD.newPassword.length < 6 ||
        PWD.confirmPwd.length < 6
      ) {
        this.$message({
          showClose: true,
          message: '密码的位数不能小于6位',
          type: 'warning'
        })
      } else if (PWD.password === PWD.newPassword) {
        this.$message({
          showClose: true,
          message: '原密码不能与新密码相同',
          type: 'warning'
        })
      } else if (PWD.newPassword !== PWD.confirmPwd) {
        this.$message({
          showClose: true,
          message: '两次密码不一致',
          type: 'warning'
        })
      } else {
        modifyAdmin(PWD).then(data => {
          if (data.data.code === 200) {
            this.$alert('密码修改成功,请重新登录', '修改密码', {
              confirmButtonText: '确定',
              callback: async() => {
                await this.$store.dispatch('user/logout')
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
              }
            })
          } else {
            this.$message({
              showClose: true,
              message: data.data,
              type: 'error'
            })
          }
        })
      }
    },
    // 点击取消,清空表单
    cancelPwd() {
      this.dialogFormVisible = false
      for (const key in this.formLabelAlign) {
        this.formLabelAlign[key] = ''
      }
    }
  }
}
</script>

<style scoped>
.user_img {
  position: absolute;
  top: 50%;
  right: 15%;
  transform: translate(0, -50%);
}
.user_img_small {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.user_message {
  text-align: center;
  width: 100px;
  margin: 20px;
}
.user_Mask {
  width: 10000px;
  height: 10000px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2012;
  position: fixed;
  top: 0px;
}
.el_input_lch {
  width: 65%;
}
.operate_lch {
  display: flex;
  justify-content: center;
}
</style>
