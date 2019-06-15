<template>
  <el-main style="padding-left: 50px; padding-top: 50px">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="180" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="书名" width="240">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="卖家" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.user }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.price }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" type="success">{{ scope.row.adjust }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" style="padding-left: 20px" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
  import navigation from "@/components/navigation";

  export default {
    name: 'myPurchase',
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '计算机网络',
          user: 'Amy',
          price: '41.00',
          adjust: '已完成'
        }, {
          date: '2016-05-04',
          name: '编译原理及实践',
          user: 'Peter',
          price: '34.00',
          adjust: '未完成'
        }, {
          date: '2016-05-01',
          name: 'JAVA基础',
          user: 'Wang',
          price: '37.00',
          adjust: '已完成'
        }]
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
