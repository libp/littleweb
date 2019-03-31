<template>
  <div>
    <el-container>
        <el-header>程序员网址导航</el-header>
        <el-main>
          <div class="main" >
            <div v-for="(urls) in urlList" v-bind:key="urls.id">
              <div class="url_title"><span>&nbsp;&nbsp;{{ urls.title }}</span></div>
              <ul class="url_list">
                <li v-for="(item) in urls.lists" v-bind:key="item.id" class="url_item">
                  <a :href=item.url target="_blank" :title=item.title> {{ item.name }} </a>
                </li>
              </ul>
            </div>
          </div>
        </el-main>
        <el-footer>Copyright ©2018~2019</el-footer>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import { Loading } from 'element-ui'
export default {
  data () {
    return {
      urlList: []
    }
  },
  created () {
    this.getUrlList()
  },
  methods: {
    getUrlList () {
      let loadingInstance = Loading.service({ fullscreen: true, text: '加载中' })
      let t = Math.random()
      let url = 'urllist.json'
      axios.get('static/' + url + '?t=' + t).then((response) => {
        if (response.status === 200) {
          this.urlList = response.data.params
          console.log(response.data.params)
          loadingInstance.close()
        }
      }).catch(function (err) {
        console.error(err)
      })
    }
  },
  mounted () {
  },
  beforeMount () {
  }
}
</script>

<style scoped>
  .el-container{
    font-size: 14px;
  }
  .el-header {
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .el-footer {
    line-height: 60px;
    text-align: center;
  }
  .el-main {
    background-color: #FFFFFF;
  }
  .info{
    margin-bottom: 2rem;
  }
  .main{
    width: 60rem;
    height: auto;
    margin: 0 auto;
    border: 1px solid #F4F4F5;
    background: #FFFFFF;
  }
  .url_title{
    width: 60rem;
    height: 2rem;
    background-color: #F4F4F5;
  }
   .url_title span{
    padding: 7px;
    float: left;
    font-weight: bold;
  }
  .url_list{
    width: 60rem;
    height: auto;
    margin: 1rem 0;
  }
  .url_item{
      margin-left: 1rem;
      margin-right: 2rem;
      /* width: 7rem; */
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow:hidden;
      display:inline-block;
  }
</style>
