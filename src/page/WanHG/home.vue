<template>
  <div class="wrap">
    <div class="TypeList">
      <ul>
        <li v-for="item in items">
          <!--<a :href="'imgnum/'+item.id" class="TypeBigPics" target="_blank">-->
          <router-link :to="{ name: 'imgnum', params: { id: item.id }}" target="_blank">
            <img :src="'http://img.nichuiniu.cn/images/'+item.category+'/'+item.num+'/1.webp'" width="180" height="270">
            <span>{{item.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Loading } from 'element-ui'
export default {
  name: 'index',
  data () {
    return {
      items: [],
      currentPage4: 1,
      limit: 10,
      total: 100
    }
  },
  created () {
  },
  methods: {
    initData () {
      let loadingInstance = Loading.service({ target: '.content-area', text: '加载中' })
      axios.get('/v1/wanHGImg/selectImgByPage?pageNum=' + this.currentPage4 + '&pageSize=' + this.limit).then((response) => {
        if (response.status === 200) {
          console.info(response)
          this.items = response.data.list
          this.total = response.data.total
          loadingInstance.close()
        }
      }).catch(function (err) {
        console.error(err)
      })
    },
    getPages () {
      let loadingInstance = Loading.service({fullscreen: true, text: '加载中'})
      axios.get('/v1/wanHGImg/selectImgByPage?pageNum=' + this.currentPage4 + '&pageSize=' + this.limit).then((response) => {
        if (response.status === 200) {
          this.tableData = response.data.list
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
    this.initData()
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
