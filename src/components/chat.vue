<template>
  <el-container class="page" direction="vertical">
    <navigation></navigation>
    <el-container class="main_container">
      <div style="margin: auto; padding-top: 50px">
        <div style="width: 600px">
          <span>第一步： 前往网址 https://shang.qq.com/v3/index.html</span>
        </div>
        <div style="width: 600px; padding-top: 20px">
          <span>第二步： 登录自己的QQ账号</span>
        </div>
        <div style="width: 600px; padding-top: 20px">
          <span>第三步： 选择推广工具, 并在弹框中选择立即免费开通（如提示系统繁忙请刷新）</span>
          <img src="@/assets/step.png" alt="step.png" class="avatar">
        </div>
        <div style="width: 600px; padding-top: 20px">
          <span>完成以上三步后在下方输入框填入您之前登录的QQ号（可再次输入进行更改）</span>
          <el-form :inline="true" :model="qqForm" ref="qqForm" :rules="rules" size="small" style="padding-top: 20px">
            <el-form-item prop="qq">
              <el-input  v-model="qqForm.qq"  placeholder="输入您的QQ"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitClick('qqForm')">确定</el-button>
            </el-form-item>
          </el-form>

        </div>
      </div>
    </el-container>
  </el-container>
</template>

<script>
  import navigation from "@/components/navigation";

  export default {
    name: 'chat',
    data() {
      var checkQQ = (rule, value, callback) => {
        if (!(/^\d{1,10}$/.test(value))) {
          callback(new Error('请输入正确的QQ号'));
        } else {
          callback();
        }
      };
      return {
        qqForm: {
          qq: ''
        },
        rules: {
          qq: [
            {required: true, message: '请输入qq号', trigger: 'blur'},
            {validator: checkQQ, trigger: ['blur', 'change']}
          ]
        }
      }
    },
    methods: {
      submitClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postRequest('/user/qq', {
              username: this.$store.state.username,
              qq: this.qqForm.qq
            }).then(resp=> {
              if (resp && resp.status == 200) {
                this.$router.push("/home")
              }
            });
          }
        });
      },
    },
    components: {
      navigation,
    },
    mounted: function () {
      if(this.$route.params.index !== undefined){
        this.loadBook(this.$route.params.index);
      } else {
        this.loadBook(10);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/mixin';

  .form_container{
    background-color: #ffffff;
    width: 100%;
    padding-top: 20px;
    padding-right: 20px;
  }

  .p{
    padding-top: 20px;
  }

  .avatar {
    padding-top: 15px;
    width: 600px;
    display: block;
  }
</style>
