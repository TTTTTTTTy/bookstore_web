<template>
  <div class="register_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showRes">
        <el-form :model="registerForm" :rules="rules" ref="registerForm" size="medium" v-loading="loading">
          <el-form-item>
            <p>用户注册</p>
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="realname">
            <el-input v-model="registerForm.realname" placeholder="真实姓名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="registerForm.password"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input type="password" v-model="registerForm.confirmPassword" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="registerForm.email" placeholder="电子邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input v-model="registerForm.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  class="register_btn" @click="submitClick('registerForm')">注册</el-button>
            <el-button @click="back">取消</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
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
        } else {
          callback();
        }
      };
      return {
        registerForm: {
          username: 'admin',
          realname: '汤烨春',
          password: '123456',
          confirmPassword:'123456',
          email:'1461723687@qq.com',
          phone:'18868111916'
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          realname: [
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
        showRes: false,
        loading: false,
      }
    },
    mounted(){
      this.showRes = true;
    },
    methods: {
      async submitClick(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (!valid) {
            this.$message({
              message: '请检查输入',
              type: 'error',
            });
          } else {
            this.loading = true;
            this.postRequest('/user/addUser', this.registerForm).then(resp=> {
              this.loading = false;
              if (resp && resp.status == 200) {
                this.$notify({
                  title: '提示',
                  message: '登录后请先点击右上角前往聊天设置，根据提示完成相关操作，就能和其他用户聊天了哦~',
                  duration: 0
                });
                this.$router.replace('/login');
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
    background-color: #19435c;
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
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
