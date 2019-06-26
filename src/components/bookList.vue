<template>
  <el-aside width="16%" style="height: 100%">
    <el-menu :default-active="activeIndex" class="el-menu-demo"  @select="handleSelect">
      <el-menu-item index="10">工业技术</el-menu-item>
      <el-menu-item index="0">教育</el-menu-item>
      <el-menu-item index="1">文学</el-menu-item>
      <el-menu-item index="2">流行</el-menu-item>
      <el-menu-item index="3">哲学</el-menu-item>
      <el-menu-item index="4">医药</el-menu-item>
      <el-menu-item index="5">军事</el-menu-item>
      <el-menu-item index="6">经济</el-menu-item>
      <el-menu-item index="7">语言</el-menu-item>
      <el-menu-item index="8">艺术</el-menu-item>
      <el-menu-item index="9">自然科学</el-menu-item>
      <el-menu-item index="11">政治、法律</el-menu-item>
      <el-menu-item index="12">历史、地理</el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    name: "bookList",

    data() {
      return {
        activeIndex: '10',
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        this.$emit("getIndex", key);
      },
    }
  }
</script>

<style lang="less" scoped>

</style>
