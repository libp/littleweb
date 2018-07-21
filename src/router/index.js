import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('/page/index.vue')
const Home = () => import('/page/Home/home.vue')
const Random = () => import('/page/Home/random.vue')
const About = () => import('/page/Home/about.vue')
const Num = () => import('/page/Home/num.vue')

const Nav = () => import('/page/ProgrammerNav/Nav.vue')
const Admin = () => import('/page/Admin/index.vue')
const Adminhome = () => import('/page/Admin/home.vue')
const ArticleList = () => import('/page/Admin/articlelist.vue')
const RecommendList = () => import('/page/Admin/recommendList.vue')

const ImageList = () => import('/page/Admin/imgaeList.vue')
const WanHgIndex = () => import('/page/Wanhg/index.vue')
const Imghome = () => import('/page/Wanhg/home.vue')
const ImgNum = () => import('/page/Wanhg/imgnum.vue')

Vue.use(Router)

const scrollBehavior = function (to, from, savedPosition) {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}

    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash

      // specify offset of the element
      if (to.hash === '.title') {
        position.offset = { y: 100 }
      }

      if (document.querySelector(to.hash)) {
        return position
      }

      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return false
    }
  }
}

export default new Router({
  mode: 'history',
  scrollBehavior,
  routes: [
    {
      path: '/',
      component: Index,
      name: 'index',
      redirect: '/home',
      children: [
        {path: 'home', component: Home},
        {path: 'random', component: Random, meta: { scrollToTop: true }},
        {path: 'about', component: About, meta: { scrollToTop: true }},
        {path: 'num/:id', name: 'num', component: Num, meta: { scrollToTop: true }}
      ]
    },
    {
      path: '/nav',
      component: Nav
    },
    {
      path: '/wanhg',
      component: WanHgIndex,
      children: [
        {path: '/', component: Imghome},
        {path: 'imgnum/:id', name: 'imgnum', component: ImgNum, meta: { scrollToTop: true }}
      ]
    },
    {
      path: '/nav',
      component: Nav
    },
    {
      path: '/dasheng',
      component: Admin,
      children: [
        {path: '/', component: Adminhome},
        {path: '/articleList', component: ArticleList, meta: ['文章管理', '文章列表']},
        {path: '/recommendList', component: RecommendList, meta: ['文章管理', '文章列表']},
        {path: '/imgaeList', component: ImageList, meta: ['图片管理', '图片列表']}
      ]
    }
    // {
    //   path: '*',
    //   redirect: '/home'
    // }
  ]
})
