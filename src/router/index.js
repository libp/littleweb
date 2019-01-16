import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('/page/index.vue')
const Home = () => import('/page/Home/home.vue')
const Random = () => import('/page/Home/random.vue')
const About = () => import('/page/Home/about.vue')
const Num = () => import('/page/Home/num.vue')

const Nav = () => import('/page/ProgrammerNav/nav.vue')
const Admin = () => import('/page/admin/index.vue')
const Adminhome = () => import('/page/admin/home.vue')

const ArticleList = () => import('/page/admin/zhidedudu/articleList.vue')
const RecommendList = () => import('/page/admin/zhidedudu/recommendList.vue')

const ImgaeTags = () => import('/page/admin/wanhg/imgaeTags.vue')
const ImageList = () => import('/page/admin/wanhg/imgaeList.vue')
const ImagePreview = () => import('/page/admin/wanhg/imgaePreview.vue')

const Gushiwen = () => import('/page/admin/gushiwen/list.vue')
const RecommendGushiwen = () => import('/page/admin/gushiwen/recommend.vue')

const SysParams = () => import('/page/admin/sysParams.vue')

const WanHgIndex = () => import('/page/WanHG/index.vue')
const Imghome = () => import('/page/WanHG/home.vue')
const ImgNum = () => import('/page/WanHG/imgnum.vue')
const TagsList = () => import('/page/WanHG/tagsList.vue')

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
        {path: ':type', name: 'wanhg', component: Imghome, meta: { scrollToTop: true }},
        {path: 'imgnum/:id', name: 'imgnum', component: ImgNum, meta: { scrollToTop: true }},
        {path: 'tags/:id', name: 'tags', component: TagsList, meta: { scrollToTop: true }}
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
        {path: '/recommendList', component: RecommendList, meta: ['文章管理', '已推荐']},
        {path: '/imgaeList', component: ImageList, meta: ['图片管理', '图片列表']},
        {path: '/imagePreview', component: ImagePreview, meta: ['图片管理', '图片预览']},
        {path: '/imgaeTags', component: ImgaeTags, meta: ['图片管理', '图片标签']},
        {path: '/gushiwen', component: Gushiwen, meta: ['古诗文管理', '古诗文列表']},
        {path: '/recommend', component: RecommendGushiwen, meta: ['古诗文管理', '已推荐']},
        {path: '/sysParams', component: SysParams, meta: ['系统管理', '参数管理']}
      ]
    }
    // {
    //   path: '*',
    //   redirect: '/home'
    // }
  ]
})
