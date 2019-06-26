<template>
  <el-container class="page" direction="vertical">
    <navigation></navigation>
    <el-container class="main_container">
      <book-list v-on:getIndex="loadBook"></book-list>
      <el-container class="right_main_container" direction="vertical">
        <el-header class="form_container" height="60px">
          <el-form inline="true" style="float: right">
            <el-form-item>
              <el-input v-model="input" placeholder="输入书籍名字进行搜索" prefix-icon="el-icon-search"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </el-header>
        <el-table border  :data="searchBook" style="width:90%; margin-left:40px; margin-top: 30px" v-loading="tableLoading">
          <el-table-column label="书名"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button  type="text" @click="handleClick(scope.$index, scope.row)">{{ scope.row.bookname }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="作者"  align="center">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="small" type="success"> {{scope.row.author}}</el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import navigation from "@/components/navigation";
  import bookList from "@/components/bookList";

  export default {
    name: 'search',
    data() {
      return {
        tableLoading:false,
        input:'',
        searchBook: [],
      }
    },
    methods: {
      loadBook(index){
        this.$router.push({name:'home',params:{index:index}});
      },
      handleView(id){
        this.$router.push("/book/" + id);
      },
      handleSearch(){
        if(this.input === ''){
          this.$message({
            type: 'error',
            message: '输入不能为空！'
          });
          return false;
        }
        this.tableLoading = true;
        this.getRequest("/book/searchLike?bookName=" + this.input).then(resp=> {
          if (resp && resp.status == 200) {
            this.searchBook = resp.data.obj;
          }
          this.tableLoading = false;
        })
      },
      handleClick(index, row){
        this.handleView(row.id);
      }
    },
    components: {
      navigation,
      bookList
    },
    mounted: function () {
      console.log(this.$route.query.book);
      if(this.$route.query.book !== undefined){
        this.input = this.$route.query.book;
        this.handleSearch();
      }
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
