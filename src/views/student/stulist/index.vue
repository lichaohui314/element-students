<template>
  <div>
    <!-- 查询表单 -->
    <div class="table">
      <el-form>
        <el-date-picker
          v-model="form.date"
          style="width:150px"
          type="date"
          placeholder="入学时间"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
        <el-input
          v-model="form.name"
          class="input_name"
          placeholder="名字"
        />
        <el-select
          v-model="form.sex"
          class="input_name"
          placeholder="性别"
        >
          <el-option
            label="男"
            value="男"
          />
          <el-option
            label="女"
            value="女"
          />
        </el-select>
        <el-input
          v-model="form.age"
          class="input_name"
          placeholder="年龄"
        />
        <el-input
          v-model="form.class"
          class="input_name"
          placeholder="班级"
        />
        <el-select
          v-model="form.major"
          class="input_name"
          placeholder="专业"
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
        <el-input
          v-model="form.result"
          class="input_name"
          placeholder="成绩/门"
        />
        <el-input
          v-model="form.fail"
          class="input_name"
          placeholder="挂科数/次"
        />
        <el-button
          type="primary"
          @click="queryStu"
        >查询</el-button>
        <el-button
          v-show="!queryShow"
          @click="clearStu"
        >清空</el-button>
        <el-button
          v-show="queryShow"
          @click="cancelStu"
        >取消查询</el-button>
      </el-form>
    </div>
    <!-- 渲染数据 -->
    <div>
      <el-table
        v-loading="loading"
        class="table"
        :data="tableData"
        border
        height="500"
      >
        <el-table-column
          v-if="false"
          type="selection"
        />
        <el-table-column
          prop="date"
          label="入学时间"
        />
        <el-table-column
          prop="name"
          label="姓名"
        />
        <el-table-column
          prop="sex"
          label="性别"
        />
        <el-table-column
          prop="age"
          label="年龄"
        />
        <el-table-column
          prop="class"
          label="班级"
        />
        <el-table-column
          prop="major"
          label="专业"
        />
        <el-table-column
          sortable
          prop="result"
          label="成绩/门"
        />
        <el-table-column
          sortable
          prop="fail"
          label="挂科数/次"
        />
        <template v-if="level>=3">
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="modifystu(scope.$index)"
              >修改</el-button>
            </template>
          </el-table-column>
          <el-table-column label="删除">
            <template slot-scope="scope">
              <el-button
                type="danger"
                @click="deletestu(scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getAll, delStudent, queryStudent } from '@/api/api'
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      form: {
        date: '',
        name: '',
        sex: '',
        age: '',
        class: '',
        major: '',
        result: '',
        fail: ''
      },
      queryShow: false
    }
  },
  computed: {
    ...mapGetters(['level'])
  },
  mounted() {
    // 页面加载时获取学生列表
    this.loading = true
    getAll().then(data => {
      this.loading = false
      this.tableData = data.data
    })
  },
  methods: {
    // 删除学生
    deletestu(index) {
      const r = confirm('确认删除吗?')
      if (r === true) {
        this.loading = true
        const id = this.tableData[index]._id
        this.tableData.splice(index, 1)
        delStudent(id).then(data => {
          this.loading = false
          this.$message({
            showClose: true,
            message: data.data,
            type: 'warning'
          })
        })
      } else {
        return false
      }
    },
    // 修改学生
    modifystu(index) {
      const id = this.tableData[index]._id
      this.$router.push({
        path: '/stumodify', // 跳转的路径
        query: {
          // 路由传参时push和query搭配使用 ，作用时传递参数
          id
        }
      })
    },
    // 查询学生
    queryStu() {
      const formdata = {}
      for (const key in this.form) {
        if (this.form[key] !== '') {
          formdata[key] = this.form[key]
        }
      }
      this.loading = true
      if (
        this.form.date !== '' ||
        this.form.name !== '' ||
        this.form.sex !== '' ||
        this.form.age !== '' ||
        this.form.class !== '' ||
        this.form.major !== '' ||
        this.form.result !== '' ||
        this.form.fail !== ''
      ) {
        queryStudent(formdata).then(data => {
          this.loading = false
          if (data.data.length === 0) {
            this.$message('没有查询到符合条件的数据')
          } else {
            this.$message({
              message: '查询成功',
              type: 'success'
            })
            this.tableData = data.data
            this.queryShow = true
          }
        })
      } else {
        this.$message({
          message: '请写入查询条件',
          type: 'warning'
        })
      }
    },
    // 清空查询表单
    clearStu() {
      for (const key in this.form) {
        this.form[key] = ''
      }
    },
    // 取消查询
    cancelStu() {
      this.loading = true
      getAll().then(data => {
        this.loading = false
        this.tableData = data.data
        this.queryShow = false
        for (const key in this.form) {
          this.form[key] = ''
        }
      })
    }
  }
}
</script>
<style scoped>
.table {
  width: 100%;
  margin-top: 10px;
  margin-left: 10px;
}
.input_name {
  width: 100px;
}
</style>
