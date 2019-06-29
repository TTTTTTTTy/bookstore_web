<template>
  <el-main style="padding-left: 50px; padding-top: 50px">
    <el-table v-loading="loading" :data="purchases.filter(data => !search || data.bookname.toLowerCase().includes(search.toLowerCase()))" style="width: 100%" >
      <el-table-column label="日期" width="160" prop="date" :formatter="dateFormat" sortable prefix-icon="el-icon-time">
      </el-table-column>
      <el-table-column label="书名" width="200" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.bookname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预期价格" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.price }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="书籍描述" width="240" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column  style="padding-left: 20px" align="right" width="240">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入书名搜索" style="padding-left: 40%"/>
        </template>
        <template slot-scope="scope">
          <a target="_blank" :href=getQQUrl(scope.row.qq)>
            <el-button size="mini" style="margin-left: 20px">联系ta</el-button></a>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
  import navigation from "@/components/navigation";
  import moment from 'moment'

  export default {
    name: 'purchaseList',
    data() {
      return {
        loading: false,
        search: '',
        purchases:[]
      }
    },
    methods: {
      getQQUrl(qq) {
        return "http://wpa.qq.com/msgrd?v=3&uin=" + qq + "&site=qq&menu=yes"
      },
      dateFormat(row, column) {
        const date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD')
      },
    },
    components: {
      navigation
    },
    mounted: function () {
      this.loading = true;
      this.getRequest("/purchase").then(resp=> {
        if (resp && resp.status == 200) {
          this.purchases = resp.data;
        }
        this.loading = false;
      })
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
