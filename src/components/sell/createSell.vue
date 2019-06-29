<template>
  <el-main style="width: 100%; display: flex; align-items: center; flex-direction:column">
    <div style="height: 300px">
      <el-form v-loading="loading" v-show="index==0" :model="bookForm" :rules="rules" ref="bookForm" size="mini" style="padding-top: 150px; padding-right: 60px" label-width="80px">
        <el-form-item prop="ISBN" label="ISBN：">
          <el-input placeholder="10或13位ISBN" v-model="bookForm.ISBN"></el-input>
        </el-form-item>
        <el-form-item  prop="category" label="类别：">
          <el-select v-model="bookForm.category" placeholder="请选择"  size="mini">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toStepTwo('bookForm')" class="submit_btn">下一步</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
      <el-form v-show="index==1" :inline="true" :model="sellForm" ref="sellForm" size="mini" style="padding-top: 70px; padding-right: 50px" label-width="100px">
        <el-form-item label="ISBN：">
          <el-input v-model="sellForm.ISBN" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="书名：">
          <el-input v-model="sellForm.bookname" disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-show="index==1" :inline="true" :model="sellForm" ref="sellForm" size="mini" style=" padding-right: 50px" label-width="100px">
        <el-form-item label="作者：">
          <el-input v-model="sellForm.author" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="价格：">
          <el-input v-model="sellForm.price" disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-show="index==1" :model="sellForm" :rules="rules" ref="sellForm" size="mini"  style=" padding-right: 60px"  label-width="100px">
        <el-form-item prop="sellPrice" label="您的售价：">
          <el-input placeholder="输入售价" v-model="sellForm.sellPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品描述：">
          <el-input placeholder="输入商品描述，不超过100个字" v-model="sellForm.description" type="textarea" :rows="4"  maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="lastStep" class="submit_btn">上一步</el-button>
          <el-button type="primary" @click="nextStep('sellForm')" class="submit_btn">下一步</el-button>
        </el-form-item>
      </el-form>
      <div v-show="index==2" style="padding-top: 70px">
        <el-upload
          v-show="index==2"
          class="avatar-uploader upload-demo"
          v-loading="loading"
          action="/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过2M</div>
        <el-form style="padding-top: 15px">
          <el-form-item>
            <el-button type="primary" @click="lastStep" class="submit_btn" size="mini">上一步</el-button>
            <el-button type="primary" @click="submitClick" class="submit_btn" size="mini">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="display: flex;justify-content: center;width: 100%;">
      <el-steps :active="index" style="width: 100%; padding-top: 100px" align-center="true">
        <el-step title="填写书籍基本信息" icon="el-icon-edit"></el-step>
        <el-step title="确认书籍信息" icon="el-icon-edit-outline"></el-step>
        <el-step title="上传书籍照片" icon="el-icon-picture"></el-step>
      </el-steps>
    </div>

  </el-main>
</template>

<script>
  export default {
    name: "createSell",
    data() {
      var checkISBN = (rule, value, callback) => {
        if(!(/^\d{10}$/.test(value)) && !(/^\d{13}$/.test(value))){
          callback(new Error("请填写10或13位数字"));
        } else{
          callback();   // 一定要callback！！！不然整体提交表单的时候走不通orz
        }
      };
      var checkPrice = (rule, value, callback) => {
        if(!(/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value))){
          callback(new Error("价格必须是正数，且允许保留小数点后面两位数"));
        } else{
          callback();
        }
      };
      return {
        loading:false,
        imageUrl: '',
        index: 0,
        bookForm: {
          ISBN: '9787302517979',
          category: ''
        },
        sellForm: {
          bookname: '',
          ISBN: '',
          author: '',
          price: '',
          category: '',
          sellPrice: '28.50',
          description: '九成新，买了一个多月，正版'
        },
        rules: {
          ISBN: [
            {required: true, message: '请输入ISBN号', trigger: 'blur'},
            {validator: checkISBN, trigger: ['blur', 'change']}
          ],
          category: [
            {required: true, message: '请选择书籍类别', trigger: 'change'}
          ],
          sellPrice: [
            {required: true, message: '请输入出售价格', trigger: 'blur'},
            {validator: checkPrice, trigger: ['blur', 'change']}
          ],
        },
        options: [{
          value: '0',
          label: '教育'
        }, {
          value: '1',
          label: '文学'
        }, {
          value: '2',
          label: '流行'
        }, {
          value: '3',
          label: '哲学'
        }, {
          value: '4',
          label: '医药'
        }, {
          value: '5',
          label: '军事'
        }, {
          value: '6',
          label: '经济'
        }, {
          value: '7',
          label: '语言'
        }, {
          value: '8',
          label: '艺术'
        }, {
          value: '9',
          label: '自然科学'
        }, {
          value: '10',
          label: '工业技术'
        }, {
          value: '11',
          label: '政治、法律'
        }, {
          value: '12',
          label: '历史、地理'
        }]
      }
    },
    methods: {
      lastStep: function () {
        this.index -= 1;
      },
      nextStep: function (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.index += 1;
          }
          else{
            this.$message({
              type: 'error',
              message: '请输入正确的价格'
            });
            return false;
          }
        })
      },
      async toStepTwo(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.loading = true;
            this.getRequest('/book/search/' + this.bookForm.ISBN).then(resp=> {
              if (resp && resp.status == 200) {
                this.sellForm.bookname = resp.data.obj.bookname;
                this.sellForm.ISBN = resp.data.obj.isbn;
                this.sellForm.author = resp.data.obj.author;
                this.sellForm.price = resp.data.obj.price;
                this.index += 1;
              }
              this.loading = false;
            });
          } else {
            this.$message({
              type: 'error',
              message: '请输入正确的信息'
            });
            return false;
          }
        })
      },
      submitClick: function () {
        if(this.imageUrl === ""){
          this.$message({
            type: 'error',
            message: '请上传书籍照片'
          });
          return false;
        } else {
          this.loading = true;
          this.postRequest('/book/add', {
            ISBN: this.bookForm.ISBN,
            category: this.bookForm.category,
            username: this.$store.state.username,
            sellPrice: this.sellForm.sellPrice,
            description: this.sellForm.description,
            imageUrl: this.imageUrl
          }).then(resp=> {
            this.loading = false;
            if (resp && resp.status == 200) {
              this.$router.replace('/sell/my');
            }
          });
        }
      },
      cancel: function () {
        this.$router.go(-1);
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = res.obj;
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
    }
  }
</script>

<style scoped>
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
