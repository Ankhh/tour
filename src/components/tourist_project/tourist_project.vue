<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread level1="旅游项目管理"></my-bread>
    <!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="20">
        <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入用户名">
          <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
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
      <el-table-column prop="id" label="id" width="80"></el-table-column>
      <el-table-column prop="spot_name" label="景点名称" width="110"></el-table-column>
      <el-table-column prop="spot_adder" label="景点地址" width="160"></el-table-column>
      <el-table-column prop="spot_details" label="景点详情" width="170"></el-table-column>
      <el-table-column prop="image" label="图片" width="160"></el-table-column>
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
      // 异步拿表格数据
      async handleTableData() {
        // this.loading = true;
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
            const res = await this.$http.post(`spot/delSpot/${id} `);
            console.log(res)
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
    }
  }
</script>

<style scoped>
.searchArea {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>