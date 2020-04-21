:::demo 示例

```html
<template>
  <div class="hello">
    <td-header>
      <td-search>
        <el-form :inline="true" label-width="110px" :model="searchForm">
          <el-form-item label="名称">
            <el-input v-model="searchForm.key" placeholder="请输入名称" @keyup.enter.native='search' clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </td-search>
    </td-header>
    <td-main>
      <td-table-mixin pagination pagination-align="center" :page-size='tableData.pageInfo.pageSize' :pagination-total='tableData.pageInfo.total' :size-change='sizeChange' :page-change='pageChange'>
        <el-table v-loading="tableData.loading" :data="tableData.body" border>
          <el-table-column v-for="(item,index) in tableData.head" :prop="item.key" :label="item.name" sortable :key="index"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </td-table-mixin>
    </td-main>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data() {
    return {
      searchForm: {
        key: ''
      },
      tableData: {
        body: [{
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
        }, {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1517 弄',
            zip: 200333
        }, {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1519 弄',
            zip: 200333
        }, {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1516 弄',
            zip: 200333
        }],
        head: [
          {
            key: "date",
            name: "日期"
          },
          {
            key: "name",
            name: "名称"
          },
          {
            key: "province",
            name: "省"
          },
          {
            key: "city",
            name: "市"
          },
          {
            key: "address",
            name: "详情地址"
          },
          {
            key: "zip",
            name: "邮编"
          }
        ],
        pageInfo: {
          page: 1,
          pageSize: 10,
          total: 20
        }
      }

    }
  },
  methods: {
    // 获取table数据
    getTableData() {
      let param = Object.assign({}, this.tableData.pageInfo, this.searchForm);
      console.log("-------param------: ", param)
    },
    sizeChange(val) {
      this.tableData.pageInfo.pageSize = val;
      this.getTableData();
    },
    pageChange(val) {
      this.tableData.pageInfo.page = val;
      this.getTableData();
    },
    // 搜索
    search() {
      this.tableData.page = 1;
      this.getTableData();
    },
    edit(row) {
        console.log(row);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>

```
:::
