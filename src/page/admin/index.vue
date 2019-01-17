<template>
  <div class="manage_page">
    <el-row style="height: 100%;">
      <el-col :span="4"  style="min-height: 100%; background-color: #324057;">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" router>
          <el-menu-item index="dasheng"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>值得读读</template>
            <el-menu-item index="articleList">文章列表</el-menu-item>
            <el-menu-item index="recommendList">推荐内容</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-picture"></i>万花阁</template>
            <el-menu-item index="imagePreview">图片预览</el-menu-item>
            <el-menu-item index="imgaeList">图片列表</el-menu-item>
            <el-menu-item index="imgaeTags">图片标签</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-document"></i>古诗文</template>
            <el-menu-item index="gushiwen">诗文列表</el-menu-item>
            <el-menu-item index="recommend">推荐内容</el-menu-item>
          </el-submenu>
          <el-submenu index="99">
            <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
            <el-menu-item index="sysParams">参数设置</el-menu-item>
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
