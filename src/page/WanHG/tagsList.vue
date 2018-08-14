<template>
  <div class="content">
    <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData">
      <div class="img-info" slot-scope="props">
        <p class="some-info">{{props.value.info}}</p>
      </div>
    </vue-waterfall-easy>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Loading } from 'element-ui'
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
  name: 'tagList',
  data () {
    return {
      currentPage4: 1,
      limit: 10,
      total: 100,
      imgsArr: [],
      group: 0,
      tagid: 10
    }
  },
  components: {
    vueWaterfallEasy
  },
  methods: {
    getData () {
      if (this.$route.params.id != null) {
        this.tagid = this.$route.params.id
      } else {
        console.log('default is cn')
      }
      axios.get('/v1/wanHGImg/getImgByTagID?pageNum=' + this.currentPage4 +
        '&pageSize=' + this.limit + '&tagid=' + this.tagid).then((response) => {
        if (response.status === 200) {
          let items = response.data.list
          let arr = []
          for (var i = 0; i < items.length; i++) {
            let title = items[i].title
            let src = 'https://img.nichuiniu.cn/images/' + items[i].category + '/' + items[i].num + '/1.jpg'
            let href = 'imgnum/' + items[i].id
            arr.push({src: src, href: href, info: title})
          }
          this.imgsArr = this.imgsArr.concat(arr)
          this.currentPage4++
        }
      }).catch(function (err) {
        console.error(err)
      })
    },
    getPages () {
      let loadingInstance = Loading.service({fullscreen: true, text: '加载中'})
      console.log(this.$route.params.id)
      axios.request('https://www.nichuiniu.cn/v1/wanHGImg/getImgByTagID?pageNum=' + this.currentPage4 +
        '&pageSize=' + this.limit + '&tagid=' + this.tagid).then((response) => {
        if (response.status === 200) {
          this.items = response.data.list
          this.total = response.data.total
          loadingInstance.close()
        }
      }).catch(function (err) {
        console.error(err)
      })
    },
    handleSizeChange (val) {
      this.limit = val
    },
    handleCurrentChange (val) {
      this.currentPage4 = val
      this.getPages()
    }
  },
  mounted () {
  },
  created () {
    this.getData()
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
    top:100px;
    bottom:0;
    width:100%;
    overflow:hidden;
    clear:both;
  }
</style>
