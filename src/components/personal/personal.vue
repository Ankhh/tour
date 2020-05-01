<template>
  <el-card>
    <my-bread level1="个人信息管理"></my-bread>
    <h2>个人信息修改</h2>
    <div class="box">
      <!-- 表单 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <el-form-item label="用户名" prop="displayName">
            <el-input v-model="ruleForm.displayName"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="ruleForm.sex" placeholder="请选择性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
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
          <el-form-item label="头像" prop="avatarUrl">
            <el-input v-model="ruleForm.avatarUrl"></el-input>
            <!-- <template slot-scope="scope">
              <img class="block_img" style="width:80px;height:80px;border:none;" :src="scope.row.avatarUrl" /> 
            </template> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 头像 -->
      <el-upload
        class="avatar-uploader"
        :action="action"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
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
          avatarUrl: '',
          // qqq: '111',   //假数据,
        },
        phone: localStorage.getItem("phone"),
        rules: {
          displayName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入电话', }
          ],
          password: [
            { required: true,  message: '要输入密码', trigger: 'blur' },
          ],
          name: [
            { message: '请输入真实姓名', trigger: 'blur' },
          ]
        },
        imageUrl: '',
        action: "http://47.100.13.76:8081/api/file/upload",
        avatarUrl: '',
      };
    },
    created() {
      this.handleFormData()
    },
    methods: {
      // 获取用户数据
      async handleFormData() {
        this.loading = true
        const res = await this.$http.get(`user/searchPersonalInformation/${this.phone}`)
        // console.log(res)
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
        // console.log(formName)  
        // console.log(this.avatarUrl)
        this.ruleForm = {
          ...this.ruleForm,
          avatarUrl: this.avatarUrl
        }
        const res = await this.$http.post('user/changePassword', this.ruleForm);
        // console.log(res)
        if (res.data.code === 200) {
          this.$message.success("修改成功")
          this.$router.push({
            name: "home"
          })
        } else {
          this.$message.error(res.data.message)
        }
      },
      // 重置事件
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 上传
      handleAvatarSuccess(res, file) {
        this.$message.success(res.msg)
        this.imageUrl = URL.createObjectURL(file.raw);
        this.avatarUrl = res.flag
        localStorage.setItem('photo', res.flag)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    },
  }
</script>

<style scoped lang="less">
h2 {
  text-align: center;
  margin: 10px;
}
.box {
  display: flex;
  .ruleForm {
    margin-top: 20px;
    width: 60%;
  }
  .avatar-uploader{
    width: 30%;
    position: relative;
    overflow: hidden;
    margin-left: 30px;
    display: inline-block;
    text-align: center;
    // cursor: pointer;
    .el-upload {
      display: inline-block;
      text-align: center;
      cursor: pointer;
      outline: 0;
      border: 1px dashed #ccc !important;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>