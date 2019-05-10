<template>
  <el-menu default-active="1-1" class="el-menu-vertical-demo" unique-opened="true">
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>教育学习</template>
      <el-menu-item-group>
        <template slot="title">本科学习</template>
        <el-menu-item index="1-1">高校教材</el-menu-item>
        <el-menu-item index="1-2">课外资料</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="外语资料">
        <el-menu-item index="1-3">英语四六级</el-menu-item>
        <el-menu-item index="1-4">托福雅思</el-menu-item>
        <el-menu-item index="1-5">其他外语</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-message"></i>专业书籍</template>
      <el-menu-item index="2-1">计算机类</el-menu-item>
      <el-menu-item index="2-2">金融类</el-menu-item>
      <el-menu-item index="2-3">建筑类</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-message"></i>小说读物</template>
      <el-menu-item-group>
        <template slot="title">经典名著</template>
        <el-menu-item index="3-1">国外经典</el-menu-item>
        <el-menu-item index="3-2">中国名著</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template slot="title">休闲娱乐</template>
        <el-menu-item index="3-3">网络流行</el-menu-item>
        <el-menu-item index="3-4">杂志月刊</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
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
