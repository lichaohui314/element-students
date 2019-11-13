<template>
  <div class="el_from_box_lch">
    <el-form
      class="el_form_label_lch"
      label-position="right"
      label-width="80px"
      size="medium"
    >
      <el-form-item
        class="el_from_item_lch"
        label="姓名: "
      >
        <el-input v-model="data.name" />
      </el-form-item>
      <el-form-item
        class="el_from_item_lch"
        label="性别: "
      >
        <el-input v-model="data.sex" />
      </el-form-item>
      <el-form-item
        class="el_from_item_lch"
        label="年龄: "
      >
        <el-input v-model="data.age" />
      </el-form-item>
      <el-form-item
        class="el_from_item_lch"
        label="班级: "
      >
        <el-input v-model="data.class" />
      </el-form-item>
      <el-form-item
        class="el_from_item_lch"
        label="专业: "
      >
        <el-input v-model="data.major" />
      </el-form-item>
      <el-form-item
        class="el_from_item_lch"
        label="已有成绩: "
      >
        <el-input v-model="data.result" />
      </el-form-item>
      <el-form-item
        class="el_from_item_lch"
        label="挂科次数: "
      >
        <el-input v-model="data.fail" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="modifystu"
        >提交</el-button>
        <el-button
          type="warning"
          @click="clear"
        >取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { queryStudent, modifyStudent } from '@/api/api'
export default {
  data() {
    return {
      data: {
        name: '', // 姓名
        sex: '', // 性别单选框
        age: '', // 年龄
        class: '', // 班级选项
        major: '', // 专业选项
        result: '', // 已有成绩
        fail: '' // 挂科次数
      }
    }
  },
  mounted() {
    // 生命周期里接收参数
    // console.log(this.$route.query);
    queryStudent(this.$route.query.id).then(data => {
      this.data = data.data
    })
  },
  methods: {
    clear() {
      this.$router.push({
        path: '/student/stuList' // 跳转的路径
      })
    },
    modifystu() {
      const id = this.data._id // 学生id
      const val = {
        name: this.data.name, // 姓名
        sex: this.data.sex, // 性别
        age: this.data.age, // 年龄
        class: this.data.class, // 班级
        major: this.data.major, // 专业
        result: this.data.result, // 成绩
        fail: this.data.fail // 挂科次数
      }
      modifyStudent(id, val).then(doc => {
        if (doc.data === 'ok') {
          const r = confirm('修改成功,是否返回列表页')
          if (r === true) {
            this.$router.push({
              path: '/student/stuList' // 跳转的路径
            })
          } else {
            return false
          }
        } else {
          alert(doc.data)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
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
