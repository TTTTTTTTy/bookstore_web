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
      <el-table-column label="预期价格" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.price }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="价格可协商" width="120">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" type="success">{{ scope.row.adjust }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" style="padding-left: 20px" align="center">
        <template slot-scope="scope">
          <el-button size="mini" style="margin-left: 20px"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
          price: '41.00',
          adjust: '是'
        }, {
          date: '2016-05-04',
          name: '编译原理及实践',
          price: '34.00',
          adjust: '否'
        }, {
          date: '2016-05-01',
          name: 'JAVA基础',
          price: '37.00',
          adjust: '是'
        }, {
          date: '2016-05-03',
          name: '数据库原理',
          price: '40.50',
          adjust: '是'
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
