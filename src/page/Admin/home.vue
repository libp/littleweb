<template>
  <div>
    <head-top></head-top>
    <section class="data_section">
      <header class="section_title">数据统计</header>
      <el-row :gutter="20" style="margin-bottom: 10px;">
        <el-col :span="4"><div class="data_list today_head"><span class="data_num head">精品文章：</span></div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num">{{articleCount}}</span> 篇</div></el-col>
        <el-col :span="4"><div class="data_list">已推荐<span class="data_num">{{recommendCount}} 篇</span></div></el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import headTop from '/components/headTop'
import axios from 'axios'
export default {
  data () {
    return {
      articleCount: 1,
      recommendCount: 1
    }
  },
  components: {
    headTop
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      function selectArticleCount () {
        return axios.get('/v1/article/selectArticleCount')
      }
      function selectRecommendArticleCount () {
        return axios.get('/v1/article/selectRecommendArticleCount')
      }
      axios.all([selectArticleCount(), selectRecommendArticleCount()]).then(
        axios.spread(function (acct, perms) {
          console.log('User', acct.data)
          console.log('Repositories', perms.data)
          this.articleCount = acct.data
          // if (acct.status === 200 && perms.status === 200) {
          //   this.articleCount = acct.data
          //   this.recommendCount = perms.data
          // }
        })
      )
    }
  }
}
</script>

<style lang="less">
</style>
