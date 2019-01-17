<template>
  <div>
    <div class="middle">
      <div class="content-area" v-cloak>
        <header class="entry-header">
          <h1 id="title" class="entry-title">{{title}}</h1>
          <p class="article_author"><span>{{author}}</span></p>
        </header>
        <div class="entry-content" v-html="article">
        </div>
      </div>
      <div class="comments">
        <div class="random_box">
          <router-link to="/random" class="random_article">开始阅读</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      article: '<p>时间是最好的过滤器，告诉我们什么才是精华</p>' +
      '<p>拒绝一目十行</p>' +
      '<p>拒绝花销的样式</p>' +
      '<p>化繁为简</p>' +
      '<p>静下心来</p>' +
      '<p>享受简单纯粹的阅读时光</p>' +
      '<p>联系我：924701358@qq.com</p>',
      title: '关于值得读',
      author: '值得读'
    }
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
</style>
