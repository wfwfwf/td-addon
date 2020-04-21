<template>
  <div :class="['td-button-row',styleName]">
    <slot></slot>
    <div class="td-button-between_left" v-if="align==='between'">
      <slot name="left"></slot>
    </div>
    <div class="td-button-between_right" v-if="align==='between'">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tdButtonRow",
    props: {
      align: {
        type: String,
        default: () => 'right'
      },
      style: {
        type: Object,
        default: () => null
      }
    },
    data() {
      return {
        styleName: ''
      }
    },
    created() {
      this.initStyle()
    },
    methods: {
      initStyle() {
        if (this.style) return
        this.styleName = `td-button-${this.align}`
      }
    }
  }
</script>

<style lang="scss">
  .td-button-row {
    width: 100%;

    &.td-button-left {
      text-align: left;
    }

    &.td-button-right {
      text-align: right;
    }

    &.td-button-between {
      display: flex;
      justify-content: space-between;

      .td-button-between_left {
        text-align: left;
      }
      .td-button-between_right {
        text-align: right;
      }
    }
  }
</style>
