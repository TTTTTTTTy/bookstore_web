<template>
  <el-main style="width: 100%; display: flex; align-items: center; flex-direction:column">
    <el-form :model="sellForm" :rules="rules" ref="loginForm" style="width: 300px; padding-top: 100px" label-width="80px">
      <el-form-item prop="username" label="书名：">
        <el-input v-model="sellForm.username" placeholder="书名"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="ISBN：">
        <el-input  placeholder="10或13位ISBN" v-model="sellForm.ISBN"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('sellForm')" class="submit_btn">下一步</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-steps :active="1" style="width: 100%; padding-top: 100px">
      <el-step title="步骤 1" icon="el-icon-edit"></el-step>
      <el-step title="步骤 2" icon="el-icon-upload"></el-step>
      <el-step title="步骤 3" icon="el-icon-picture"></el-step>
    </el-steps>


  </el-main>
</template>

<script>
  export default {
    name: "createSell",
    data() {
      return {
        sellForm: {
          bookname: '',
          ISBN: '',
          price: '',
        },
        rules: {
          username: [
            {required: true, message: '请输入书名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入ISBN号', trigger: 'blur'}
          ]
        }
      }
    }

  }
</script>

<style scoped>

</style>
