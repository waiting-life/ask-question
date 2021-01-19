<template>
  <div class="header">
    <div class="header-content">
      <div class="header-logo">
        <span>留言吧</span>
      </div>
      <home-header-nav class="header-left"/>
      <search-dialog class="header-center" @inputFocus="listenInputFocus" @inputBlur="listenInputBlur"/>
      <el-button 
        @click="showAskDialog" 
        size="small"
        type="primary">
        提问
      </el-button>
      <div class="header-right">
        <div class="right-item profile-info" v-if="isLogin">
          <el-dropdown split-button>
            用户信息
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span>当前登录用户 {{ nickname }}</span>
              </el-dropdown-item>
              <el-dropdown-item @click.native = "toProfilePage">
                <span>个人主页</span>
              </el-dropdown-item>
              <el-dropdown-item @click.native = "toSettingPage">
                <span>设置</span>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchDialog from 'components/SearchDialog'
import HomeHeaderNav from 'components/homeChild/HomeHeaderNav.vue';
import { mapState } from 'vuex'
export default {
  components: {
    SearchDialog,
    HomeHeaderNav,
  },
  data() {
    return {
      isLogin: false,
      isHeaderScroll: false,
      isFocus: false,
      cookie: ''
    }
  },
  computed: mapState({
    nickname() {
      return this.$store.state.userInfo.nickname    
    },
    userId() {
      return this.$store.state.userInfo.user_id
    }
  }),
  created() {
    this.getUser()
    function throttle (fn, time = 1000) {
      let canRun = true;
      return function () {
        if (!canRun) return false;
        canRun = false;
        setTimeout(() => {
            fn.call(this)
            canRun = true
        }, time)
      }
   }
    window.addEventListener('scroll', throttle(() => {
      if (document.documentElement.scrollTop > 432 && !this.isFocus) {
        this.isHeaderScroll = true
      } else {
        // 滚下来之后要隐藏
        this.isHeaderScroll = false
      }
    }, 200))
    this.isLogined()
  },
  methods: {
    async getUser() {
      // 获取cookie值，cookie一般为id
      // cookie是根据根据user_id设的，所以可以根据cookie拿到登录用户信息
      let user_id
      document.cookie.split(';').forEach(item => {
        const i = item.trim()
        const [key, value] = i.split('=')
        if (key === 'user_id') {
          user_id = value
        }
      })
      const res = await fetch('/getUserById', {
        method: 'POST',
        body: JSON.stringify({
          user_id: user_id
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      const { data } = await res.json()
      const nickname = data.nickname
      const user = {
        nickname,
        user_id
      }
      this.$store.commit('getUserInfo', user)
    },
    toProfilePage() {
      this.$router.push(`/profile/${this.userId}`)
    },
    toSettingPage() {
      this.$router.push('/setting')
    },
    showAskDialog() {
      this.$store.commit('showAskDialog')
    },
    async logOut() {
      try {
        await this.$confirm('是否要退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await fetch('/delcookie')
        const result = await res.json()
        const code = result.err_code
        if (code === 0) {
          this.$router.push('/login')
          this.$message.success('已退出登录')
        }
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      }
    },
    isLogined() {
      this.cookie = decodeURI(document.cookie.split('=')[1])
      if (this.cookie) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    listenInputFocus() {
      this.isFocus = true
    },
    listenInputBlur() {
      this.isFocus = false
    },
  }
}
</script>
<style scoped>
  .header {
    height: 60px;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 10;
    box-shadow: 0 1px 3px rgba(18,18,18,.1);
    background-color: #fff;
  }
  .header-content, .header-tag {
    transition: all 0.3s;
  }
  /* x_x 当要给多个子元素动态绑定类名的时候给父元素一个类名来控制子元素样式，避免了给每个子元素添加类名*/
  .headerScroll .header-content, .headerScroll .header-tag {
    transform: translateY(-100%);
  }
  .header-content {
    margin: 0 auto;
    display: flex;
    height: 60px;
    align-items: center;
    width: 1200px;
  }
  .header-logo {
    font-size: 28px;
    color: pink;
    font-weight: 600;
    text-align: center;
    padding: 0 20px;
  }
  .header-tag {
    margin: 0 auto;
    display: flex;
    width: 960px;
    justify-content: space-between;
    align-items: center;
  }
  .header-center {
    width: 520px;
    position: relative; 
  } 
  .header-right {
    margin-left: 15px;
  }
</style>