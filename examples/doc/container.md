## tdHeader

:::demo 示例
```html
<template>
  <td-header :title-list="titleData" top>
    <template slot="top">
      上部
    </template>
    可隐藏的部分
    <template slot="footer">
      <el-button>搜索</el-button>
    </template>
  </td-header>
</template>

<script>
export default {
  name: 'container',
  data() {
    return {
      titleData: ['点击展开','点击关闭']
    }
  }
}
</script>
```

:::

