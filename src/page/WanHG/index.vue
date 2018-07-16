<template>
  <div>
    <img src="http://img.nichuiniu.cn/images/rihan/93851/1.webp">
  </div>
</template>

<script>
import axios from 'axios'
import { Loading } from 'element-ui'
export default {
  name: 'index',
  data () {
    return {
      tableData: [],
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
      axios.get('/v1/wanHGImg/selectImgByPage').then((response) => {
        if (response.status === 200) {
          console.info(response)
          this.tableData = response.data.list
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
</style>
