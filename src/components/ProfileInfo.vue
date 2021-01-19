<template>
  <div class="profile-info">
    <div class="user-bgimage">
      <img src="~assets/image/defaultBg.jpg" alt="">
    </div>
    <div class="user-info">
      <div class="user-detail">
        <div class="user-avator">
          <img src="~assets/image/lgAvator.jpg" alt="">
        </div>
        <div class="detail-main">
          <div class="user-nickname">
            <span>{{ profilePageNickname }}</span>
          </div>
          <div class="btns" v-show="!(profilePageNickname === userInfo.nickname)">
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
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      profilePageNickname: '',
      id: ''
    }
  },
  // watch: {
  //   $route(to, from) {
  //     console.log(to, from)
  //     this.id = to.params.id
  //     this.getUserById()
  //     // next()
  //   }
  // },
  // beforeRouteUpdate (to, from, next) {
  //   console.log(to, from)
  //   this.id = to.params.id
  //   this.getUserById()
  //   next()
  // },
  computed: mapState(['userInfo']),
  created() {
    this.getUserById()
  },
  methods: {
    async getUserById() {
      // const user_id = this.$route.params.id
      // console.log(user_id)
      this.id = this.$route.params.id
      // console.log(this.id)
      const res = await fetch('/getUserById', {
        method: 'POST',
        body: JSON.stringify({
          user_id: this.id
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      const { data } = await res.json()
      console.log(data)
      this.profilePageNickname = data.nickname
    } 
  }
}
</script>
<style scoped>
.profile-info {
  margin: 0 auto;
  min-height: 412px;
  position: relative;
  background-color: #fff;
}
.user-bgimage img{
  width: 100%;
  height: 240px;
  object-fit: cover;
}
.user-info {
  height: 148px;
  width: 100%;
  position: absolute;
  top: 240px;
}

.user-avator {
  width: 168px;
  height: 168px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  position: absolute;
  left: 20px;
  bottom: 0px; 
}
.user-avator img {
  width: 160px;
  height: 160px;
}

.user-detail {
  display: flex;
  margin-left: 180px;
}
.user-nickname {
  font-size: 26px;
  font-weight: 600;
}
.detail-main {
  display: flex;
  width: 750px;
  padding: 16px 0 0 32px;
}
.detail-main .btns {
  position: absolute;
  right: 20px;
  bottom: 0;
}
</style>