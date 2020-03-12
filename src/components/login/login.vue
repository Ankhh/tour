<template>
  <div class="box">
    <el-form label-position="left" label-width="80px" :model="formdata" class="form">
      <h2 style="text-align: center; margin-bottom: 20px">用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.phone" name="phone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password" name="password"></el-input>
      </el-form-item>
      <el-button type="primary" class="btn" @click="handleLogin">登录</el-button>
      <el-link type="primary" class="register" @click="handleRegister()">没有账号？点击注册</el-link>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    async handleLogin() {
      const res = await this.$http.post(`user/login?phone=${this.formdata.phone}&password=${this.formdata.password}`);
      console.log(res)

      if (res.data.code === 200) {
        // 保存token的值
        // localStorage.setItem("token", data.token);
        console.log(localStorage)
        this.$router.push({
          name: "home"
        });
      } else {
        this.$message.error('用户名或密码错误');
      }
    },
    handleRegister() {
      this.$router.push({
        name: 'register',
      })
    }
  }
};
</script>

<style scoped>
.box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #656565;
}
.form {
  width: 400px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
}
.btn {
  width: 100%;
}
.register {
  font-size: 14px;
  cursor: pointer;
}
</style>