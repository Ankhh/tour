<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread level1="旅游路线信息管理"></my-bread>
    <el-tree
      class="treeData"
      :data="data"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :props="defaultProps">
    </el-tree>
    <el-button>取消</el-button>
    <el-button type="primary" @click="handleSure()">确认</el-button>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {
          id: 1,
          label: '郑州',
          children: [{
            id: 4,
            label: '少林寺',
          }, {
            id: 5,
            label: '嵩山书院',
          }, {
            id: 6,
            label: '郑州黄河文化公园',
          }]
          }, {
            id: 2,
            label: '洛阳',
            children: [{
              id: 7,
              label: '龙门石窟',
            }, {
              id: 8,
              label: '白马寺',
            }, {
              id: 9,
              label: '关林庙',
            }, {
              id: 10,
              label: '老君山景区',
            }]
          }, {
            id: 3,
            label: '开封',
            children: [{
              id: 11,
              label: '开封府'
            }, {
              id: 12,
              label: '清明上河园'
            }, {
              id: 13,
              label: '大相国寺'
            }, {
              id: 14,
              label: '开封包公祠'
            }]
          }, {
            id: 4,
            label: '南阳',
            children: [{
              id: 15,
              label: '老界岭'
            }, {
              id: 16,
              label: '南阳武侯祠'
            }, {
              id: 17,
              label: '赊店古城'
            }, {
              id: 18,
              label: '内乡县衙'
            }, {
              id: 19,
              label: '宝天曼风景区'
            }]
          }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleSure() {
        console.log('确认')
      }
    }
  };
</script>

<style>
  .treeData {
    margin: 20px 0;
  }
</style>