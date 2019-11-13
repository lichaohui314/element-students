<template>
  <div>
    <div>
      <el-table class="table"
                :data="tableData"
                height="500">
        <el-table-column prop="className"
                         label="班级名称" />
        <el-table-column prop="classDate"
                         label="创建时间" />
        <el-table-column prop="classTeacher"
                         label="讲师" />
        <el-table-column prop="classMaster"
                         label="班主任" />
        <el-table-column v-if="level>=5"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="small"
                       @click="modifyclass(scope.$index)">修改</el-button>
            <el-button type="danger"
                       size="small"
                       @click="deleteclass(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { allClass, delClass } from "@/api/api";
export default {
  data() {
    return {
      tableData: []
    };
  },
  computed: {
    ...mapGetters(["level"])
  },
  mounted() {
    allClass().then(data => {
      this.tableData = data.data;
    });
  },
  methods: {
    modifyclass(index) {
      const id = this.tableData[index]._id;
      this.$router.push({
        path: "/modifyclass", // 跳转的路径
        query: {
          // 路由传参时push和query搭配使用 ，作用时传递参数
          id
        }
      });
    },
    deleteclass(index) {
      const r = confirm("确认删除吗?");
      if (r === true) {
        const id = this.tableData[index]._id;
        this.tableData.splice(index, 1);
        delClass(id).then(data => {
          alert(data.data);
        });
      } else {
        return false;
      }
    }
  }
};
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
