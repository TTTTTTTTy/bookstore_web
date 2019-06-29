<template>
  <el-main style="padding-left: 50px; padding-top: 50px">
    <el-table :data="orders" style="width: 100%" v-loading="loading">
      <el-table-column label="创建日期" width="140" prop="createDate"  :formatter="dateFormat" sortable>
      </el-table-column>
      <el-table-column label="书名" width="220" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.bookname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="买家" width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.buyerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="100">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.price }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="手机" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="交易方式" width="130">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tooltip class="item" effect="dark" :content="scope.row.address" placement="top">
              <el-tag size="medium">{{ scope.row.mode?'寄送':'线下交易'}}</el-tag>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="160">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" type="success">{{ getState(scope.row.state) }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" :disabled="scope.row.state !== 0"
                     @click="handleConfirm(scope.$index, scope.row)">确认</el-button>
          <a target="_blank" :href=getQQUrl(scope.row.qq)>
            <el-button size="mini" style="margin-left: 10px"  @click="handleDelete(scope.$index, scope.row)">联系买家</el-button></a>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
  import navigation from "@/components/navigation";
  import moment from 'moment'

  export default {
    name: 'sellList',
    data() {
      return {
        loading: false,
        orders:[],
      }
    },
    methods: {
      loadOrders(username){
        this.loading = true;
        this.getRequest("/order/seller/" + username).then(resp=> {
          if (resp && resp.status == 200) {
            this.orders = resp.data;
          }
          this.loading = false;
        });
      },
      dateFormat(row, column) {
        const date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD')
      },
      getQQUrl(qq) {
        return "http://wpa.qq.com/msgrd?v=3&uin=" + qq + "&site=qq&menu=yes"
      },
      getState(state) {
        if(state === 0) {
          return '等待卖家确认';
        } else if(state === 1) {
          return '等待买家确认';
        } else if(state === 2) {
          return '已完成';
        }
      },
      handleConfirm(index, row) {
        this.loading = true;
        this.putRequest("/order/seller/" + row.id).then(resp=> {
          if (resp && resp.status == 200) {
            this.loadOrders(this.$store.state.username);
          }
          this.loading = false;
        });
      }
    },
    components: {
      navigation
    },
    mounted: function () {
      this.loadOrders(this.$store.state.username);
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
