<template>
  <div>
    <head-top></head-top>
    <div class="dashboard-editor-container">
      <el-row class="panel-group" :gutter="20">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class='card-panel'>
            <div class="card-panel-icon-wrapper icon-people">
              <img src="../../assets/count.svg">
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">文章</div>
              <span class="card-panel-num">{{articleCount}} 篇</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-message">
              <img src="../../assets/nice.svg">
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">已推荐</div>
              <span class="card-panel-num">{{recommendCount}} 篇</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
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
      axios.all([selectArticleCount(), selectRecommendArticleCount()])
        .then(axios.spread((acct, perms) => {
          if (acct.status === 200) {
            this.articleCount = acct.data
            this.recommendCount = perms.data
          }
        }))
    }
  }
}
</script>

<style lang="less">
  .dashboard-editor-container {
    padding: 32px;
    background-color: #fff;
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  .panel-group {
    margin-top: 18px;
    .card-panel-col {
      margin-bottom: 32px;
    }
    .card-panel {
      height: 124px;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
</style>
