<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span="3">
          <img width="110px" src="../assets/logo.png">
        </el-col>
        <el-col :span="18" class="middleHead">
          <h2>旅游管理系统</h2>
        </el-col>
        <el-col :span="2">
          <a href="#" class="personal" @click="handlePersonal()">个人信息</a>
        </el-col>
        <el-col :span="1">
          <i class="el-icon-switch-button" @click="handleLogout()">登出</i>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" style="background-color: #d2b48c">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              router
              class="el-menu-vertical-demo"
              background-color="#d2b48c"
              text-color="#fff"
              active-text-color="#656565">
              <el-menu-item index="management_system">
                <i class="el-icon-location"></i>
                <span>系统用户管理</span>
              </el-menu-item>
              <el-menu-item index="tourist_project">
                <i class="el-icon-date"></i>
                <span slot="title">旅游项目管理</span>
              </el-menu-item>
              <el-menu-item index="route_information">
                <i class="el-icon-s-open"></i>
                <span slot="title">旅游路线信息管理</span>
              </el-menu-item>
              <el-menu-item index="contract_order">
                <i class="el-icon-files"></i>
                <span slot="title">合同订单管理</span>
              </el-menu-item>
              <el-menu-item index="price_control">
                <i class="el-icon-setting"></i>
                <span slot="title">价格信息管理</span>
              </el-menu-item>
              <el-menu-item index="evaluation_management">
                <i class="el-icon-mobile"></i>
                <span slot="title">客户对服务的评价管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!-- 内容区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  // 设置首页权限验证
  beforeCreate() {
    //   if (!localStorage.getItem("token")) {
    //     this.$router.push({
    //       name: "login"
    //     });
    //     this.$message.warning("请先登录");
    //   }
  },
  
  methods: {
    // 退出登录功能
    handleLogout() {
      localStorage.clear();
      this.$router.push({
        name: "login"
      });
      // 退出成功
      this.$message.success("退出成功");
    },
    // 个人信息功能
    handlePersonal() {
      this.$router.push({
        name: "personal"
      })
    }
  }
};
</script>

<style scoped>
.container {
  height: 100%;
}
.el-header {
  background-color: #656565;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: white;
}
.middleHead {
  text-align: center;
}
.middleHead h2 {
  color: #f6f7f8;
}
.el-icon-switch-button, .personal {
  cursor: pointer;
  color: #d2b48c;
}
</style>
