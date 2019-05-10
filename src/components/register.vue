<template>
  <div class="register_page">
    <div class="form_contianer">
      <el-form :model="registerForm" :rules="rules" ref="registerForm" size="medium">
        <el-form-item>
          <p>用户注册</p>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="realName">
          <el-input v-model="registerForm.realName" placeholder="真实姓名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input v-model="registerForm.confirmPassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" placeholder="电子邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="registerForm.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  class="register_btn">注册</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "register",
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var checkPhone = (rule, value, callback) => {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确的手机号码'));
        }
      };
      return {
        registerForm: {
          username: '',
          realName: '',
          password: '',
          confirmPassword:'',
          email:'',
          phone:''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          realName: [
            {required: true, message: '请输入真实姓名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          confirmPassword: [
            {validator: validatePass, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入电子邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ],
          phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {validator: checkPhone, trigger: ['blur', 'change']}
          ]
        },
        showLogin: true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/mixin';
  .register_page{
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    background-color: #214457;
  }
  .form_contianer{
  .wh(420px, 460px);
  .ctp(420px, 460px);
  .el-form-item {
    margin-bottom: 20px;
    margin-left: 18px;
    margin-right: 18px;
  }
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #ffffff;
  .register_btn{
    width: 30%;
  }
  }
  p{
    font-size: 18px;
    font-weight: bold;
    line-height: 15px;
    color: #000000;
  }
</style>
