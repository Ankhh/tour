<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread level1="合同订单管理"></my-bread>
    <!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="20">
        <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入订单id">
          <el-button @click="handleSearch(searchValue)" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" style="width: 100%" height="400px">
      <el-table-column prop="id" label="id" width="80"></el-table-column>
      <el-table-column prop="proId" label="商品id" width="80"></el-table-column>
      <el-table-column prop="buyerId" label="买家id" width="110"></el-table-column>
      <el-table-column prop="sellerId" label="卖家id" width="110"></el-table-column>
      <el-table-column prop="price" label="价格" width="160"></el-table-column>
      <el-table-column prop="address" label="地址" width="160"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" width="170">
        <template slot-scope="scope">{{scope.row.create_time | fmtDate}}</template>
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
              @click="editBtn(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              size="mini"
              @click="handleDelete(scope.row.id)"
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
    <!-- 编辑表单 -->
    <el-dialog title="修改订单" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品id" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.proId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="买家id" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.buyerId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="卖家id" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.sellerId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.status" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="ruleForm.createTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit(ruleForm)">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        pageNum: 1,
        pageSize: 10,
        searchValue: '',
        formLabelWidth: '80px',
        dialogFormVisibleEdit: false,
        ruleForm: {
          id: '',
          proId: '',
          buyerId: '',
          sellerId: '',
          price: '',
          address: '',
          createTime: '',
          date: '',
        }
      }
    },
    created() {
      this.handleTableData();
    },
    methods: {
      // 表格数据
      async handleTableData() {
        this.loading = true
        const res = await this.$http.get(`order/findAll?pageNum=${this.pageNum}&pageSize=${this.pageSize}`);
        // console.log(res)
        const { data: { data, code, message } } = res
        if (code === 200) {
          this.list = data.list
          this.total = data.total
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
      // 删除表格数据
      async handleDelete(id) {
        const res = await this.$http.delete(`order/${id}`)
        console.log(res)
        const { data, code, message } = res.data
        if (code === 200) {
          this.$message.success(message)
          this.handleTableData()
        } else {
          this.$message.error(message)
        }
      },
      // 检索订单
      async handleSearch(searchValue) {
        this.loading = true
        const res = this.$http.post(`order/${searchValue}`)
        console.log(res)
        const { data, code, message } = res.data
        if (code === 200) {
          this.list = data.list
          this.total = data.total
          this.loading = false
        } else {
          this.$message.error(message)
        }
      },
      // 编辑订单
      async editBtn(id) {
        this.dialogFormVisibleEdit = true;
        const res = await this.$http.post(`order/${id}`)
        console.log(res)
        const { data, code, message } = res.data
        if (code === 200) {
          this.ruleForm = data
        } else {
          this.$message.error(message)
        }
      },
      // 编辑提交
      async handleEdit(ruleForm) {
        console.log(ruleForm)
        const res = await this.$http.put('order', ruleForm)
        console.log(res)
        const { data, code, message } = res.data
        if (code === 200) {
          this.dialogFormVisibleEdit = false
          this.$message.success(message)
          this.handleTableData()
        } else {
          this.$message.error(message)
        }
      }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .searchArea {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>