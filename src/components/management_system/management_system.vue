<template>
  <el-card>
    <my-bread level1="系统用户管理"></my-bread>
    <!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="24">
        <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入内容">
          <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click="$router.push({name:'goodsadd'})" type="success" plain>添加商品</el-button>
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
      <el-table-column prop="displayName" label="用户名" width="110"></el-table-column>
      <el-table-column prop="phone" label="电话" width="160"></el-table-column>
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
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              size="mini"
              @click="editUser(scope.row)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-check"
              circle
              plain
              size="mini"
              @click="changeRoles(scope.row)"
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
      :page-sizes="[2,4,6,8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
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
      }
    },
    created() {
      this.handleTableData();
    },
    methods: {
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
      handleSearch() {
      },
      async handleTableData() {
        // this.loading = true;
        const res = this.$http.get(`user/findAll/${this.pageNum}/${this.pageSize}`)
        console.log(res.data.list)
        if (res.code === 200) {
          alert(1)
          this.tableData = res.data.list
          this.total = res.data.total
          this.loading = false
        } else {
          this.$message.error(res.message)
        }
      }
    }
  }
</script>

<style scoped>
  .search {
    margin-top: 20px;
  }
</style>
