<template>
  <el-main style="width: 100%; display: flex; align-items: center; flex-direction:column">
    <div style="height: 300px">
      <el-form v-show="index==0" :model="bookForm" :rules="rules" ref="bookForm" size="mini" style="padding-top: 150px; padding-right: 50px" label-width="80px">
        <el-form-item prop="ISBN" label="ISBN：">
          <el-input  placeholder="10或13位ISBN" v-model="bookForm.ISBN"></el-input>
        </el-form-item>
        <el-form-item  prop="category" label="类别：">
          <el-select v-model="bookForm.category" placeholder="请选择"  size="mini">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="nextStep('bookForm')" class="submit_btn">下一步</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
      <el-form v-show="index==1" :model="sellForm" :rules="rules" ref="loginForm" size="mini" style="padding-top: 150px; padding-right: 50px" label-width="80px">
        <el-form-item prop="ISBN" label="ISBN：">
          <el-input  placeholder="10或13位ISBN" v-model="bookForm.ISBN"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="类别：">
          <el-select v-model="value" placeholder="请选择"  size="mini">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="lastStep" class="submit_btn">上一步</el-button>
          <el-button type="primary" @click="nextStep('bookForm')" class="submit_btn">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="display: flex;justify-content: center;width: 100%;">
      <el-steps :active="index" style="width: 100%; padding-top: 60px" align-center="true">
        <el-step title="填写书籍基本信息" icon="el-icon-edit"></el-step>
        <el-step title="确认书籍信息" icon="el-icon-edit-outline"></el-step>
        <el-step title="上传图片" icon="el-icon-picture"></el-step>
      </el-steps>
    </div>

  </el-main>
</template>

<script>
  export default {
    name: "createSell",
    data() {
      var checkISBN = (rule, value, callback) => {
        if (!(/^\d{10}$/.test(value)) && !(/^\d{13}$/.test(value))) {
          callback(new Error('ISBN必须是10或13位数字'));
        }
      };
      return {
        index: 0,
        bookForm: {
          ISBN: '',
          category: ''
        },
        rules: {
          ISBN: [
            {required: true, message: '请输入ISBN号', trigger: 'blur'},
            {validator: checkISBN, trigger: ['blur', 'change']}
          ],
          category: [

          ]
        },
        options: [{
          value: '教育',
          label: '教育'
        }, {
          value: '文学',
          label: '文学'
        }, {
          value: '流行',
          label: '流行'
        }, {
          value: '哲学',
          label: '哲学'
        }, {
          value: '医药',
          label: '医药'
        }, {
          value: '军事',
          label: '军事'
        }, {
          value: '经济',
          label: '经济'
        }, {
          value: '语言',
          label: '语言'
        }, {
          value: '艺术',
          label: '艺术'
        }, {
          value: '自然科学',
          label: '自然科学'
        }, {
          value: '工业技术',
          label: '工业技术'
        }, {
          value: '政治、法律',
          label: '政治、法律'
        }, {
          value: '历史、地理',
          label: '历史、地理'
        }]
      }
    },
    methods: {
      lastStep: function () {
        this.index -= 1;
      },
      async nextStep(formName) {
        alert(this.bookForm.category)
        this.$refs[formName].validate(async (valid) => {
          alert('hh');
          if (valid) {
            alert('submit')
            console.log(this)
            this.index += 1;
            alert(this.index)
          } else {
            this.$message({
              type: 'error',
              message: '请输入正确的ISBN号'
            });
            return false;
          }
        })
      },
      cancel: function () {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>

</style>
