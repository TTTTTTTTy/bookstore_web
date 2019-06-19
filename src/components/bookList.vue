<template>
  <el-aside width="260px" style="height: 100%">
    <el-menu default-active="1" class="el-menu-vertical-demo" unique-opened="true" >
      <el-menu-item index="1">教育</el-menu-item>
      <el-menu-item index="2">文学</el-menu-item>
      <el-menu-item index="3">流行</el-menu-item>
      <el-menu-item index="4">哲学</el-menu-item>
      <el-menu-item index="5">医药</el-menu-item>
      <el-menu-item index="6">军事</el-menu-item>
      <el-menu-item index="7">经济</el-menu-item>
      <el-menu-item index="8">语言</el-menu-item>
      <el-menu-item index="9">艺术</el-menu-item>
      <el-menu-item index="10">自然科学</el-menu-item>
      <el-menu-item index="11">工业技术</el-menu-item>
      <el-menu-item index="12">政治、法律</el-menu-item>
      <el-menu-item index="13">历史、地理</el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    name: "bookList"
  }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo{
    width: 250px;
    min-height: 100%;
    max-height: 100%;
    padding-left: 0;
  }
</style>
