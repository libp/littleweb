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
          width="100">
        </el-table-column>
        <el-table-column
          property="id"
          label="ID"
          width="100">
        </el-table-column>
        <el-table-column
          property="title"
          label="标题"
          width="300">
        </el-table-column>
        <el-table-column
          property="author"
          label="作者"
          width="300">
        </el-table-column>
        <el-table-column
          property="operate"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
export default {
  data () {
    return {
      tableData: [],
      currentPage4: 1,
      limit: 10,
      total: 100
    }
  },
  created () {
    this.initData()
  },
  components: {
    headTop
  },
  methods: {
    initData () {
      // let loadingInstance = Loading.service({ target: '.content-area', text: '加载中' })
      let loadingInstance = Loading.service({ fullscreen: true, text: '加载中' })
      axios.get('/v1/selectArticleByPage?pageNum=' + this.currentPage4 + '&pageSize=' + this.limit).then((response) => {
        if (response.status === 200) {
          console.log(response)
          this.tableData = response.data.list
          this.total = response.data.total
          loadingInstance.close()
        }
      }).catch(function (err) {
        console.error(err)
      })
    },
    getPages () {
      let loadingInstance = Loading.service({ fullscreen: true, text: '加载中' })
      axios.get('/v1/selectArticleByPage?pageNum=' + this.currentPage4 + '&pageSize=' + this.limit).then((response) => {
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
    }
  }
}
</script>

<style>
  .table_container{
    padding: 20px;
  }
</style>
