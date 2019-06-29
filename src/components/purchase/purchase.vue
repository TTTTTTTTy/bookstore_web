<template>
  <el-container class="page" direction="vertical">
    <navigation></navigation>
    <el-container class="main_container">
      <el-aside width="16%" style="padding-top: 20px">
        <el-menu :default-active="this.$route.path" style="padding-top: 100px" router>
          <el-menu-item index="/purchase/list">
            <i class="el-icon-menu"></i>
            <span slot="title">求购信息</span>
          </el-menu-item>
          <el-menu-item index="/purchase/new">
            <i class="el-icon-document"></i>
            <span slot="title">发布求购</span>
          </el-menu-item>
          <el-menu-item index="/purchase/my">
            <i class="el-icon-setting"></i>
            <span slot="title">我的求购</span>
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
    name: 'purchase',
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
