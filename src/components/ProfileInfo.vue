<template>
  <div>
    <div class="profile-info">
      <div class="user-bgimage">
        <img src="~assets/image/defaultBg.jpg" alt="">
      </div>
      <div class="user-info">
        <div class="user-detail">
          <div class="user-avator">
            <el-upload
              class="avatar-uploader"
              action="/updateAvatar"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :data="userInfo"
              v-if="samePeople"
              >
              <img :src="userInfo.avatarUrl" class="avatar">
              <div class="mask">修改我的头像</div>
            </el-upload>
            <img v-else :src="imageUrl" class="avatar">
          </div>
          <div class="detail-main">
            <div class="user">
              <div v-if="samePeople">
                <span class="user-nickname">{{ userInfo.nickname }}</span>
                <p class="user-signature">{{ userInfo.signature }}</p>
              </div>
              <span v-else>
                <span class="user-nickname">{{ profilePageNickname }}</span>
                <p class="user-signature">{{ signature }}</p>
              </span>
              
            </div>      
            <div class="btns" v-if="!samePeople">
              <el-button type="primary">
                <i class="el-icon-plus"></i>
                关注他
              </el-button>
              <el-button type="plain">
                <i class="el-icon-chat-round"></i>
                发私信
              </el-button>
            </div>
            <el-button type="primary" 
              @click="showEditBox" 
              class="btns" 
              v-if="samePeople">
              <i class="el-icon-edit"></i>
              编辑资料
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <edit-profile v-if="editBoxVisible" class="edit-profile" @cancelEdit="cancelEdit"/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import EditProfile from 'components/edit/EditProfile.vue'
export default {
  components: {
    EditProfile
  },
  data() {
    return {
      editBoxVisible: false,
      profilePageNickname: '',
      signature: '',
      user_id: '',
      imageUrl: ''
    }
  },
  computed: {
    ...mapState(['userInfo']),
    samePeople() {
      return this.userInfo.user_id === this.user_id
    }
  },
  created() {
    this.getUserById()
  },
  methods: {
    async getUserById() {
      this.user_id = this.$route.params.id
      const { data } = await fetch('/getUserById', {
        method: 'POST',
        body: JSON.stringify({
          user_id: this.user_id
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(res => res.json())
      this.profilePageNickname = data.nickname
      this.signature = data.signature
      this.imageUrl = data.avatarUrl
    },

    showEditBox() {
      this.editBoxVisible = true
    },
    cancelEdit() {
      this.editBoxVisible = false
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file)
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
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
  position: absolute;
  left: 4px;
  top: 4px;
  width: 160px;
  height: 160px;
}
.mask {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 160px;
  height: 160px;
  z-index: 2;
  opacity: 0;
  background-color: rgba(0, 0, 0, .3);
  color: #ddd;
  font-weight: 700;
  font-size: 14px;
  transition: all .5s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* pointer-events: none; */
}
.user-avator:hover .mask {
  opacity: 1;
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

.edit-profile {
  padding: 0 20px 10px 0;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 160px;
  height: 160px;
  line-height: 160px;
  text-align: center;
}
.avatar {
  width: 160px;
  height: 160px;
  display: block;
}



</style>