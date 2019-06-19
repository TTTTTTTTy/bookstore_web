<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>旧书交易网站</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" style="padding-top: 5%" v-loading="loading">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn" >登陆</el-button>
            <el-button type="text" class="register_btn" @click="resg">没有账号？立刻注册</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      showLogin: false,
      loading: false
    }
  },
  mounted(){
    this.showLogin = true;
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          this.postRequest('/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          }).then(resp=> {
            this.loading = false;
            if (resp && resp.status == 200) {
              var data = resp.data;
              this.$store.commit('login', data.obj);
              var path = this.$route.query.redirect;
              this.$router
                .replace({path: path == '/' || path == undefined ? '/home' : path});
            }
          });
        } else {
          this.$message({
            type: 'error',
            message: '请输入用户名和密码'
          });
          return false;
        }
      });
    },
    resg(){
      this.$router.push({path: '/register'})
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../style/mixin';
  .login_page{
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    background-color: #19435c;
  }
  .manage_tip{
    position: absolute;
    width: 100%;
    top: -120px;
    left: 0;
  p{
    font-size: 34px;
    color: #fff;
  }
  }
  .form_contianer{
  .wh(320px, 200px);
  .ctp(320px, 180px);
    .el-form-item {margin-bottom: 25px;}
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #ffffff;
  .submit_btn{
    width: 40%;
    font-size: 14px;
  }
  .register_btn{
    font-size: 12px;
  }
  }
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
