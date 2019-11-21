<template>
  <div>
    <Canvas />
    <div class="el_from_box_lchh">
      <el-form
        :model="data"
        label-width="100px"
        class="el_form_label_lchh"
      >
        <h2 style="text-align:center;color:rgb(138,43,226)">注册</h2>
        <el-form-item
          label="用户名"
          prop="username"
          style="color:rgb(138,43,226)"
        >
          <el-input
            v-model="data.username"
            class="el_form_input_lchh"
            on-keypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            placeholder="用户名"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          style="color:rgb(138,43,226)"
        >
          <el-input
            v-model="data.password"
            type="password"
            class="el_form_input_lchh"
            on-keypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="checkPass"
          style="color:rgb(138,43,226)"
        >
          <el-input
            v-model="data.pass"
            type="password"
            class="el_form_input_lchh"
            on-keypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            placeholder="确认密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm"
          >提交</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addAdmin } from '@/api/api'
import Canvas from '@/views/canvas'
export default {
  components: {
    Canvas
  },
  data() {
    return {
      data: {
        pass: '',
        password: '',
        username: ''
      }
    }
  },
  methods: {
    // 提交,添加
    submitForm() {
      const admin = {
        username: this.data.username,
        password: this.data.password,
        code: 20000,
        level: '1',
        roles: ['1']
      }
      if (this.data.username.length < 6) {
        this.$message({
          message: '用户名不能为空或少于6位',
          type: 'error'
        })
      } else if (this.data.password.length < 6) {
        this.$message({
          message: '密码不能为空或少于6位',
          type: 'error'
        })
      } else if (this.data.password !== this.data.pass) {
        this.$message({
          message: '两次输入的密码不一致',
          type: 'error'
        })
      } else {
        addAdmin(admin).then(data => {
          alert(data.data)
          if (data.data === '添加成功') {
            for (const key in this.data) {
              this.data[key] = ''
            }
          }
        })
      }
    },
    // 取消清空表单,并返回登录页
    resetForm(formName) {
      for (const key in this.data) {
        this.data[key] = ''
      }
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
<style lang="scss">
.el_form_label_lchh {
  .el-form-item__label {
    color: rgb(138, 43, 226);
  }
}
.el_form_input_lchh {
  input {
    background: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>

<style lang="scss" scoped>
.el_from_box_lchh {
  width: 100%;
  color: white;
}
.el_form_label_lchh {
  width: 500px;
  height: 380px;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.5);
  padding: 30px 50px 30px 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
