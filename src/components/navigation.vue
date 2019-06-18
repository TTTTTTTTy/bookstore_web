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
      <el-menu-item index="/purchase/list">书籍求购</el-menu-item>
      <el-menu-item index="/sell/new">发布书籍</el-menu-item>
      <el-menu-item index="/order/buy">订单管理</el-menu-item>
    </el-menu>
    <el-dropdown @command="handleCommand">
      <el-button icon="el-icon-user-solid" circle></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">个人资料</el-dropdown-item>
        <el-dropdown-item command="home">消息中心</el-dropdown-item>
        <el-dropdown-item command="logout">注销</el-dropdown-item>
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
      },
      handleCommand(command) {
        if(command == 'logout') {
          this.$confirm('注销登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.getRequest("/logout");
            this.$store.commit('logout');
            this.$router.replace({path: '/'});
          }).catch(() => {
              this.$message({
              type: 'info',
              message: '取消'
            });
          });
        }
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
