<template>
  <el-card>
    <my-bread level1="个人信息管理"></my-bread>
    <h2>个人信息修改</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
      <el-form-item label="用户名" prop="displayName">
          <el-input v-model="ruleForm.displayName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.region" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
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
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          displayName: '',
          sex: '',
          password: '',
          name: '',
          dob: '',
          id: '2b5791c731f941ca87807e69fb4e6721',
          qqq: 'qqq',   //假数据
        },
        rules: {
          displayName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          // sex: [
          //   { required: true, message: '请选择性别', }
          // ],
          password: [
            { required: true,  message: '要输入密码', trigger: 'blur' },
          ],
          name: [
            { message: '请输入真实姓名', trigger: 'blur' },
          ]
        }
      };
    },
    created() {
      this.handleFormData()
    },
    methods: {
      // 获取用户数据
      async handleFormData() {
        this.loading = true
        const res = await this.$http.get(`user/searchPersonalInformation/qqq`)
        console.log(res)
        const {data, code, message} = res.data
        if (code === 200) {
          this.ruleForm = data;
          this.loading = false
        } else {
          this.$message.error(message)
        }
      },
      // 提交事件
      async submitForm(formName) {
        const res = await this.$http.post('user/changePassword', this.ruleForm);
        console.log(res)
        if (res.data.code === 200) {
          this.$message.success("修改成功")
        } else {
          this.$message.error(res.data.message)
        }
      },
      // 重置事件
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  }
</script>

<style scoped>
.demo-ruleForm {
  margin-top: 20px;
}
h2 {
  text-align: center;
  margin-bottom: 10px;
}
</style>