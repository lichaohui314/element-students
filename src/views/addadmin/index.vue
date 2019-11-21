<template>
  <div class="el_from_box_lch">
    <el-form
      :model="data"
      label-width="100px"
      class="el_form_label_lch"
    >
      <el-form-item
        label="等级"
        prop="level"
      >
        <el-select
          v-model="data.level"
          placeholder="等级"
        >
          <el-option
            label="管理员"
            value="3"
          />
          <el-option
            label="普通用户"
            value="1"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input
          v-model="data.username"
          placeholder="用户名"
        />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="data.password"
          type="password"
          placeholder="密码"
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="checkPass"
      >
        <el-input
          v-model="data.pass"
          type="password"
          placeholder="确认密码"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm"
        >提交</el-button>
        <el-button @click="resetForm">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addAdmin } from '@/api/api'
export default {
  data() {
    return {
      data: {
        pass: '',
        password: '',
        username: '',
        level: ''
      }
    }
  },
  methods: {
    submitForm() {
      const admin = {
        username: this.data.username,
        password: this.data.password,
        code: 20000,
        level: this.data.level,
        roles: [this.data.level]
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
    resetForm(formName) {
      // 清空表单
      for (const key in this.data) {
        this.data[key] = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el_div_tips_lch {
  text-align: center;
  margin-bottom: 20px;
}
.el_from_box_lch {
  width: 100%;
  height: 500px;
  margin-top: 20px;
}
.el_form_label_lch {
  width: 1000px;
  height: 550px;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 40px;
}
.el_from_item_lch {
  width: 80%;
}
</style>
