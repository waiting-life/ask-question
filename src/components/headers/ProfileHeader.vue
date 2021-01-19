<template>
  <div class="header" :class="{headerScroll: isHeaderScroll}">
    <div class="header-content">
      <div class="header-logo">
        <span>留言吧</span>
      </div>
      <home-header-nav class='header-left'/>
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
              <el-dropdown-item @click.native = "toMyProfilePage">
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
    <div class="header-tag">
      <div class="tag-left">
        <tag-header />
      </div>
      <div class="btns-right">
        <el-button type="primary">
          <i class="el-icon-plus"></i>
          关注他
        </el-button>
        <el-button type="plain">
          <i class="el-icon-chat-round"></i>
          发私信
        </el-button>
      </div>
    </div>
  </div>

</template>
<script>
import { mapState } from 'vuex'
import SearchDialog from 'components/SearchDialog'
import TagHeader from 'components/common/TagHeader'
import HomeHeaderNav from 'components/homeChild/HomeHeaderNav'
export default {
  components: {
    SearchDialog,
    TagHeader,
    HomeHeaderNav
  },
  data() {
    return {
      isLogin: false,
      isHeaderScroll: false,
      isFocus: false,
      headerIndexChange: 0,
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
    toMyProfilePage() {
      this.$router.push(`/profile/${this.userId}`)
      window.location.reload()
    },
    toSettingPage() {
      this.$router.push('/setting')
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
    // logOut() {
    //   this.$confirm('是否要退出登录?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     fetch('/delcookie')
    //     .then(res => res.json())
    //     .then(res => {
    //       const code = res.err_code
    //       if (code === 0) {
    //         this.$router.push('/login')
    //         this.$message.success('已退出登录')
    //       } 
    //     })
    //     console.log(2)
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消退出'
    //     })
    //   })     
    //   console.log(1)
    // },
    isLogined() {
      this.cookie = decodeURI(document.cookie.split('=')[1])
      if (this.cookie) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
      // this.nickname = atob(document.cookie.split('=')[1])
      // this.nickname = Buffer.from(document.cookie.split('=')[1], 'base64').toString()
      // this.nickname = decodeURI(document.cookie.split('=')[1])
    showAskDialog() {
      this.$store.commit('showAskDialog')
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
    overflow: hidden;
    height: 60px;
  }
  /* .test {
    overflow: hidden;
    height: 100%;
  } */
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