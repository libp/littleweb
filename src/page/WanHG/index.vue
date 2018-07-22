<template>
  <div class="imgs">
    <y-header></y-header>
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
</style>
