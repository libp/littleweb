<template>
  <div >
    <head-top></head-top>
    <div class="table_container">
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
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          property="title"
          label="标题"
          width="200">
        </el-table-column>
        <el-table-column
          property="author"
          label="作者"
          width="150">
        </el-table-column>
        <el-table-column
          property="createtime"
          label="推荐时间"
          :formatter="dateFormat"
          width="150">
        </el-table-column>
        <el-table-column
          property="operate"
          label="操作">
          <template slot-scope="scope">
            <router-link :to="{ name: 'num', params: { id: scope.row.id }}" target="_blank">
              <el-button size="mini"><i class="el-icon-view"></i></el-button>
            </router-link>
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
  </div>
</template>

<script>
import headTop from '/components/headTop'
import axios from 'axios'
import { Loading } from 'element-ui'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      tableData: [],
      currentPage4: 1,
      limit: 10,
      total: 100
    }
  },
  activated () {
    this.initData()
  },
  components: {
    headTop
  },
  methods: {
    initData () {
      let loadingInstance = Loading.service({fullscreen: true, text: '加载中'})
      axios.get('/v1/article/selectRecommendByPage?pageNum=' + this.currentPage4 + '&pageSize=' + this.limit).then((response) => {
        if (response.status === 200) {
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
      axios.get('/v1/article/selectRecommendByPage?pageNum=' + this.currentPage4 + '&pageSize=' + this.limit).then((response) => {
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
    cell ({row, column, rowIndex, columnIndex}) {
      return 'padding:4px 0'
    },
    handleRecommend (index, row) {
      axios.get('/v1/article/insertRecommend?id=' + row.id).then((response) => {
        if (response.status === 200) {
          this.$message({
            showClose: true,
            type: 'success',
            message: response.data.message
          })
        }
      }).catch(function (err) {
        console.error(err)
      })
    },
    handlePre (index, row) {
      this.$router.push({
        path: 'nav',
        name: '',
        params: {
          name: 'name',
          dataObj: this.msg
        }
      })
    },
    dateFormat (row, column) {
      let date = row[column.property]
      return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete('/v1/article/deleteRecommendById?id=' + row.id).then((response) => {
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
  }
}
</script>

<style>
  .table_container{
    padding: 20px;
  }
</style>
