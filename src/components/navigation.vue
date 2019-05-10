<template>
  <el-header class="header_container">
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#214457"
      text-color="#fff"
      active-text-color="#ffd04b" router>
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/register">书籍求购</el-menu-item>
      <el-menu-item index="/register">发布书籍</el-menu-item>
      <el-submenu index="4">
        <template slot="title">订单管理</template>
        <el-menu-item index="2-1">我购买的</el-menu-item>
        <el-menu-item index="2-2">我卖出的</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-dropdown>
      <el-button icon="el-icon-user-solid" circle></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">个人资料</el-dropdown-item>
        <el-dropdown-item command="home">消息中心</el-dropdown-item>
        <el-dropdown-item command="signout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
  export default {
    name: 'navigation',
    data() {
      return {
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="less" scoped>
  .header_container{
    background-color: #214457;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    padding-right: 15px;
  }
</style>
