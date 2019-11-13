<template>
  <div>
    <el-button
      type="danger"
      @click="deletestu"
    >删除</el-button>
    {{ name }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      form: {
        id: 1
      }
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    deletestu() {
      this.$store.dispatch('login/aaa', this.form)
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

