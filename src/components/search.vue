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
        <el-container style="height: 100%; width: 100%" direction="vertical">
          <el-container class="book_container">
            <img src="../assets/book/1.jpg" width="150" height="150">
            <el-container style="height: 100%; margin-left: 20px">
              <el-header height="30px" style="margin-bottom: 10px">
                <a href="www.baidu.com" style="font-size: 28px;color: #000000; padding-right: 20px">默读</a>
                <span>作者：priest</span>
              </el-header>
              <p style="font-size: 12px; line-height: 24px">童年，成长经历，家庭背景，社会关系，创伤……
                我们不断追溯与求索犯罪者的动机，探寻其中最幽微的喜怒哀乐，不是为了设身处地地同情、乃至于原谅他们，不是为了给罪行以开脱的理由，不是为了跪服于所谓人性的复杂，不是为了反思社会矛盾，更不是为了把自己也异化成怪物——我们只是在给自己、给仍然对这个世界抱有期望的人——寻找一个公正的交待而已。</p>
            </el-container>
          </el-container>
          <el-container height="100px" style="width: 100%;padding-top: 0" direction="vertical">
            <el-table :data="tableData" style="width: 100%; padding-bottom: 0; margin-bottom: 0">
              <el-table-column label="日期" width="180" sortable>
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column label="卖家" width="160" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="售价" width="120" sortable>
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.price }}</el-tag>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="详细描述" width="280" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span style="padding-right: 20px">{{ scope.row.address }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" style="padding-left: 20px" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" style="margin-left: 20px"
                             @click="handleEdit(scope.$index, scope.row)">联系卖家</el-button>
                  <el-button size="mini" type="primary"
                             @click="handleDelete(scope.$index, scope.row)">立刻购买</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 0; padding-top: 0"
              layout="prev, pager, next" page-size="5"
              :total="5" hide-on-single-page>
            </el-pagination>
          </el-container>
        </el-container>
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
        searchBook: '默读',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          price: '41.00',
          address: '书九成新，地址上海市普陀区金沙江路 1518 弄，可发快递'
        }, {
          date: '2016-05-04',
          name: '张小龙',
          price: '34.00',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '金小风',
          price: '37.00',
          address: '书九成新，地址上海市普陀区金沙江路 1518 弄，可发快递'
        }, {
          date: '2016-05-03',
          name: '一个卖书的',
          price: '40.50',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-01',
          name: '金小风',
          price: '37.00',
          address: '书九成新，地址上海市普陀区金沙江路 1518 弄，可发快递'
        }]
      }
    },
    methods: {
      handleEdit(key, keyPath) {
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
  .text{
    font-size: 24px;
    margin-bottom: 18px;
    float: left;
  }
  .main_container{
    background-color: #ffffff;
    height: 100%;
    width: 100%;
    top: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0;
    padding-top: 0;
  }

  .right_main_container{
    background-color: #ffffff;
    height: 100%;
    width: 100%;
    top: 60px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 0;
    padding-left: 20px;
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
    height: 100px;
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
    width: 200px;
    display: block;
  }
</style>
