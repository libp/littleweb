<template>
  <div >
    <head-top></head-top>
    <div class="table_container">
      <el-table
        :data="tableData"
        highlight-current-row
        style="width: 100%">
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
          width="200">
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
      tableData: [{
        id: '2016-05-02',
        title: '王小虎',
        author: '上海市普陀区金沙江路 1518 弄',
        operate: '增删改查按钮'
      }, {
        id: '2016-05-02',
        title: '王小虎',
        author: '上海市普陀区金沙江路 1518 弄',
        operate: '增删改查按钮'
      }]
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
      axios.get('/v1/selectArticleByPage').then((response) => {
        if (response.status === 200) {
          console.log(response)
          this.tableData = response.data
          loadingInstance.close()
        }
      }).catch(function (err) {
        console.error(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
