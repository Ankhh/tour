<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span="3">
          <img width="110px" src="../assets/logo.png">
        </el-col>
        <el-col :span="20" class="middleHead">
          <h2>旅游管理系统</h2>
        </el-col>
        <!--  <el-col :span="2">
          <div class="block"><el-avatar :size="30" :src="circleUrl"></el-avatar></div>
          <a href="#" class="personal" @click="handlePersonal()">个人信息</a>
        </el-col>
        <el-col :span="1">
          <i class="el-icon-switch-button" @click="handleLogout()">登出</i>
        </el-col>-->
        <el-col :span="1">
          <el-dropdown>
            <div class="el-dropdown-link"><el-avatar :size="30" :src="circleUrl"></el-avatar></div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><a href="#" class="personal" @click="handlePersonal()">个人信息</a></el-dropdown-item>
              <el-dropdown-item><i class="el-icon-switch-button" @click="handleLogout()">登出</i></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
              default-active="homepage"
              active-text-color="#656565">
              <el-menu-item index="homepage">
                <i class="el-icon-location"></i>
                <span>个人主页</span>
              </el-menu-item>
              <el-menu-item index="management_system">
                <i class="el-icon-location"></i>
                <span>系统用户管理</span>
              </el-menu-item>
              <el-menu-item index="tourist_project">
                <i class="el-icon-date"></i>
                <span slot="title">旅游景点管理</span>
              </el-menu-item>
              <!-- <el-menu-item index="route_information">
                <i class="el-icon-s-open"></i>
                <span slot="title">旅游路线信息管理</span>
              </el-menu-item> -->
              <el-menu-item index="tourist_goods">
                <i class="el-icon-date"></i>
                <span slot="title">旅游商品管理</span>
              </el-menu-item>
              <el-menu-item index="contract_order">
                <i class="el-icon-files"></i>
                <span slot="title">合同订单管理</span>
              </el-menu-item>
              <!-- <el-menu-item index="price_control">
                <i class="el-icon-setting"></i>
                <span slot="title">价格信息管理</span>
              </el-menu-item> -->
              <el-menu-item index="evaluation_management">
                <i class="el-icon-mobile"></i>
                <span slot="title">留言板管理</span>
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
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      username: 'qqq',
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
  created() {
    this.personalData()
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
    },
    async personalData() {
      const res = await this.$http.get(`user/searchPersonalInformation/${this.username}`)
      console.log(res)
      const { data, code, message } = res.data
      if (code === 200) {
        this.circleUrl = data.avatarUrl
      } else {
        this.$message.error(message)
      }
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
.el-dropdown-link {
  margin-top: 10px;
}
</style>
