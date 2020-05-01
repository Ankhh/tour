<template>
  <el-card>
    <my-bread level1="系统用户管理"></my-bread>
    <!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="20">
        <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入用户名">
          <el-button @click="handleSearch(searchValue)" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- <el-button @click="$router.push({name:'goodsadd'})" type="success" plain>添加商品</el-button> -->
      </el-col>
    </el-row>
    
    <!-- 表格 -->
    <!-- 
      表格
        el-table-column：每一列
        prop：每一行的数据名，来源于tableData数组中的对象值
    -->
    <el-table v-loading="loading" :data="list" style="width: 100%" height="400px">
      <el-table-column prop="phone" label="用户名" width="110"></el-table-column>
      <el-table-column prop="name" label="真实姓名" width="110"></el-table-column>
      <el-table-column prop="sex" label="性别" width="160"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" width="170">
        <template slot-scope="scope">{{scope.row.create_time | fmtDate}}</template>
      </el-table-column>
      <el-table-column prop="isActive" label="用户状态" width="160">
        <template slot-scope="scope">
          <el-switch
            @change="changeStatus(scope.row)"
            v-model="scope.row.isActive"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="操作" width="210">
        <template slot-scope="scope">
          <el-row>
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

    <!-- 添加用户表单
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="handelAddUser()">确 定</el-button>
      </div>
    </el-dialog> -->
    
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
      }
    },
    created() {
      this.handleTableData();
    },
    methods: {
      async handleTableData() {
        // this.loading = true;
        const name = { pageNum: this.pageNum, pageSize: this.pageSize }
        const res = await this.$http.post('user/search', name)
        const { data: { data, code, message } } = res
        // console.log(data, code, message)
        if (code === 200) {
          this.list = data.list
          this.total = data.total
          this.loading = false
          // console.log(this.list)
        } else {
          this.$message.error(res.message)
        }
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`)
        this.pageSize = val;
        this.pageNum = 1;
        this.handleTableData();
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.pageNum = val;
        this.handleTableData();
      },
      // 查找用户
      async handleSearch(value) {
        this.loading = true
        const name = { displayName: value, pageNum: this.pageNum, pageSize: this.pageSize }
        const res = await this.$http.post('user/search', name)
        // console.log(res)
        const {data, code, message} = res.data
        if (code === 200) {
          this.list = data.list
          this.total = data.total
          this.loading = false
        } else {
          this.$message.error(res.message)
        }
      },
      // 删除按钮
      async deleteUser(id) {
        const res = await this.$http.get(`user/del/${id} `)
        // console.log(res)
        const {
          data, code, message
        } = res.data;
        if (code === 200) {
          this.pageNum = 1;
          this.handleTableData();
          this.$message.success(message);
        } else {
          this.$message.warning("取消删除");
        }
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
