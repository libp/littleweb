<template>
  <div>
    <div class="middle">
      <div class="content-area" v-cloak>
        <header class="entry-header">
          <h1 id="title" class="entry-title">{{title}}</h1>
          <p class="article_author"><span>{{author}}</span>·<span>{{dynasty}}</span></p>
        </header>
        <div class="entry-content" v-html="article">
        </div>
        <div class="mp3" v-show="ishow">
          <audio style=" cursor:pointer; float:left; margin-left:20px; width:450px;"
          :src="audiourl" :id="id"
          controls="controls" autoplay="" controlslist="nodownload"></audio>
        </div>
      </div>
      <div class="comments">
        <div class="random_box">
          <a href="#title" class="random_article"
           @click="getRandomContent()">猜你喜欢</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Loading } from 'element-ui'
export default {
  name: 'home',
  data () {
    return {
      article: '',
      title: '',
      dynasty: '',
      author: '',
      ishow: true,
      id: '',
      audiourl: ''
    }
  },
  created () {
  },
  methods: {
    getRecommendContent () {
      let loadingInstance = Loading.service({ target: '.content-area', text: '加载中' })
      axios.get('/v1/gushiwen/selectByPrimaryKey?id=' + this.$route.params.id).then((response) => {
        if (response.status === 200) {
          this.setCont(response)
          loadingInstance.close()
        }
      }).catch(function (err) {
        console.error(err)
      })
    },
    getRandomContent () {
      let loadingInstance = Loading.service({ fullscreen: true, text: '加载中' })
      document.getElementById(this.id).pause()
      axios.get('/v1/gushiwen/selectByRandom').then((response) => {
        if (response.status === 200) {
          this.setCont(response)
          loadingInstance.close()
        }
      }).catch(function (err) {
        console.error(err)
      })
    },
    setCont (response) {
      this.title = response.data.title
      this.author = response.data.author
      this.article = response.data.content
      this.dynasty = response.data.dynasty
      if (response.data.audiourl == null || response.data.audiourl === '') {
        this.ishow = false
      } else {
        this.ishow = true
        this.id = response.data.audiourl
        this.audiourl = 'https://www.nichuiniu.cn/mp3/' + response.data.audiourl
      }
    }
  },
  mounted () {
    this.getRecommendContent()
  },
  beforeMount () {
  }
}
</script>

<style scoped>
  .middle{
    margin:0 auto;
    overflow:hidden;
    padding:60px 0 0;
    width:100%
  }
  .entry-header{
    padding:0
  }
  .entry-title{
    font-size:32px;
    font-weight:normal;
    line-height:1.2;
    margin:0;
    text-align: center;
    padding:50px 72px 0 72px;
    position:relative;
    word-break:normal
  }
  .entry-content{
    padding:0 30px 0 30px
  }
  .content-area{
    width: 700px;
    background:#fff;
    margin:0 auto;
    padding:0 0 30px 0;
  }
  .comments{
    margin:0 auto 50px auto;
    width: 700px;
    background:#fff;
  }
  .random_box{
    display: inline-block;
    margin: 15px 0 35px;
    padding: 30px 0 0;
    text-align: center;
    width: 100%;
  }
  .random_article{
    text-decoration:none;
    background-color: #FFB94B;
    border-color: #D69E31 #E3A037 #D5982D;
    border-radius: 3px 3px 3px 3px;
    border-style: solid;
    border-width: 1px;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.3) inset;
    color: #8F5A0A;
    cursor: pointer;
    font: bold 15px Arial,Helvetica;
    padding: 5px 15px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  }
  .article_author {
    color: #999999 !important;
    margin: 40px 0 50px 0;
    text-align: center;
  }
  .mp3{
    margin: 1rem 0 0 1rem;
  }
</style>
