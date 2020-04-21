<template>
<div class="td-main">
  <slot></slot>
</div>
</template>

<script>
  export default {
    name: "tdMain"
  }
</script>

<style lang="scss">
  .td-main {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 24px;
    display: block;
    margin-top: 30px;
    box-shadow: 1px 1px 2px 0 #c4ccd6;
    border-radius: 8px;
  }

</style>
