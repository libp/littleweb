<template>
  <div class="wrap">
    <div class="">
      <ul>
        <li v-for="n in imgcount">
            <img :src="'http://img.nichuiniu.cn/images/'+category+'/'+num+'/'+n+'.webp'">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Loading } from 'element-ui'
export default {
  name: 'imgnum',
  data () {
    return {
      category: '',
      description: '',
      id: '',
      imgcount: '',
      num: '',
      tag: '',
      title: ''
    }
  },
  created () {
  },
  methods: {
    getImageById () {
      let loadingInstance = Loading.service({ fullscreen: true, text: '加载中' })
      console.info(this.$route.params.id)
      axios.get('/v1/wanHGImg/getImageById?id=' + this.$route.params.id).then((response) => {
        if (response.status === 200) {
          this.category = response.data.category
          this.description = response.data.description
          this.id = response.data.id
          this.imgcount = response.data.imgcount
          this.num = response.data.num
          this.tag = response.data.tag
          this.title = response.data.title
          console.info(response.data)
          loadingInstance.close()
        }
      }).catch(function (err) {
        console.error(err)
      })
    },
    getRandomContent () {
      let loadingInstance = Loading.service({ fullscreen: true, text: '加载中' })
      axios.get('/v1/article/random').then((response) => {
        if (response.status === 200) {
          this.title = response.data.title
          this.author = response.data.author
          this.article = response.data.content
          loadingInstance.close()
        }
      }).catch(function (err) {
        console.error(err)
      })
    }
  },
  mounted () {
    this.getImageById()
  },
  beforeMount () {
  }
}
</script>

<style scoped>
  .wrap {width:1180px; max-width:1180px; margin:0 auto;}
  .TypeList,.TypeList_2 {width:100%;overflow:hidden}
  .TypeList ul,.relax-arc ul,.TypeList_2 ul {width:105%}
  .TypeList li,.relax-arc li,.TypeList_2 li {float:left;width:180px;margin:0 20px 20px 0}
  .TypeBigPics {width:180px;overflow:hidden;position:relative;display:block}
  .TypeBigPics span {display:block;width:94%;height:22px;line-height:22px;overflow:hidden;padding:2px 3%;font-size:14px;background:#fff}
  .ListTit {display:block;width:96%;line-height:21px;overflow:hidden;word-wrap:break-word;word-break:break-all;padding:15px 2% 5px 2%;font-size:14px;position:absolute;left:0px;bottom:-80px;color:#fff}
  .TypePicInfos {width:94%;padding:0 3%;background:#FFF}
  .TypePicTags {padding:3px 0 3px 30px;height:20px;line-height:20px;overflow:hidden}
  .TypePicTags a {display:block;float:left;white-space:nowrap;padding-right:10px;height:20px;font-size:12px}
  .tag-list-oh li {height:300px;overflow:hidden}
</style>
