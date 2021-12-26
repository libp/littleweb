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
          width="150">
        </el-table-column>
        <el-table-column
          property="author"
          label="作者"
          width="80">
        </el-table-column>
        <el-table-column
          property="dynasty"
          label="朝代"
          width="80">
        </el-table-column>
        <el-table-column
          property="scores"
          label="评分"
          width="80">
        </el-table-column>
        <el-table-column
          property="tag"
          label="标签"
          width="250">
        </el-table-column>
        <el-table-column
          property="operate"
          label="操作">
          <template slot-scope="scope">
            <router-link :to="{ name: 'guswNum', params: { id: scope.row.id }}" target="_blank">
              <el-button size="mini"><i class="el-icon-view"></i></el-button>
            </router-link>
            <el-button
              size="mini"
              type="primary"
              v-show="scope.row.audiourl"
              @click="play(scope.$index, scope.row)"><i class="iconfont icon-play"></i>
              <audio :id="scope.row.audiourl"><source :src="scope.row.audiourl"  type="audio/mpeg" /></audio>
              </el-button>
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
      total: 100,
      icon: '',
      audio: ''
    }
  },
  created () {
    this.getPages()
  },
  components: {
    headTop
  },
  methods: {
    getPages () {
      this.tableData = []
      let loadingInstance = Loading.service({ fullscreen: true, text: '加载中' })
      axios.get('/v1/gushiwen/selectByScores?pageNum=' + this.currentPage4 + '&pageSize=' + this.limit).then((response) => {
        if (response.status === 200) {
          this.tableData = response.data.list
          this.total = response.data.total
          for (let i of this.tableData) {
            if (i.audiourl == null || i.audiourl === '') {
              i.audiourl = false
            } else {
              i.audiourl = 'https://www.nichuiniu.cn/mp3/' + i.audiourl
            }
          }
          loadingInstance.close()
        }
      }).catch(function (err) {
        console.error(err)
      })
    },
    handleSizeChange (val) {
      this.limit = val
      this.getPages()
      if (this.audio !== '') {
        this.audio.pause()
        this.icon.className = 'iconfont icon-play'
      }
    },
    handleCurrentChange (val) {
      this.currentPage4 = val
      this.getPages()
      if (this.audio !== '') {
        this.audio.pause()
        this.icon.className = 'iconfont icon-play'
      }
    },
    cell ({row, column, rowIndex, columnIndex}) {
      return 'padding:4px 0'
    },
    play (index, row) {
      // 将正在播放的暂停
      if (this.audio !== '' && this.audio !== document.getElementById(row.audiourl)) {
        this.audio.pause()
        this.icon.className = 'iconfont icon-play'
      }
      this.audio = document.getElementById(row.audiourl)
      this.icon = document.getElementById(row.audiourl).previousElementSibling
      if (this.audio.paused) {
        this.audio.play()
        this.icon.className = 'iconfont icon-zanting'
      } else {
        this.audio.pause()
        this.icon.className = 'iconfont icon-play'
      }
    },
    handleRecommend (index, row) {
      axios.get('/v1/gushiwen/insertRecommend?id=' + row.id).then((response) => {
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
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete('/v1/gushiwen/deleteByPrimaryKey?id=' + row.id).then((response) => {
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
