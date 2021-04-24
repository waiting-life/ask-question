<template>
  <div class="profile-collection">
    <h3>{{ samePeople ? '我的' : '他的' }}收藏</h3>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
   computed: {
    ...mapState(['userInfo']),
    samePeople() {
      return this.userInfo.user_id === this.$route.params.id
    }
  },
}
</script>
<style scoped>
.profile-collection h3{
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
  cursor: pointer;
}
</style>