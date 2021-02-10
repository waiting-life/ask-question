import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/Login')
const Home = () => import('views/Home')
// const Register = () => import('views/Register')
const Profile = () => import('views/Profile')
const Setting = () => import('views/Setting')
const VipPage = () => import('views/mainPage/VipPage')
const ExplorePage = () => import('views/mainPage/ExplorePage')
const WaitingAnswerPage = () => import('views/mainPage/WaitingAnswerPage')
//  Home 部分
const HomeMessage = () => import('views/mainPage/HomeMessage')
// profile部分
const ProfileDynamic = () => import('components/profile/ProfileDynamic')
const ProfileAnswer = () => import('components/profile/ProfileAnswer')
const ProfileVideo = () => import('components/profile/ProfileVideo')
const ProfileAsk = () => import('components/profile/ProfileAsk')
const ProfilePost = () => import('components/profile/ProfilePost')
const ProfileColumn = () => import('components/profile/ProfileColumn')
const ProfilePin = () => import('components/profile/ProfilePin')
const ProfileCollection = () => import('components/profile/ProfileCollection')
const ProfileFollowing = () => import('components/profile/ProfileFollowing')

// 回答组件
const Answers = () => import('views/AnswerDetail')
// const AnswersContent = () => import('components/answerChild/AnswersContent')
Vue.use(VueRouter)
// vuerouter更新后出现得问题  解决方法 https://my.oschina.net/u/4390738/blog/4547080
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: {name: 'home'},
    component: Home,
    beforeEnter: (to, from, next) => {
      const cookie = document.cookie.split('=')[1]
      if (cookie) {  
        next()
      } else {
        next('/login')
      }
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: HomeMessage
      },
      {
        path: 'vip',
        name: 'vip',
        component: VipPage
      },
      {
        path: 'explore',
        name: 'explore',
        component: ExplorePage
      },
      {
        path: 'waiting',
        name: 'waiting',
        component: WaitingAnswerPage
      },
    ]
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: Profile,
    redirect: {name: 'dynamics'},
    children: [
      {
        path:'dynamics',
        name: 'dynamics',
        component: ProfileDynamic
      },
      {
        path:'answers',
        name: 'answers',
        component: ProfileAnswer
      },
      {
        path:'videos',
        name: 'videos',
        component: ProfileVideo
      },
      {
        path:'asks',
        name: 'asks',
        component: ProfileAsk
      },
      {
        path:'posts',
        name: 'posts',
        component: ProfilePost
      },
      {
        path:'columns',
        name: 'columns',
        component: ProfileColumn
      },
      {
        path:'pins',
        name: 'pins',
        component: ProfilePin
      },
      {
        path:'collections',
        name: 'collections',
        component: ProfileCollection
      },
      {
        path:'following',
        name: 'following',
        component: ProfileFollowing
      },
    ]
  },
  {
    path: '/answers/:id',
    name: 'answers',
    component: Answers,
    // children: [
    //   {
    //     path: '/answers',
    //     component: AnswersContent
    //   }
    // ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
