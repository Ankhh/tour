<template>
  <div class="box">
    <el-form label-position="left" label-width="80px" :model="formdata" class="form">
      <h2 style="text-align: center; margin-bottom: 20px">用户登录</h2>
      <el-form-item label="电话号码">
        <el-input v-model="formdata.username" name="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formdata.password" name="password"></el-input>
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
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async handleLogin() {
      const res = await this.$http.post(`user/login?phone=${this.formdata.username}&password=${this.formdata.password}`);
      console.log(res)
      const { data, code, message } = res.data
      if (code === 200) {
        // 保存token的值
        console.log(data.phone)
        localStorage.setItem("token", data);
        localStorage.setItem("phone", data.phone);
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
  /* background: url(../../../../assets/com.jpg) cover no-repeat top center; */
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