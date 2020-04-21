## 打包

```  js 
yarn install    // 安装包
yarn run lib    // 打包 生成的文件在lib目录下
```

## 安装


### 如何在其他工程中引入此组件库

### 映射组件库

在此工程目录下采用yarn link 将工程映射到本地库, 然后在需要用到的工程下面使用 yarn link td-addon

### 如何引入工程
#### 1.引入组件库
```js
import tdAddon from 'td-addon'
Vue.use(tdAddon)
```

#### 2.引入样式文件
```js
import 'td-addon/packages/theme-chalk/index.scss'
```

#### 3.lodash的使用
lodash已挂载在Vue实例下
```js
let obj = { a: 1, b: 2, c: 3 }
console.log(this.$_.values(obj))
// [1,2,3]
```
具体用法请参考：[点击跳转](https://www.lodashjs.com/docs/4.17.5.html)

## 工程说明

### 一、目录结构
```html
    td-addon:.
    │  .browserslistrc
    │  .eslintrc.js
    │  .gitignore
    │  babel.config.js
    │  filetree.txt
    │  output.js
    │  package.json
    │  postcss.config.js
    │  README.md
    │  vue.config.js
    │  yarn.lock
    │       
    ├─examples // 文档站点目录
    │  │  App.vue
    │  │  main.js
    │  │  router.js  // 文档站点路由
    │  │  
    │  ├─assets
    │  │      
    │  ├─components    // 示例用到的组件
    │  │      
    │  ├─css
    │  │      
    │  └─doc  // 文档目录，以markdown格式书写 组件说明以及效果演示
    │        
    ├─lib  // 打包后的组件库
    │      
    ├─markdown  // 自定义markdown loader
    │      
    ├─node_modules  // 项目依赖
    │              
    ├─packages  // 组件库，组件源码在这里
    │  │  index.js
    │  │  
    │  ├─appNotes
    │  │      
    │  ├─appSearch
    │  │      
    │  ├─appTitle
    │  │      
    │  ├─appToolbar
    │  │      
    │  └─theme-chalk  // 组件库的公共样式文件
    │      │  index.scss
    │      │  
    │      ├─icon
    │      │      
    │      ├─image
    │      │      
    │      └─src
    │              element-refactor.scss
    │              element-variables.scss
    │              init.scss
    │              td-theme.scss
    │              
    └─public           
```



