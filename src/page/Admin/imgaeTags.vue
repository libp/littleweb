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
        <!--<el-table-column-->
          <!--property="id"-->
          <!--label="ID"-->
          <!--width="80">-->
        <!--</el-table-column>-->
        <el-table-column
          property="paramskey"
          label="参数键"
          width="100">
        </el-table-column>
        <el-table-column
          property="paramsvalue"
          label="参数值"
          width="150">
        </el-table-column>
        <el-table-column
          property="paramsname"
          label="参数代号"
          width="150">
        </el-table-column>
        <el-table-column
          property="operate"
          label="操作">
          <template slot-scope="scope">
            <router-link :to="{ name: 'tags', params: { id: scope.row.paramskey }}" target="_blank">
              <el-button size="mini"><i class="el-icon-view"></i></el-button>
            </router-link>
            <el-button
              size="mini"
              type="primary"
            @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <el-dialog title="参数修改" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="参数键" :label-width="formLabelWidth">
            <el-input v-model="form.paramskey" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="参数值" :label-width="formLabelWidth">
            <el-input v-model="form.paramsvalue" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="参数代号" :label-width="formLabelWidth">
            <el-input v-model="form.paramsname" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancleModification">取 消</el-button>
          <el-button type="primary" @click="updateByPrimaryKeySelective">确 定</el-button>
        </div>
      </el-dialog>
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
      dialogFormVisible: false,
      currentIndex: '',
      form: {
        paramskey: '',
        paramsvalue: '',
        paramsname: ''
      },
      formLabelWidth: '120px'
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
      let loadingInstance = Loading.service({ fullscreen: true, text: '加载中' })
      axios.get('/v1/sysParams/selectSysParams?pageNum=' + this.currentPage4 + '&pageSize=' + this.limit).then((response) => {
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
    handleEdit (index, row) {
      this.form = this.tableData[index]
      this.currentIndex = index
      this.dialogFormVisible = true
    },
    updateByPrimaryKeySelective () {
      console.log(this.form)
      axios.post('/v1/sysParams/updateByPrimaryKeySelective', {
        id: this.form.id,
        paramsvalue: this.form.paramsvalue,
        paramsname: this.form.paramsname
      }).then((response) => {
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
      this.dialogFormVisible = false
    },
    cancleModification () {
      this.dialogFormVisible = false
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
    }
  }
}
</script>

<style>
  .table_container{
    padding: 20px;
  }
</style>
