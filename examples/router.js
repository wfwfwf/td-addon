import Vue from "vue"
import Router from "vue-router"
const intro = r => require.ensure([], () => r(require('./doc/intro.md')), 'intro')
const install = r => require.ensure([], () => r(require('./doc/install.md')), 'install')
const demo = r => require.ensure([], () => r(require('./doc/demo.md')), 'install')
const container = r => require.ensure([], () => r(require('./doc/container.md')), 'install')
const datePicker = r => require.ensure([], () => r(require('./doc/datePicker.md')), 'install')
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  // mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/intro' }, // 默认路由
    { path: '/intro', component: intro ,name:'简介'},
    { path: '/install', component: install ,name:'安装'},
    { path: '/demo', component: demo ,name:'示例'},
    { path: '/container', component: container ,name:'布局'},
    { path: '/datePicker', component: datePicker, name: '日期选择器' }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("./views/About.vue")
    // }
  ]
});
