<template>
  <div class="imgs">
    <y-header></y-header>
    <div class="category">
      <router-link :to="{ name: 'wanhg', params: { type: 'rihan' }}" target="_blank">日韩</router-link>
      <router-link :to="{ name: 'wanhg', params: { type: 'gangtai' }}" target="_blank">港台</router-link>
      <router-link :to="{ name: 'wanhg', params: { type: 'cn' }}" target="_blank">国内</router-link>
      <router-link :to="{ name: 'wanhg', params: { type: 'xiuren_VIP' }}" target="_blank">模特</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import YHeader from '/common/header'
import YFooter from '/common/footer'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  components: {
    YHeader,
    YFooter
  },
  created () {
  },
  methods: {
  },
  mounted () {
  },
  beforeMount () {
  }
}
</script>

<style scoped>
  .imgs{height: 100%}
  .category{
    height: 50px;
    line-height: 50px;
    margin: 0 0 0 200px;
    width: 100%;
  }
</style>
