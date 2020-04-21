<template>
  <div class="main">
    <div class="main-banner">
      <div class="main-banner-title">
        <span>
          &nbsp;today 组件库
        </span>
      </div>
    </div>

    <div class="main-wrapper">
      <!--左侧菜单-->
      <div class="main-wrapper-sidebar">
        <ul class="menu-root">
          <li>
            <a class="main-wrapper-sidebar-link" href="javascript:javascript:void(0);">开始</a>
            <ul class="menu-sub">
              <li>
                <router-link to="/intro">介绍</router-link>
              </li>
              <li>
                <router-link to="/install">基本用法</router-link>
              </li>
            </ul>

            <a class="main-wrapper-sidebar-link" href="javascript:javascript:void(0);">组件</a>
            <ul class="menu-sub">
              <li v-for="menu in menuList" :key="menu.path">
                <router-link :to="menu.path">{{menu.name}}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <!--主体内容 Start-->
      <div class="main-wrapper-container">
        <router-view></router-view>
      </div>
      <!--主体内容 End-->
    </div>


    <!--回到顶部-->
    <div>
      <div class="main-back-top" v-show="showBackTop">
        <i @click="goBackTop()" class="icon iconfont icon-huidaodingbu-copy main-back-top-icon"></i>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: "App",
    data() {
      return {
        menuList:[],
        showBackTop: false,
        showHide: false // 是否显示内置组件
      };
    },
    methods: {
      goBackTop() {
        window.scroll(0, 0);
      },

      handleScroll() {
        var scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop ||
          window.scrollY;
        this.showBackTop = scrollTop > 600 ? true : false;
      },

      anchorLink(to) {
        let query = to.query;

        if (query && query.anchor) {
          this.$nextTick(() => {
            let anchor = this.$el.querySelector("#" + query.anchor);
            if (anchor && anchor.offsetTop) {
              window.scroll(0, anchor.offsetTop);
            }
          });
        }

      },

      // select、checkbox、dropdown 等组件都是内置的，showHide=1 则开启
      enableHideComp(to) {
        let query = to.query;

        if (query.showHide && query.showHide == 1) {
          this.showHide = true;
        }
      },
      getMenus() {
        const {routes} = this.$router.options
        this.menuList = routes.filter(route => !['/', '/intro', '/install'].includes(route.path))
      }
    },
    created() {
      this.getMenus()
    },
    mounted() {
      document.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
      document.removeEventListener("scroll", this.handleScroll);
    },
    watch: {
      $route(to) {
        this.anchorLink(to);
      }
    }
  };
</script>
