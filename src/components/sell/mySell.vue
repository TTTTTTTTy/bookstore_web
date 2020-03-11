<template>
  <el-main v-loading= "loading" style="padding-top: 20px; display: flex; align-items: flex-start;flex-direction:row; justify-content: center">
    <el-table v-show="!edit" :data="tableData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}"
              v-loading="tableLoading">
      <el-table-column label="图片" width="120">
        <template slot-scope="scope">
          <img :src= "scope.row.image" class="pic">
        </template>
      </el-table-column>
      <el-table-column label="日期" width="140" prop="date"  :formatter="dateFormat" sortable prefix-icon="el-icon-time">
      </el-table-column>
      <el-table-column label="书名" width="160"  show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.bookname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="100">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="small" :type="scope.row.state? 'success' : 'primary'"> {{num2(scope.row.sellPrice)}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="详细描述" width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <span style="padding-right: 20px">{{ scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tag" label="状态" width="110"
        :filters="[{ text: '已售出', value: true }, { text: '未售出', value: false}]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state? 'success' : 'primary'"
            disable-transitions size="small">{{scope.row.state? '已售出': '未售出'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label=""  fixed="right">
        <template slot-scope="scope">
          <el-button size="mini"  :disabled="scope.row.state"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" :disabled="scope.row.state"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="edit" style="padding-top: 150px">
      <el-form  :model="sellForm" :rules="rules" ref="sellForm" size="small"  style=" padding-right: 20px; width: 420px"  label-width="100px">
        <el-form-item prop="sellPrice" label="您的售价：">
          <el-input placeholder="输入售价" v-model="sellForm.sellPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品描述：">
          <el-input placeholder="不超过150个字" v-model="sellForm.description" type="textarea" :rows="6"  maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editSubmit('sellForm')" class="submit_btn">确定</el-button>
          <el-button  @click="cancel" class="submit_btn">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="edit" style="padding-top: 170px">
      <el-upload
        class="avatar-uploader upload-demo"
        action="/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="sellForm.imageUrl" :src="sellForm.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="tip" class="el-upload__tip">点击上传书籍照片</div>
    </div>
  </el-main>
</template>

<script>
  import navigation from "@/components/navigation";
  import moment from 'moment'
  export default {
    name: 'mySell',
    data() {
      var checkPrice = (rule, value, callback) => {
        if(!(/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value))){
          callback(new Error("价格必须是正数，且允许保留小数点后面两位数"));
        } else{
          callback();
        }
      };
      return {
        edit: false,
        tableLoading: false,
        loading: false,
        tableData: [],
        sellForm: {
          id: '',
          sellPrice: '',
          description: '',
          imageUrl: ''
        },
        rules: {
          sellPrice: [
            {required: true, message: '请输入出售价格', trigger: 'blur'},
            {validator: checkPrice, trigger: ['blur', 'change']}
          ],
        }
      }
    },
    methods: {
      dateFormat(row, column) {
        const date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD')
      },
      loadBooks(){
        this.tableLoading = true;
        this.getRequest("/book/userbook/" + this.$store.state.username).then(resp=> {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            this.tableData = resp.data;
          }
        })
      },
      num2(i){
        return i.toFixed(2);
      },
      filterTag(value, row) {
        return row.state === value;
      },
      tableRowClassName({row, rowIndex}) {
        if (row.state === "已售出") {
          return 'disabled-row';
        }
        return '';
      },
      handleEdit(index, row) {
        this.edit = true;
        this.sellForm.id = row.id;
        this.sellForm.sellPrice = row.sellPrice;
        this.sellForm.description = row.description;
        this.sellForm.imageUrl = row.image;
      },
      handleDelete(index, row) {
        this.$confirm('删除 [' + row.bookname + ']， 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.id);
        });
      },
      doDelete(id){
        this.tableLoading = true;
        this.deleteRequest("/book/userbook/" + id).then(resp=>{
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            this.loadBooks();
          }
        });
      },
      editSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.imageUrl === ""){
              this.$message({
                type: 'error',
                message: '请上传书籍照片'
              });
              return false;
            } else {
              this.loading = true;
              this.postRequest('/book/update', {
                id: this.sellForm.id,
                sellPrice: this.sellForm.sellPrice,
                description: this.sellForm.description,
                imageUrl: this.sellForm.imageUrl
              }).then(resp=> {
                this.loading = false;
                if (resp && resp.status == 200) {
                  this.loadBooks();
                  this.edit = false;
                }
              });
            }
          } else {
            this.$message({
              type: 'error',
              message: '请输入正确的价格'
            });
            return false;
          }
        })
      },
      cancel: function () {
        this.edit = false;
      },
      handleAvatarSuccess(res, file) {
        this.sellForm.imageUrl = res.obj;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传书籍图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传书籍图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    components: {
      navigation
    },
    mounted: function () {
      this.loadBooks();
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

  .pic {
    width: 80px;
    height: 80px;
    display: block;
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }

</style>

<style>
  .el-table .disabled-row {
    background: rgba(39, 40, 41, 0.08);
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
