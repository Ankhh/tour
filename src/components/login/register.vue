<template>
  <div class="registerBox">
    <h2>用户注册</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
      <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="dob">
          <el-date-picker
            v-model="ruleForm.dob"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          sex: '',
          password: '',
          name: '',
          dob: '',
          phone: '',
        },
        rules: {
          phone: [
            { required: true, message: '请输入手机号', }
          ],
          password: [
            { required: true,  message: '要输入密码', trigger: 'blur' },
          ],
          name: [
            { message: '请输入真实姓名', trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
      // 提交事件
      async submitForm(ruleForm) {
        const res = await this.$http.post("user/add ", this.ruleForm);
        const { code, message } = res.data
        console.log(code)
        if (code === 200) {
          this.$message.success("注册成功")
          this.$router.push({
            name: 'login',
          })
        } else {
          this.$message.error(message)
        }
      },
      // 重置事件
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
  }
</script>

<style scoped>
  .registerBox {
    width: 50%;
    margin: 20px auto;
  }
  .registerBox > h2 {
    text-align: center;
    margin-bottom: 20px;
  }
</style>