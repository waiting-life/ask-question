<template>
  <div class="login">
    <div class="login-container">
      <h2 class="title">欢迎来到留言板</h2>
      <el-form :model="user">
        <el-form-item label="昵称：">
          <el-input autocomplete="off" v-model="user.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input autocomplete="off" v-model="user.password" placeholder="请输入密码" type="password" minlength="6"></el-input>
        </el-form-item>
      </el-form>
      <div class="btns">
        <el-button type="primary" @click="Register" >注 册</el-button>
        <el-button type="primary" @click="login">登 录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        nickname: 'cpp',
        password: '123456'
      }
    }
  },
  methods: {
    async Register() {
       const {nickname, password} = this.user
      if (nickname === '' || password === '') {
        this.$message.error('昵称和密码不能为空！')
      } else {
        const res = await fetch('/register', {
          method: 'POST',
          body: JSON.stringify({
            nickname: nickname,
            password: password
          }),
          // username=cpp&age=2 这种形式不但可以拼接在路径里面，也可以放在请求体里面
          // post请求
          // 简单请求：'Content-Type' : 'application/x-www-form-urlencoded'    // username=cpp&age=2的形式
          // 复杂请求：'Content-Type' : 'application/json'   // json的形式
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
        const result = await res.json()
        const code = result.err_code
        if (code === 1) {
          this.$message.error('昵称已存在，请重新注册')
        } else if (code === 0) {
          this.$message.success('注册成功')
        }
      }
    },
    async login() {
      const {nickname, password} = this.user
      if (nickname === '' || password === '') {
        this.$message.error('昵称和密码不能为空！！')
      } else {
        const res = await fetch('/login',{
          method: 'POST',
          body: JSON.stringify(this.user),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
        const result = await res.json()
        const code = result.err_code
        if (code === 0) {
          this.$message.success('登录成功')
          this.$router.push('/home')
        } else if (code === 2) {
          this.$message.error(result.message)
        }
      }
    }
  }
}
</script>
<style scoped>
  .login {
    height: 100vh;
    background: url('~assets/image/xiaomonv.jpg') no-repeat;
    background-position: center top;
    position: relative;
  }
  .login-container {
    width: 350px;
    height: 300px;
    padding: 30px 20px 0 20px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(20,20,20,.3);
    border-radius: 10px;
  }
  .login-container:hover {
    box-shadow: 0 2px 3px -1px rgba(18,18,18,.4);
    transition: all .5s;
  }
  .title {
    height: 40px;
    color: rgb(212, 171, 178);
    margin-bottom: 20px;
  }
  .el-form-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-input {
    width: 220px;
    margin-top: 10px;
  }
  .el-button:nth-child(2) {
    margin-left: 20px;
  }
</style>