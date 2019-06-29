<template>
  <el-main style="padding-left: 50px; padding-top: 50px">
    <el-table v-show="!edit" v-loading="loading" :data="purchases" style="width: 100%">
      <el-table-column label="日期" width="160" prop="date" :formatter="dateFormat" sortable prefix-icon="el-icon-time">
      </el-table-column>
      <el-table-column label="书名" width="240" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.bookname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预期价格" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="small">{{ scope.row.price }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="书籍描述" width="240" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
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
    <div v-show="edit" v-loading="editLoading" style="width: 600px; padding-top: 100px;  padding-left: 180px">
      <el-form  :model="editPurchase" :rules="rules" ref="editPurchase" size="small" label-width="150px">
        <el-form-item prop="bookname" label="书名：">
          <el-input placeholder="输入书籍名字" v-model="editPurchase.bookname"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="预期价格：">
          <el-input placeholder="输入您的预期价格" v-model="editPurchase.price"></el-input>
        </el-form-item>
        <el-form-item label="书籍描述：">
          <el-input placeholder="输入对求购书籍的描述，不超过100个字" v-model="editPurchase.description" type="textarea" :rows="5"  maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitClick('editPurchase')" class="submit_btn">发布</el-button>
          <el-button @click="cancel" class="submit_btn">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-main>
</template>

<script>
  import navigation from "@/components/navigation";
  import moment from 'moment'

  export default {
    name: 'myPurchase',
    data() {
      var checkPrice = (rule, value, callback) => {
        if(!(/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value))){
          callback(new Error("价格必须是正数，且允许保留小数点后面两位数"));
        } else{
          callback();
        }
      };
      return {
        loading:false,
        editLoading: false,
        edit: false,
        editPurchase:{
          bookname:'',
          price: '',
          description: '',
          username: this.$store.state.username,
          id: ''
        },
        purchases:[],
        rules: {
          bookname: [
            {required: true, message: '请输入书籍名字', trigger: 'blur'}
          ],
          price: [
            {required: true, message: '请输入预期价格', trigger: 'blur'},
            {validator: checkPrice, trigger: ['blur', 'change']}
          ],
        }
      }
    },
    methods: {
      loadPurchase(){
        this.loading = true;
        this.getRequest("/purchase/" + this.$store.state.username).then(resp=> {
          if (resp && resp.status == 200) {
            this.purchases = resp.data;
          }
          this.loading = false;
        })
      },
      dateFormat(row, column) {
        const date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD')
      },
      handleEdit(index, row) {
        this.editPurchase.id = row.id;
        this.editPurchase.bookname = row.bookname;
        this.editPurchase.price = row.price;
        this.editPurchase.description = row.description;
        this.edit = true;
      },
      handleDelete(index, row) {
        this.$confirm('删除此条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          this.deleteRequest("/purchase/" + row.id).then(resp=> {
            if (resp && resp.status == 200) {
              this.loadPurchase();
              this.purchases = resp.data;
            }
            this.loading = false;
          })
        })
      },
      submitClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.$message({
              message: '请检查输入',
              type: 'error',
            });
          } else {
            this.editLoading = true;
            this.putRequest('/purchase', this.editPurchase).then(resp => {
              this.editLoading = false;
              if (resp && resp.status == 200) {
                this.edit = false;
                this.loadPurchase();
              }
            });
          }
        });
      },
      cancel(){
        this.edit = false;
      }
    },
    components: {
      navigation
    },
    mounted: function () {
      this.loadPurchase();
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
