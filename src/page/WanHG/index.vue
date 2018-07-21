<template>
  <div>
    <y-header></y-header>
    <router-view></router-view>
  </div>
</template>

<script>
import YHeader from '/common/header'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  components: {
    YHeader
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
</style>
