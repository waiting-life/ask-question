<template>
  <div class="profile">
    <profile-header class="profile-header" />
    <profile-info class="profile-info" />
    <div class="profile-about">
     <div class="profile-about-left">
        <tag-header />
        <router-view />
     </div>
     <div class="profile-about-right">
       lallala1
     </div>
    </div>
  </div>
</template>
<script>
import TagHeader from 'components/common/TagHeader'
import ProfileHeader from 'components/headers/ProfileHeader'
import ProfileInfo from 'components/ProfileInfo'
export default {
  components: { 
    TagHeader,
    ProfileHeader,
    ProfileInfo, 
  },
  data() {
    return {
     
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style scoped>
.profile-header {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 10;
    box-shadow: 0 1px 3px rgba(18,18,18,.1);
    background-color: #fff;
  }
  .profile-info {
    width: 960px;
    margin: 70px auto 0;
  }
  .profile-about {
    margin: 0 auto;
    width: 960px;
    display: flex;
    box-shadow: 0 1px 2px 1px rgba(18,18,18,.1);
    color: #121212;
    margin-top: 10px;
  }
  .profile-about-left {
    background-color: #fff;
    padding: 0 10px;
    margin-right: 10px;
    width: 620px;
  }
  .profile-about-right {
    background-color: #fff;
    flex: 1;
    padding: 10px;
  }
</style>