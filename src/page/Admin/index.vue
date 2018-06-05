<template>
  <div class="manage_page">
    <el-row style="height: 100%;">
      <el-col :span="4"  style="min-height: 100%; background-color: #324057;">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
          <el-menu-item index="dasheng"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>文章管理</template>
            <el-menu-item index="articleList">文章列表</el-menu-item>
            <el-menu-item index="shopList">推荐内容</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-plus"></i>文言文管理</template>
            <el-menu-item index="addShop">文言文列表</el-menu-item>
            <el-menu-item index="addGoods">推荐内容</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-plus"></i>图片管理</template>
            <el-menu-item index="addShop">图片列表</el-menu-item>
            <el-menu-item index="addGoods">推荐内容</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-plus"></i>笑话管理</template>
            <el-menu-item index="addShop">笑话列表</el-menu-item>
            <el-menu-item index="addGoods">推荐笑话</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    defaultActive: function () {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
