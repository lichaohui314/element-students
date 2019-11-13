<template>
  <div class="el_from_box_lch">
    <el-form class="el_form_label_lch"
             label-position="right"
             label-width="80px"
             size="medium">
      <el-form-item class="el_from_item_lch"
                    label="班级名称: ">
        <el-input v-model="data.className" />
      </el-form-item>
      <el-form-item class="el_from_item_lch"
                    label="创建时间: ">
        <el-input v-model="data.classDate" />
      </el-form-item>
      <el-form-item class="el_from_item_lch"
                    label="讲师: ">
        <el-input v-model="data.classTeacher" />
      </el-form-item>
      <el-form-item class="el_from_item_lch"
                    label="班主任: ">
        <el-input v-model="data.classMaster" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="modifyclass">提交</el-button>
        <el-button type="warning"
                   @click="clear">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { queryClass } from "@/api/api";
export default {
  data() {
    return {
      data: {
        className: "",
        classDate: "",
        classTeacher: "",
        classMaster: ""
      }
    };
  },
  mounted() {
    // 生命周期里接收参数
    // console.log(this.$route.query);
    queryClass(this.$route.query.id).then(data => {
      this.data = data.data;
    });
  },
  methods: {
    clear() {
      this.$router.push({
        path: "/class/allclass" // 跳转的路径
      });
    },
    modifyclass() {
      // const id = this.data._id // 学生id
      // const val = {
      //   className: this.data.className,
      //   classDate: this.data.classDate,
      //   classTeacher: this.data.classTeacher,
      //   classMaster: this.data.classMaster
      // }
    }
  }
};
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
