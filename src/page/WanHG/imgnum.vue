<template>
  <div class="content">
    <p>{{title}}</p>
    <vue-waterfall-easy :imgsArr="imgsArr" ref="waterfall" @scrollReachBottom="getMore" reachBottomDistance="100">
      <div slot="waterfall-over">waterfall-over</div>
    </vue-waterfall-easy>
  </div>
</template>

<script>
import axios from 'axios'
import { Loading } from 'element-ui'
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
  name: 'imgnum',
  data () {
    return {
      category: '',
      description: '',
      imgcount: '',
      num: '',
      tag: '',
      title: '',
      imgsArr: [],
      showpicnum: 10
    }
  },
  components: {
    vueWaterfallEasy
  },
  methods: {
    getImageById () {
      let loadingInstance = Loading.service({ fullscreen: true, text: '加载中' })
      axios.get('/v1/wanHGImg/getImageById?id=' + this.$route.params.id).then((response) => {
        if (response.status === 200) {
          this.title = response.data.title
          this.category = response.data.category
          this.num = response.data.num
          this.imgcount = response.data.imgcount
          this.getMore()
          loadingInstance.close()
        }
      }).catch(function (err) {
        console.error(err)
      })
    },
    getMore () {
      let arr = []
      let i = this.showpicnum - 9
      if (this.showpicnum > this.imgcount) {
        this.showpicnum = this.imgcount
      }
      for (i; i <= this.showpicnum; i++) {
        let src = 'http://img.nichuiniu.cn/images/' + this.category + '/' + this.num + '/' + i + '.webp'
        arr.push({src: src})
      }
      this.imgsArr = this.imgsArr.concat(arr)
      if (this.showpicnum === this.imgcount) {
        this.$refs.waterfall.waterfallOver()
        return
      }
      this.showpicnum += 10
    }
  },
  mounted () {
  },
  created () {
    this.getImageById()
  },
  beforeMount () {
  }
}
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .content {
    position: absolute;
    top:50px;
    bottom:0;
    width:100%;
    overflow:hidden;
  }
  .content p{margin-left: 100px;}
</style>
