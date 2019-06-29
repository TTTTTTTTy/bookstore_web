<template>
  <el-main style="width: 100%; display: flex; align-items: center; flex-direction:column">
    <div v-loading="loading" style="width: 600px; padding-top: 100px;  padding-right: 80px">
      <el-form  :model="purchase" :rules="rules" ref="purchase" size="small" label-width="150px">
        <el-form-item prop="bookname" label="书名：">
          <el-input placeholder="输入书籍名字" v-model="purchase.bookname"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="预期价格：">
          <el-input placeholder="输入您的预期价格" v-model="purchase.price"></el-input>
        </el-form-item>
        <el-form-item label="书籍描述：">
          <el-input placeholder="输入对求购书籍的描述，不超过100个字" v-model="purchase.description" type="textarea" :rows="5"  maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitClick('purchase')" class="submit_btn">发布</el-button>
          <el-button @click="back" class="submit_btn">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-main>
</template>

<script>
  import navigation from "@/components/navigation";

  export default {
    name: 'newPurchase',
    data() {
      var checkPrice = (rule, value, callback) => {
        if(!(/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value))){
          callback(new Error("价格必须是正数，且允许保留小数点后面两位数"));
        } else{
          callback();
        }
      };
      return {
        loading: '',
        purchase:{
          bookname: '',
          price: '',
          description: '最好全套，单本也可，价格另议',
          username: this.$store.state.username
        },
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
      submitClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.$message({
              message: '请检查输入',
              type: 'error',
            });
          } else {
            this.loading = true;
            this.postRequest('/purchase', this.purchase).then(resp=> {
              this.loading = false;
              if (resp && resp.status == 200) {
                this.$router.push('/purchase/my');
              }
            });
          }
        });
      },
      back(){
        this.$router.go(-1)
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
