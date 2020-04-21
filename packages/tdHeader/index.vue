<template>
  <div class="td-header">
    <slot name="top"></slot>
    <el-collapse @change="handleChange">
      <el-collapse-item :title="activatedTitle" name="1">
        <slot></slot>
        <div style="text-align: right" v-if="!top">
          <slot name="footer"></slot>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="text-align: right" v-if="top">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "tdHeader",
  props: {
    titleList: {
      type: Array,
      default: function () {
        return ['展开搜索', '收起搜索']
      }
    },
    top: {
      type: Boolean
    }
  },
  watch: {
  },
  data() {
    return {
      activatedTitle: '',
    }
  },
  methods: {
    init(){
      // 获取初始按钮
      this.activatedTitle = this.titleList[0]
    },
    handleChange() {
      this.activatedTitle = this.titleList.find(title => title !== this.activatedTitle)
    }
  },
  mounted(){
    this.init()
  }
}
</script>

<style lang="scss">
.td-header {
  padding: 24px;
  background: white;
  width: 100%; // margin: 30px0;
  border-radius: 0 0 8px 8px;
  box-shadow: 0px 1px 2px 0px #c4ccd6; // 展开搜索显示
  .el-collapse-item__header {
    border-bottom: 0;
    color: #19bf4f;
    font-weight: 700;
    font-family: "冬青黑体简体中文W6";
    font-size: 14px;
    height: 30px;
    line-height: 30px;

    .el-collapse-item__arrow {
      line-height: 30px;
    }
  }

  .el-collapse {
    border-bottom: 0;
    border-top: 0;
  }

  .el-collapse-item__wrap {
    border-bottom: 0;
  }
}
</style>
