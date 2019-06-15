<template>
  <el-container class="page" direction="vertical">
    <navigation></navigation>
    <el-container class="main_container">
      <book-list></book-list>
      <el-container class="right_main_container" direction="vertical">
        <el-header class="form_container" height="70px">
          <el-form inline="true" style="float: right">
            <el-form-item>
              <el-input v-model="searchBook" placeholder="输入书籍名字进行搜索" prefix-icon="el-icon-search"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-header>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import navigation from "@/components/navigation";
  import bookList from "@/components/bookList";

  export default {
    name: 'home',
    data() {
      return {
        searchBook: ''
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components: {
      navigation,
      bookList
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/mixin';

  .form_container{
    background-color: #ffffff;
    width: 100%;
    padding-top: 20px;
    padding-right: 20px;
  }
</style>
