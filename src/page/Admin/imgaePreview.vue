<template>
  <div>
    <head-top></head-top>
    <div class="table_container">
      <div class="select_type">
        <el-select v-model="category" clearable placeholder="请选择" @change="handleCategoryChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-checkbox v-model="checked3" label="最火" @change="selectImgByScores()" border></el-checkbox>
      </div>
      <div class="img_box">
        <div v-for="(item) in imgsArr" :key="item.id"  class="img_pre">
          <div class="img_pic">
            <router-link :to="{ name: 'imgnum', params: { id: item.id }}" target="_blank">
              <!-- <img :src="item.src" ref="img" class="img_size" @load="_loadimg()"/> -->
              <img :src="item.src" ref="img" class="img_size"/>
            </router-link>
          </div>
          <div class="img_oper">
            <router-link :to="{ name: 'imgnum', params: { id: item.id }}" target="_blank">
              <el-button size="mini"><i class="el-icon-view"></i></el-button>
            </router-link>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(item.id)"><i class="el-icon-delete"></i></el-button>
          </div>
        </div>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 50, 100]"
          :page-size="50"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <footer-admin></footer-admin>
  </div>
</template>

<script>
import axios from 'axios'
import headTop from '/components/headTop'
import footerAdmin from '/components/footerAdmin'
export default {
  name: 'index',
  data () {
    return {
      tableData: [],
      currentPage4: 1,
      imgsArr: [],
      limit: 50,
      total: 100,
      url: '/v1/wanHGImg/selectImgByPage?category=',
      options: [{
        value: 'rihan',
        label: '日韩'
      }, {
        value: 'cn',
        label: '国内'
      }, {
        value: 'gangtai',
        label: '港台'
      }, {
        value: 'xiuren_VIP',
        label: '模特'
      }],
      checked3: false,
      category: 'cn'
    }
  },
  components: {
    headTop,
    footerAdmin
  },
  created () {
  },
  methods: {
    getPages (url) {
      axios.get(url + this.currentPage4 + '&pageSize=' + this.limit).then((response) => {
        if (response.status === 200) {
          this.imgsArr = []
          let items = response.data.list
          this.total = response.data.total
          let arr = []
          for (var i = 0; i < items.length; i++) {
            let title = items[i].title
            let src = 'https://img.nichuiniu.cn/images/' + items[i].category + '/' + items[i].num + '/1.jpg'
            let href = 'imgnum/' + items[i].id
            let id = items[i].id
            arr.push({src: src, href: href, info: title, id: id})
          }
          this.imgsArr = this.imgsArr.concat(arr)
          // this.currentPage4++
          // console.log(this.imgsArr)
        }
      }).catch(function (err) {
        console.error(err)
      })
    },
    selectImgByScores () {
      if (this.checked3) {
        this.url = '/v1/wanHGImg/selectImgByScores?pageNum='
      } else {
        this.url = '/v1/wanHGImg/selectImgByPage?category=' + this.category + '&pageNum='
      }
      this.getPages(this.url)
    },
    handleSizeChange (val) {
      this.limit = val
    },
    handleCurrentChange (val) {
      this.currentPage4 = val
      this.getPages(this.url)
    },
    handleCategoryChange () {
      this.imgsArr = []
      this.currentPage4 = 1
      this.getPages(this.url)
    },
    handleDelete (id) {
      axios.delete('/v1/wanHGImg/deleteRecommendById?id=' + id).then((response) => {
        if (response.status === 200) {
          this.$message({
            showClose: true,
            type: 'success',
            message: response.data.message
          })
          this.removeImgFromHtml(id)
          // console.log(this.imgsArr)
        }
      }).catch(function (err) {
        console.error(err)
      })
    },
    removeImgFromHtml (id) {
      for (let i = 0; i < this.imgsArr.length; i++) {
        if (this.imgsArr[i].id === id) {
          this.imgsArr.splice(i, 1)
          break
        }
      }
    }
  },
  mounted () {
    this.url = this.url + this.category + '&pageNum='
    this.getPages(this.url)
  },
  beforeMount () {
  }
}
</script>

<style scoped>
.img_pic{
  width: auto;
  height: 200px;
  margin: 0.5rem;
}
.img_oper{
  width: 100px;
  height: auto;
  margin-left: 0.5rem;
}
.img_pre{
  display: inline-block;
}
.img_size{
  height: 100%;
  display: inline-block;
}
.select_type {
  width: 98%;
  padding: 0.5rem;
}
.img_box{
  width: 98%;
  padding: 0.5rem;
  overflow:auto;
}
</style>
