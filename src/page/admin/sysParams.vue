<template>
  <div>
    <head-top></head-top>
    <div class="table_container">
      <el-switch
        v-model="auditSwitch"
        active-text="腾讯审核开"
        inactive-text="关"
        @change="updateAuditImg">
      </el-switch>
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
      auditSwitch: true,
      deleted: 0
    }
  },
  components: {
    headTop,
    footerAdmin
  },
  created () {
  },
  methods: {
    selectSysParamsValue () {
      axios.get('/v1/sysParams/selectSysParamsValue').then((response) => {
        this.auditSwitch = response.data
        // console.log('xxxxxxxxxxxxxx' + this.auditSwitch)
      }).catch(function (err) {
        console.error(err)
      })
    },
    updateAuditImg () {
      if (!this.auditSwitch) {
        this.deleted = 1
      } else {
        this.deleted = 0
      }
      axios.get('/v1/wanHGImg/updateAuditImg?deleted=' + this.deleted).then((response) => {
        // console.log(response.data)
      }).catch(function (err) {
        console.error(err)
      })
      axios.get('/v1/sysParams/updateParamsValueByKey?paramsValue=' + this.auditSwitch +
        '&paramsKey=' + 'TENCENT_REVIEW').then((response) => {
        // console.log(response.data)
      }).catch(function (err) {
        console.error(err)
      })
    }
  },
  mounted () {
    this.selectSysParamsValue()
  },
  beforeMount () {
  }
}
</script>

<style scoped>
</style>
