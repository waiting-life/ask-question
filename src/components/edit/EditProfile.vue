<template>
  <div class="edit-profile">
    <el-form :model="editInfo" status-icon ref="editInfo" label-width="100px" class="demo-editInfo">
      <el-form-item label="昵称" prop="nickname">
        <el-input type="text" v-model="editInfo.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="editInfo.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="editInfo.birthday" style="width: 100%;"></el-date-picker>
      </el-col>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio v-model="editInfo.gender" :label="1">男</el-radio>
        <el-radio v-model="editInfo.gender" :label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="签名" prop="signature">
        <el-input v-model="editInfo.signature"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editProfile(editInfo)">提交修改</el-button>
        <el-button @click="cancelEdit">取消修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      // editInfo: {
      //   password: '',
      //   date: '',
      //   gender: '',
      //   signature: '',
      //   nickname: ''
      // },
      editInfo: {},
    };
  },
  created() {
    this.getUserInfo()
    // this.otherData.userId = this.userInfo.user_id
    // console.log(this.otherData.userId)
  },
  computed: {
    ...mapState(['userInfo'])
  },
  updated() {
    console.log(this.editInfo)
  },
  methods: {
    async getUserInfo() {
      const res = await fetch('/getUserById', {
        method: 'POST',
        body: JSON.stringify({
          user_id: this.userInfo.user_id
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      const result = await res.json()
      this.editInfo = result.data
    },
    async editProfile(editInfo) {
      this.$refs.upload.submit()
      try {
        const res = await fetch('/editProfile', {
          method: 'POST',
          body: JSON.stringify(editInfo),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
        const { data } = await res.json()
        if(data.ok === 1) {
          this.$store.commit('updateUserInfo', this.editInfo)
          this.cancelEdit()
          this.$message.success('修改成功')
        }
      } catch  {
        this.$message.error('修改出错，请稍后再修改')
      }
    },
    cancelEdit() {
      this.$emit('cancelEdit')
    }
  }
}
</script>
