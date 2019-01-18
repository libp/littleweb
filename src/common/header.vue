<template>
  <div class="top_header">
    <div class="logo"><img src="../assets/logo.svg" style="width: 100px;height: 50px;"></div>
    <div class="nav">
      <ul>
        <li>
          <router-link to="/home">值得读读</router-link>
          <router-link to="/nav" style="padding-left: 20px">程序员导航</router-link>
          <router-link to="/gusw" style="padding-left: 20px">古诗文</router-link>
          <router-link :to="{ name: 'wanhg', params: { type: 'cn' }}" style="padding-left: 20px">万花阁</router-link>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .top_header {
    background-color: #FFFFFF;
    height: 50px;
    min-width: 500px;
    overflow: hidden;
    width: 100%;
  }
  .logo{
    margin: 0 0 0 0;
    float: left;
    color: #000000;
    width: 100px;
  }
  .nav{
    margin: 13px 0 0 0;
  }
  .nav ul li{
    display:inline;
    float:left;
    margin: 0 20px 0 0;
  }
  .nav ul li a{

  }
</style>
