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
  name: 'index',
  data () {
    return {
      currentPage4: 1,
      limit: 10,
      total: 100,
      imgsArr: [],
      group: 0
    }
  },
  components: {
    vueWaterfallEasy
  },
  methods: {
    getData () {
      axios.get('/v1/wanHGImg/selectImgByPage?pageNum=' + this.currentPage4 + '&pageSize=' + this.limit).then((response) => {
        if (response.status === 200) {
          let items = response.data.list
          let arr = []
          for (var i = 0; i < items.length; i++) {
            let title = items[i].title
            let src = 'http://img.nichuiniu.cn/images/' + items[i].category + '/' + items[i].num + '/1.webp'
            let href = 'wanhg/imgnum/' + items[i].id
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
      axios.get('/v1/wanHGImg/selectImgByPage?pageNum=' + this.currentPage4 + '&pageSize=' + this.limit).then((response) => {
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
    top:50px;
    bottom:0;
    width:100%;
    overflow:hidden;
    clear:both;
  }
</style>
