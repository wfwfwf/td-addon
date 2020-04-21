<template>
  <div>
    <el-table :data="formatData" :row-style="showRow" v-bind="$attrs" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column v-if="columns.length===0" width="150">
        <template slot-scope="scope">
          <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
          <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
            <i v-else class="el-icon-minus"></i>
          </span>
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column v-else v-for="(column, index) in columns" :key="index" :prop="column.key" :label="column.name" :width="column.width">
        <template slot-scope="scope" v-if="index === 0">
          <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
          <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
            <i v-else class="el-icon-minus"></i>
          </span>
          {{scope.row[column.key]}}
        </template>
        <template slot-scope="scope" v-else>
          <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
            <i v-else class="el-icon-minus"></i>
          </span>
          {{scope.row[column.key]}}
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <div class="sys-table-pagination">
      <template v-if="pagination">
        <el-pagination :layout="pageLayout" :total="paginationTotal" :current-page="page" :page-size="pageSize" @size-change="sizeChange" @current-change="pageChange" :class="align">
        </el-pagination>
      </template>
      <template v-else>
        <slot name="pagination"></slot>
      </template>
    </div>
  </div>
</template>

<script>
import treeToArray from "./eval";
export default {
  name: "tdTreeTable",
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    },
    pagination: Boolean,
    paginationAlign: String,
    pageSize: {
      type: Number,
      default: function () {
        return 10;
      }
    },
    page: {
      type: Number,
      default: function () {
        return 1;
      }
    },
    paginationTotal: {
      type: Number,
      default: function () {
        return 10;
      }
    },
    sizeChange: {
      type: Function,
      default: function () {
        return null;
      }
    },
    pageChange: {
      type: Function,
      default: function () {
        return null;
      }
    },
    pageLayout: {
      default: function () {
        return "total, sizes, prev, pager, next, jumper";
      }
    }
  },
  computed: {
    align() {
      let res;
      switch (this.paginationAlign) {
        case "right":
          res = "textR";
          break;
        case "center":
          res = "textC";
          break;
        default:
          res = "";
      }
      return res;
    },
    // 格式化数据源
    formatData: function () {
      let tmp;
      if (!Array.isArray(this.data)) {
        tmp = [this.data];
      } else {
        tmp = this.data;
      }
      const func = this.evalFunc || treeToArray;
      const args = this.evalArgs
        ? Array.concat([tmp, this.expandAll], this.evalArgs)
        : [tmp, this.expandAll];
      return func.apply(null, args);
    }
  },
  methods: {
    handleSelectionChange(arr) {
      this.$emit("selectionChange", arr);
    },
    showRow: function (row) {
      const show = row.row.parent
        ? row.row.parent._expanded && row.row.parent._show
        : true;
      row.row._show = show;
      return show
        ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
        : "display:none;";
    },
    // 切换下级是否展开
    toggleExpanded: function (trIndex) {
      const record = this.formatData[trIndex];
      record._expanded = !record._expanded;
    },
    // 图标显示
    iconShow(index, record) {
      return index === 0 && record.childs && record.childs.length > 0;
    }
  }
};
</script>
<style rel="stylesheet/css">
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
$color-blue: #2196f3;
$space-width: 18px;
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: $space-width;
  height: 14px;
  &::before {
    content: "";
  }
}
.processContainer {
  width: 100%;
  height: 100%;
}
table td {
  line-height: 26px;
}

.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: $color-blue;
  margin-left: -$space-width;
}
</style>