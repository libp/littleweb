<template>
  <div class="footer">
    <div id="gk-copyrights">
      <p class="copyright">皖ICP备15005894号-2 - <span><router-link to="/about#title">关于</router-link></span></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bottom'
}
</script>
<style scoped>
  .footer{
    clear:both;
    color:#999;
    font-size:12px;
    font-weight:400;
    margin:0 auto;
    max-width:750px;
    padding:5px 0 16px;
    text-align:center;
    width:100%
  }
  #gk-copyrights{padding:0;text-align:center}
  #gk-copyrights > p{margin:0;}
</style>
