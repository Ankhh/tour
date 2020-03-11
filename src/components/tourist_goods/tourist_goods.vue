<template>
  <el-card>
    <my-bread level1="旅游商品管理"></my-bread>
    <!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="20">
        <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入用户名">
          <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- 按钮 -->
    <el-row>
      <el-col>
        <el-button type="success" plain size="mini" @click="addUser()">添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" style="width: 100%" height="400px">
      <el-table-column prop="id" label="id" width="120"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="160"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="160"></el-table-column>
      <el-table-column prop="goods_url" label="商品地址" width="200"></el-table-column>
      <el-table-column prop="date" label="操作" width="210">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" icon="el-icon-edit" circle plain size="mini" @click="editUser(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain size="mini" @click="deleteUser(scope.row.id)"></el-button>
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
      :page-sizes="[2,4,6,8]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加用户表单 -->
    <el-dialog title="添加商品" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goods_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="form.goods_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品地址" :label-width="formLabelWidth">
          <el-input v-model="form.goods_url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="submitForm(form)">确 定</el-button>
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
        form: {
          goods_name: "",
          goods_price: "",
          goods_url: "",
        },
        formLabelWidth: "80px",
        dialogFormVisibleAdd: false,
      }
    },
    created() {
      this.handleTableData();
    },
    methods: {
      // 表格数据
      async handleTableData() {
        this.loading = true;
        const page = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        const res = await this.$http.post('goods/search', page)
        console.log(res)
        const { data: { data, code, message } } = res
        console.log(data, code, message)
        if (code === 200) {
          this.list = data.list
          this.total = data.total
          this.loading = false
          console.log(this.list)
        } else {
          this.$message.error(res.message)
        }
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val;
        this.pageNum = 1;
        this.handleTableData();
      },
      // 当前页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.pageNum = val;
        this.handleTableData();
      },
      handleSearch() {
      },
      // 删除按钮
      deleteUser(id) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            const res = await this.$http.get(`user/del/${id} `);
            console.log(res)
            const {
              data: { code, message }
            } = res.data;
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
      // 打开新建按钮
      addUser() {
        this.dialogFormVisibleAdd = true;
        this.form = {};
      },
      // 提交新建表单
      submitForm(form) {
        console.log(form)
        this.dialogFormVisibleAdd = false;
        this.$refs[form].validate((valid) => {
          console.log(valid)
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
