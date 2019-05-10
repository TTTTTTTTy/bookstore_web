<template>
  <div class="hello">
    <el-row>
      <el-col span="12">
        <p v-if=seen>现在你看到我了</p>
        <el-checkbox type="checkbox" v-model="seen" id="seen">
        </el-checkbox>
      </el-col>
    </el-row>
    <h1>{{ msg }}</h1>
    <a v-bind:href=url>{{mymsg}}</a>
    <h3>{{method()}}</h3>
    <el-row>
      <el-button size="small" type="primary" v-on:click="reverse">反转字符串</el-button>
      <el-button>鼠标滑过/点击背景变淡</el-button>
      <el-button type="info" icon="el-icon-delete-solid" plain>删除</el-button>
      <el-button type="success" round>圆角按钮</el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
      <el-button type="text">文字按钮</el-button>
      <el-button size="large">不同尺寸按钮</el-button>
      <el-button :disabled="true">动态禁用</el-button>
      <el-button type="primary">图标加文字按钮<i class="el-icon-upload el-icon--right"></i></el-button>
      <el-button type="primary" :loading="true">加载中按钮</el-button>
    </el-row>
    <el-switch on-text="关闭" off-text="开启" v-model="formData.is_premium"></el-switch>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      mymsg: 'hello world',
      seen: true,
      url: 'https://www.baidu.com',
      formData: {
        is_premium: true
      }
    }
  },
  methods: {
    method: function () {
      return this.mymsg + '菜鸟技术'
    },
    reverse: function () {
      this.mymsg = this.mymsg.split('').reverse().join('')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
