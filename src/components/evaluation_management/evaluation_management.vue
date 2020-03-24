<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread level1="留言板管理"></my-bread>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" style="width: 100%" height="400px" class="tableBox">
      <el-table-column prop="username" label="用户名" width="130"></el-table-column>
      <el-table-column prop="time" label="创建日期" width="170">
        <template slot-scope="scope">{{scope.row.create_time | fmtDate}}</template>
      </el-table-column>
      <el-table-column prop="message" label="留言板" width="230"></el-table-column>
      <el-table-column prop="date" label="操作" width="150">
        <template slot-scope="scope">
          <el-row>
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
      // 表格数据
      async handleTableData() {
        this.loading = true;
        const res = await this.$http.post('messageboard/search', { pageNum: this.pageNum, pageSize: this.pageSize })
        // console.log(res)
        const { data: { data, code, message } } = res
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
      // 删除表格数据
      async handleDelete(id) {
        const res = await this.$http.get(`messageboard/delete/${id}`)
        console.log(res)
        const { data, code, message } = res.data
        if (code === 200) {
          this.$message.success(message)
          this.handleTableData()
        } else {
          this.$message.error(message)
        }
      },
    }
  }
</script>

<style>
.tableBox {
  margin-top: 20px;
}
</style>