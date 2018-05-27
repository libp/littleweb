<template>
  <div>
    <y-header></y-header>
    <router-view class="main"></router-view>
    <y-footer></y-footer>
  </div>
</template>

<script>
import YHeader from '/common/header'
import YFooter from '/common/footer'
export default {
  data () {
    return {}
  },
  components: {
    YHeader,
    YFooter
  }
}
</script>

<style scoped>
  .main{
    background-color:#f1f1f1;
    background-size:cover;
    background-repeat:no-repeat;
    width:100%;
  }
</style>
