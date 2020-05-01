<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread level1="旅游景点管理"></my-bread>
    <!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="20">
        <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入景点">
          <el-button @click="handleSearch(searchValue)" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- 按钮 -->
    <el-row>
      <el-col>
        <el-button type="success" plain size="mini" @click="addGoods()">添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" style="width: 100%" height="400px">
      <el-table-column prop="spot_name" label="景点名称" width="110"></el-table-column>
      <el-table-column prop="spot_adder" label="景点地址" width="160"></el-table-column>
      <el-table-column prop="spot_details" label="景点详情" width="170"></el-table-column>
      <el-table-column prop="image" label="图片" width="160">
        <template slot-scope="scope">
          <img class="block_img" style="width:80px;height:80px;border:none;" :src="scope.row.image" /> 
        </template>
      </el-table-column>
      <el-table-column prop="date" label="操作" width="210">
        <template slot-scope="scope">
          <el-row>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              size="mini"
              @click="editGoods(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              size="mini"
              @click="deleteUser(scope.row.id)"
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 新增添加弹框 -->
    <el-dialog title="添加景点" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-form-item label="景点名称" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.spot_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="景点地址" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.spot_adder" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="景点详情" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.spot_details" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="景点图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            :action="action"
            :on-success="handleAvatarSuccess"
            >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="submitForm(ruleForm)">立即创建</el-button>
      </div>
    </el-dialog>
    <!-- 编辑景点表单 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-form-item label="景点名称" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.spot_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="景点地址" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.spot_adder" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="景点详情" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.spot_details" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="景点图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            :action="action"
            :on-success="handleAvatarSuccess"
            v-model="ruleForm.image"
            >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="handelEdit(ruleForm)">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        list: [],
        total: 0,
        searchValue: '',
        loading: false,
        formLabelWidth: "80px",
        dialogFormVisibleAdd: false,
        dialogFormVisibleEdit: false,
        ruleForm: {
          spot_name: '',
          spot_adder: '',
          spot_details: '',
        },
        action: "http://47.100.13.76:8081/api/file/upload",
        spot_url: '',
      }
    },
    created() {
      this.handleTableData();
    },
    methods: {
      // 异步拿表格数据
      async handleTableData() {
        this.loading = true;
        const page = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        const res = await this.$http.post('spot/findSpot', page)
        const { data, code, message } = res.data
        if (code === 200) {
          this.list = data.content
          this.total = data.totalElements
          this.loading = false
        } else {
          this.$message.error(res.message)
        }
      },
      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.pageNum = 1;
        this.handleTableData();
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.handleTableData();
      },
      // 检索
      async handleSearch(value) {
        this.loading = true;
        const spot = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          spot_adder: value
        }
        const res = await this.$http.post('spot/findSpot', spot)
        // console.log(res)
        const { data, code, message } = res.data
        if (code === 200) {
          this.list = data.content
          this.total = data.totalElements
          this.loading = false
        } else {
          this.$message.error(res.message)
        }
      },
      // 删除按钮
      deleteUser(id) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            const res = await this.$http.post(`spot/delSpot/${id} `);
            // console.log(res)
            const { code, message } = res.data;
            if (code === 200) {
              this.pagenum = 1;
              this.handleTableData();
              this.$message.success(message);
            }
          })
          .catch(() => {
            this.$message.warning("取消删除");
          });
      },
      // 新建按钮
      addGoods() {
        this.dialogFormVisibleAdd = true;
        this.ruleForm = {};
      },
      // 新建保存按钮
      async submitForm(formdata) {
        // console.log(formdata)
        formdata = {
          ...formdata,
          image: this.spot_url,
        }
        const res = await this.$http.post('spot/saveSpot', formdata)
        // console.log(res)
        const { code, message } = res.data
        if (code === 200) {
          this.dialogFormVisibleAdd = false;
          this.handleTableData()
        } else {
          this.$message.error(message)
        }
      },
      // 编辑按钮
      async editGoods(id) {
        this.dialogFormVisibleEdit = true;
        // console.log(id)
        const res = await this.$http.post(`spot/findSpotById/${id}`)
        // console.log(res)
        const { data, code, message } = res.data
        if (code === 200) {
          this.ruleForm = data
        } else {
          this.$message.error(message)
        }
      },
      // 编辑保存按钮
      async handelEdit (ruleForm) {
        // console.log(ruleForm)
        ruleForm = {
          ...ruleForm,
          image: this.spot_url
        }
        const res = await this.$http.post('spot/updateSpot', ruleForm)
        // console.log(res)
        const { data, code, message } = res.data
        if (code === 200) {
          this.dialogFormVisibleEdit = false;
          this.handleTableData()
        } else {
          this.$message.error(message)
        }
      },
      // 上传
      handleAvatarSuccess(res, file) {
        // console.log(res, file)
        this.$message.success(res.msg)
        this.imageUrl = URL.createObjectURL(file.raw);
        this.spot_url = res.flag
      },
    }
  }
</script>

<style scoped>
.searchArea {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>