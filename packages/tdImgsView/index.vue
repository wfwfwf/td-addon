<template>
  <div class="td-imgs-view">
    <el-carousel
      v-if="imgs && imgs.length > 0"
      trigger="click"
      :height="height + 'px'"
      :interval="interval"
      :autoplay="autoplay"
      :arrow="imgs && imgs.length > 1 ? 'hover' : 'never'"
    >
      <el-carousel-item v-for="(item , index) in imgs" :key="index">
        <img :class="[ ( needShowImgDetail || imgTapCallback ) ? 'can_click' : '']" :src="item" @click="clickImg(index,item)">
      </el-carousel-item>
    </el-carousel>
    <!-- 大图查看dialog -->
    <el-dialog title="图片明细" :visible.sync="isShowImgDetail">
        <img :src="detailSrc"  />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tdImgsView",
  props: {
    // 图片列表
    imgs: {
      type: Array,
      default: null
    },
    // 控件高度
    height: {
      type: [String, Number],
      default: 100
    },
    // 自动轮播时间
    interval: {
      type: [String, Number],
      default: 5000
    },
    // 是否自动轮播
    autoplay: {
      type: Boolean,
      default: true
    },
    // 是否需要点击图片后，查看大图
    needShowImgDetail: {
      type: Boolean,
      default: true
    },
    // 图片点击后，回调函数（PS：此处是通过参数传入，在父组件传入时，记得加入bind(this) , 传入参数为索引和图片URL）
    imgTapCallback: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      isShowImgDetail: false ,  // 是否显示图片明细
      detailSrc: ""     // 大图URL
    };
  },
  methods: {
    //   点击图片放大
    clickImg(index, src) {
      if (!src) return;
      //  执行回调函数
      if (this.imgTapCallback && typeof this.imgTapCallback === "function") {
        this.imgTapCallback(index, src);
      }
      // 查看大图
      if (this.needShowImgDetail) {
          this.detailSrc = src
          this.$nextTick(() => {
              this.isShowImgDetail = true
          })
      }
    }
  }
};
</script>

<style lang="scss" >
.td-imgs-view {
    text-align: center;
  img {
    height: 100%;
    &.can_click{
        cursor: pointer;
    }
  }
}
</style>