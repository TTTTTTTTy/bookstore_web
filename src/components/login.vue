<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>旧书交易网站</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
            <el-button type="text" class="register_btn">没有账号？立刻注册</el-button>
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
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      showLogin: true
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
    background-color: #214457;
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
  .wh(320px, 180px);
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
  .tip{
    font-size: 12px;
    color: red;
  }
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
