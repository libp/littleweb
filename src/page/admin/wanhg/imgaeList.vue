<template>
  <div>
    <head-top></head-top>
    <div class="table_container">
      <el-select v-model="category" clearable placeholder="请选择" @change="handleCategoryChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-table
        :data="tableData"
        highlight-current-row
        style="width: 100%" :cell-style="cell">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          property="id"
          label="Id"
          width="80">
        </el-table-column>
        <el-table-column
          property="num"
          label="编号"
          width="160">
        </el-table-column>
        <el-table-column
          property="title"
          label="标题"
          width="400">
        </el-table-column>
        <el-table-column
          property="tag"
          label="标签"
          width="150">
        </el-table-column>
        <el-table-column
          property="operate"
          label="操作">
          <template slot-scope="scope">
            <router-link :to="{ name: 'imgnum', params: { id: scope.row.id }}" target="_blank">
              <el-button size="mini"><i class="el-icon-view"></i></el-button>
            </router-link>
            <el-button
              size="mini"
              type="success"
              @click="handleRecommend(scope.$index, scope.row)"><i class="el-icon-success"></i></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <footer-admin></footer-admin>
  </div>
</template>

<script>
import axios from 'axios'
import { Loading } from 'element-ui'
import headTop from '/components/headTop'
import footerAdmin from '/components/footerAdmin'
export default {
  name: 'index',
  data () {
    return {
      tableData: [],
      currentPage4: 1,
      limit: 10,
      total: 100,
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
    getPages () {
      let loadingInstance = Loading.service({fullscreen: true, text: '加载中'})
      axios.get('/v1/wanHGImg/selectImgByPage?category=' + this.category + '&pageNum=' + this.currentPage4 + '&pageSize=' + this.limit).then((response) => {
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
    },
    handleCategoryChange () {
      this.currentPage4 = 1
      this.getPages()
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete('/v1/wanHGImg/deleteRecommendById?id=' + row.id).then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              type: 'success',
              message: response.data.message
            })
            this.tableData.splice(index, 1)
          }
        }).catch(function (err) {
          console.error(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted () {
    this.getPages()
  },
  beforeMount () {
  }
}
</script>

<style scoped>
</style>
