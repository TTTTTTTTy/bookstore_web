<template>
  <el-container class="page" direction="vertical">
    <navigation></navigation>
    <el-container class="main_container">
      <book-list v-on:getIndex="loadBook"></book-list>
      <el-container class="right_main_container" direction="vertical">
        <el-container style="height: 100%; width: 100%; padding-top: 50px" direction="vertical">
          <el-container class="book_container">
            <div style="padding-top: 30px">
              <img :src="getImages(book.image)" class="image">
            </div>
            <el-container style="height: 100%; margin-left: 20px" >
              <el-header height="60px" style="margin-bottom: 10px" direction="vertical">
                <el-tooltip class="item" effect="light" content="查看豆瓣详细介绍页面" placement="top-end">
                  <a :href="book.url" style="font-size: 28px;color: #000000; padding-right: 10px">{{book.bookname}}</a>
                </el-tooltip>
                <div style="margin-top: 10px">
                  <span style="font-size: 14px">作者：{{(book.author === '')?'无':book.author}}</span>
                </div>
              </el-header>
              <div style="height:140px">
                <p class="center-vertical" style=" font-size: 12px; line-height: 24px; ">{{(book.summary === '')?'暂无相关介绍':book.summary}}</p>
              </div>
            </el-container>
          </el-container>
          <div style="width: 100%;padding-top: 60px">
            <el-table :data="userBooks" style="width: 100%" height="500">
              <el-table-column label="图片" width="140">
                <template slot-scope="scope">
                  <img :src= "scope.row.image" class="pic">
                </template>
              </el-table-column>
              <el-table-column label="日期" width="140" prop="date"  :formatter="dateFormat" sortable prefix-icon="el-icon-time">
              </el-table-column>
              <el-table-column label="卖家" width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.username }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="sellPrice" label="售价" width="120" sortable>
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="small">{{ num2(scope.row.sellPrice) }}</el-tag>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="详细描述" width="300" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span style="padding-right: 20px">{{ scope.row.description }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" style="padding-left: 20px" align="center">
                <template slot-scope="scope">
                  <a target="_blank" :href=getQQUrl(scope.row.qq)>
                  <el-button size="mini" style="margin-left: 20px"
                             @click="handleEdit(scope.$index, scope.row)">联系卖家</el-button></a>
                  <el-button size="mini" type="primary" style="margin-left: 10px"
                             @click="handleBuy(scope.$index, scope.row)">立刻购买</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-container>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import navigation from "@/components/navigation";
  import bookList from "@/components/bookList";
  import moment from 'moment'

  export default {
    name: 'book',
    data() {
      return {
        loading: false,
        booId: '',
        searchBook: '默读',
        book:{},
        userBooks: [],
      }
    },
    methods: {
      loadBook(index){
        this.$router.push({name:'home',params:{index:index}});
      },
      getImages(_url){
        if(_url !== undefined ){
          let _u = _url.substring( 7 );
          return 'https://images.weserv.nl/?url=' + _u;
        }
      },
      dateFormat(row, column) {
        const date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD')
      },
      num2(i){
        return i.toFixed(2);
      },
      getQQUrl(qq) {
        return "http://wpa.qq.com/msgrd?v=3&uin=" + qq + "&site=qq&menu=yes"
      },
      handleBuy(index, row) {
        if(row.username === this.$store.state.username){
          this.$message({
            message: '不能购买自己发布的书籍',
            type: 'error',
          });
          return false;
        }
        this.$router.push({name:'newOrder', params: {id: row.id, bookname: this.book.bookname}});
      },
    },
    components: {
      navigation,
      bookList
    },
    mounted: function () {
      this.bookID = this.$route.params.id;
      this.loading = true;
      this.getRequest("/book/" + this.bookID).then(resp=> {
        if (resp && resp.status == 200) {
          this.book = resp.data.obj;
        }
      })
      this.getRequest("/book/userbook/book/" + this.bookID).then(resp=> {
        this.loading = false;
        if (resp && resp.status == 200) {
          this.userBooks = resp.data;
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/mixin';
  .text{
    font-size: 24px;
    margin-bottom: 18px;
    float: left;
  }

  .form_container{
    background-color: #ffffff;
    width: 100%;
    top: 0;
    float: right;
    margin-top: 0;
    padding-top: 15px;
    padding-right: 20px;
  }

  .book_container{
    height: 180px;
    margin-left: 0;
    padding-left: 10px;
    padding-right: 20px;
    background-color: #ffffff
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 130px;
    height: 160px;
    display: block;
  }

  .pic {
    width: 80px;
    height: 80px;
    display: block;
  }

  .center-vertical{
    position: relative;
    top:50%;
    transform:translateY(-50%);
  }

</style>
