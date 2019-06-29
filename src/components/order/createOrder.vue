<template>
  <el-container class="page" direction="vertical">
    <navigation></navigation>
    <div class="form_container" v-loading="loading">
      <el-table :data="userBooks" style="width: 100%" >
        <el-table-column label="图片" width="160" align="center">
          <template slot-scope="scope">
            <img :src= "scope.row.image" class="pic">
          </template>
        </el-table-column>
        <el-table-column label="书名" width="180" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="padding-right: 20px">{{ scope.row.bookname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="卖家" width="140" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sellPrice" label="售价" align="center" width="120">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="small" :type="scope.row.sellPrice !== originalPrice? 'success' : 'primary'">{{ num2(scope.row.sellPrice) }}</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-form :rules="rules" style="padding-top: 30px;padding-right: 30px" label-width="100px">
      </el-form>
      <el-form  :model="order" :rules="rules" ref="order" size="small"  style="padding-right: 30px"  label-width="100px">
        <el-form-item label="交易模式" prop="mode" style="width: 50%;">
          <el-radio-group v-model="order.mode" >
            <el-radio label="寄送"></el-radio>
            <el-radio label="线下交易"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机：" prop="phone">
          <el-input placeholder="输入您的手机号" v-model="order.phone"></el-input>
        </el-form-item>
        <el-form-item label="地区：" prop="area"  v-show="order.mode === '寄送'" :required="order.mode==='寄送'"  style="width: 50%">
          <el-radio-group v-model="order.area">
            <el-radio label="江浙沪"></el-radio>
            <el-radio label="非江浙沪"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="address" label="地址：" v-show="order.mode === '寄送'" :required="order.mode==='寄送'">
          <el-input placeholder="输入您的地址" v-model="order.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitClick('order')" class="submit_btn">确定</el-button>
          <el-button @click="back" class="submit_btn">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script>
  import navigation from "@/components/navigation";

  export default {
    name: "createOrder",

    data() {
      var checkPhone = (rule, value, callback) => {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确的手机号码'));
        } else {
          callback();
        }
      };
      return{
        loading: false,
        originalPrice: 15.4,
        userBooks: [{
          image:'http://localhost:8081/images/2019-06-23/adb40b04-6f49-4101-a582-401ef37e55c8.jpg',
          username: 'www',
          sellPrice: 15.4,
          description: 'ss'
        }],
        order: {
          mode: '',
          phone: '',
          area: '',
          address: '',
          price: 0,
          userBookId: -1,
          bookname: '',
          buyerName: '',
          sellerName: ''
        },
        rules: {
          mode: [
            {required: true, message: '请选择交易模式', trigger: 'change'},
          ],
          phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {validator: checkPhone, trigger: ['blur', 'change']}
          ],
          area: [
            {message: '请选择地区', trigger: 'change' }
          ],
          address: [
            {message: '请填写详细地址', trigger: 'change' }
          ],

        },
      }
    },
    watch:{
      'order.mode':function(val){
        if(val === '寄送'){
          this.$message('寄送默认运费由买家承担哦~江浙沪8元，非江浙沪15元');
          if(this.order.area === '江浙沪'){
            this.userBooks[0].sellPrice = this.originalPrice + 8;
          } else if(this.order.area === '非江浙沪'){
            this.userBooks[0].sellPrice = this.originalPrice + 15;
          } else {
            this.userBooks[0].sellPrice = this.originalPrice;
          }
        } else{
          this.$message({
            message: '线下交易由买卖双方沟通进行，本站不承担任何责任',
            type: 'warning'
          });
          this.userBooks[0].sellPrice = this.originalPrice;
        }
      },
      'order.area':function(val){
        if(val === '江浙沪'){
          this.userBooks[0].sellPrice = this.originalPrice + 8;
        } else if(val === '非江浙沪'){
          this.userBooks[0].sellPrice = this.originalPrice + 15;
        } else {
          this.userBooks[0].sellPrice = this.originalPrice;
        }
      }
    },
    methods: {
      num2(i){
        return i.toFixed(2);
      },
      submitClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.$message({
              message: '请检查输入',
              type: 'error',
            });
          } else {
            this.loading = true;
            this.order.mode = (this.order.mode === '寄送');
            this.order.price = this.userBooks[0].sellPrice;
            this.postRequest('/order', this.order).then(resp=> {
              this.loading = false;
              if (resp && resp.status == 200) {
                this.$router.replace('/order/buy');
              }
            });
          }
        });
      },
      back(){
        //点击跳转至上次浏览页面
        this.$router.go(-1)
        //指定跳转地址
        //this.$router.replace('/login')
      }

    },
    components: {
      navigation
    },
    mounted: function () {
      console.log(this.$route.params.bookname);
      if(this.$route.params.id === undefined || this.$route.params.bookname === undefined){
        this.$message({
          message: '该书籍不存在',
          type: 'error',
        });
        return;
      }
      this.order.userBookId = this.$route.params.id;
        this.getRequest("/book/userbook/get/" + this.$route.params.id).then(resp=> {
        if (resp && resp.status == 200) {
          this.userBooks = resp.data;
          this.originalPrice = this.userBooks[0].sellPrice;
          this.userBooks[0].bookname = this.$route.params.bookname;
          this.order.bookname = this.$route.params.bookname;
          this.order.sellerName = this.userBooks[0].username;
          if(this.order.sellerName === this.$store.state.username){
            this.$message({
              message: '不能购买自己发布的书籍',
              type: 'error',
            });
            this.back();
          }
          this.order.buyerName = this.$store.state.username;
        }
      })
    }
  }
</script>

<style scoped>
  .form_container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 600px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
  }

  .pic {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
