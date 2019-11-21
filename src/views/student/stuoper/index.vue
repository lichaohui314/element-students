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
        label="入学时间: "
      >
        <el-date-picker
          v-model="data.date"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>

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
        <!-- <el-input v-model="data.sex" /> -->
        <el-radio
          v-model="data.sex"
          label="男"
        >男</el-radio>
        <el-radio
          v-model="data.sex"
          label="女"
        >女</el-radio>
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
        <el-input v-model="data.newclass" />
      </el-form-item>
      <el-form-item
        class="el_from_item_lch"
        label="专业: "
      >
        <el-select
          v-model="data.major"
          placeholder="请选择专业"
        >
          <el-option
            label="web架构"
            value="web架构"
          />
          <el-option
            label="ui视觉设计"
            value="ui视觉设计"
          />
        </el-select>
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
          @click="addstu"
        >提交</el-button>
        <el-button
          type="warning"
          @click="clear"
        >清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addStuend } from '@/api/api'
export default {
  data() {
    return {
      data: {
        date: '',
        name: '', // 姓名
        sex: '', // 性别单选框
        age: '', // 年龄
        newclass: '', // 班级选项
        major: '', // 专业选项
        result: '', // 已有成绩
        fail: '' // 挂科次数
      }
    }
  },
  methods: {
    addstu() {
      // 创建一个存储对象
      const val = {
        date: this.data.date,
        name: this.data.name, // 姓名
        sex: this.data.sex, // 性别单选框
        age: this.data.age, // 年龄
        class: this.data.newclass, // 班级选项
        major: this.data.major, // 专业选项
        result: this.data.result, // 已有成绩
        fail: this.data.fail // 挂科次数
      }
      if (
        this.data.result === '' ||
        this.data.sex === '' ||
        this.data.age === '' ||
        this.data.class === '' ||
        this.data.major === '' ||
        this.data.result === '' ||
        this.data.fail === ''
      ) {
        this.$message({
          showClose: true,
          message: '请检查你的输入框,不能为空哦',
          type: 'warning'
        })
        return false
      } else if (/\D+/g.test(this.data.age)) {
        // 判断年龄是不是数字的正则
        this.$message({
          showClose: true,
          message: '年龄只能是数字哦',
          type: 'warning'
        })
        return false
      } else if (/.*[\u4e00-\u9fa5]+.*$/.test(this.data.result)) {
        // 判断不带汉字的正则
        this.$message({
          showClose: true,
          message: '成绩不能有汉字',
          type: 'warning'
        })
        return false
      } else if (/.*[\u4e00-\u9fa5]+.*$/.test(this.data.fail)) {
        // 判断不带汉字的正则
        this.$message({
          showClose: true,
          message: '挂科次数不能有汉字',
          type: 'warning'
        })
        return false
      }
      // 添加学生按钮
      addStuend(val).then(data => {
        this.$message({
          showClose: true,
          message: data.data,
          type: 'success'
        })
        // 清空表单
        for (const key in this.data) {
          this.data[key] = ''
        }
      })
    },
    // 清空表单
    clear() {
      for (const key in this.data) {
        this.data[key] = ''
      }
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
