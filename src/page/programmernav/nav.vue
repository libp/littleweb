<template xmlns="http://www.w3.org/1999/html">
  <div class="navMain">
    <div v-for="(urls, key) in urlMap" :key="urls.id">
      <h2>{{ key }}</h2>
      <div v-for="list in urls" class="urlmessages" :key="list.id">
        <a v-bind:href="list.weburl" target="_blank" style="color: #3a8ee6">
          <li style="width: 400px;">{{list.webtitle}}</li>
          <!--<button v-text="btnText" @click="showToggle"></button>-->
        </a>
        <li class="details">{{list.webdesc}}</li>
        <li class="details">{{list.keywords}}</li>
      </div>
      <br/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Loading } from 'element-ui'
export default {
  name: 'home',
  data () {
    return {
      urlMap: {},
      isShow: false,
      btnText: '查看详情'
    }
  },
  created () {
  },
  methods: {
    selectNav () {
      let loadingInstance = Loading.service({ target: '.content-area', text: '加载中' })
      axios.get('/v1/nav/selectNav').then((response) => {
        if (response.status === 200) {
          console.log(response)
          this.urlMap = response.data
          loadingInstance.close()
        }
      }).catch(function (err) {
        console.error(err)
      })
    },
    showToggle: function () {
      this.isShow = !this.isShow
      if (this.isShow) {
        this.btnText = '隐藏'
      } else {
        this.btnText = '查看详情'
      }
    }
  },
  mounted () {
    this.selectNav()
  },
  beforeMount () {
  }
}
</script>

<style scoped>
  .navMain{
    margin: 50px 0 0 100px;
  }
  .details{
    display:none;
  }
  .urlmessages:hover .details{
    display:block ;
  }
  .urlmessages:visited .details{
    display:block ;
  }
</style>
