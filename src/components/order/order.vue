<template>
  <el-container class="page" direction="vertical">
    <navigation></navigation>
    <el-container class="main_container">
      <el-aside width="300px" style="padding-left: 50px; padding-top: 20px">
        <el-menu :default-active="this.$route.path" style="padding-top: 150px" router>
          <el-menu-item index="/order/buy">
            <i class="el-icon-document"></i>
            <span slot="title">我购买的</span>
          </el-menu-item>
          <el-menu-item index="/order/sell">
            <i class="el-icon-setting"></i>
            <span slot="title">我卖出的</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
  import navigation from "@/components/navigation";

  export default {
    name: 'order',
    data() {
      return {
      }
    },
    methods: {
      handleEdit(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components: {
      navigation
    }
  }
</script>

<style lang="less" scoped>
  @import '../../style/mixin';
  .text{
    font-size: 24px;
    margin-bottom: 18px;
    float: left;
  }

</style>
