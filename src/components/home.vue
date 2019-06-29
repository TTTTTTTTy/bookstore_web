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
        <div style="padding-top: 30px;padding-left:15px;">
          <el-row>
            <el-col :span="3" v-for="(book,index) in books" :key="index" :offset="compute(index)" style="margin-bottom:40px">
              <el-card :body-style="{ padding: '0px', height:'270px'}" shadow="hover" style="height: 265px;">
                <div style="padding: 2px;height: 225px;align-items: center">
                  <div style="position: relative;">
                    <img :src="getImages(book.image)" class="avatar">
                  </div>
                  <div style="position: relative;top: 5px;">
                    <div style="font-size: 13px;">{{book.bookname}}</div>
                    <div style="position: relative;top: 5px;text-align: center;font-size: 10px;">{{getAuthor(book.author)}}</div>
                  </div>
                </div>
                <div style="height: 20px">
                  <i class="el-icon-view"></i><el-button style="padding-left: 5px" type="text" @click="handleView(book.id)">查看</el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
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
        tableLoading:false,
        input:'',
        searchBook: [],
        books:[]
      }
    },
    methods: {
      loadBook(index){
        this.getRequest("/book/category/" + index).then(resp=> {
          if (resp && resp.status == 200) {
            this.books = resp.data.obj;
          }
        })
      },
      getImages(_url){
        if(_url !== undefined ){
          let _u = _url.substring( 7 );
          return 'https://images.weserv.nl/?url=' + _u;
        }
      },
      getAuthor(name){
        if(name !== undefined){
          if(name.length > 30){
            return name.substring(0, name.indexOf(","));
          }
        }
        return name;
      },
      compute(index) {
        if(index === 0){
          return 0;
        } else if(index % 5 === 0) {
          return 0;
        } else{
          return 2;
        }
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
        this.$router.push({path:'/search',query:{book:this.input}});
        this.search = true;
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
      if(this.$route.params.index !== undefined){
        this.loadBook(this.$route.params.index);
      } else {
        this.loadBook(10);
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

  .avatar {
    width: 100%;
    height: 160px;
    display: block;
  }
</style>
