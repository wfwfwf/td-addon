# td-addon

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

选项：

  --open    在服务器启动时打开浏览器
  --copy    在服务器启动时将 URL 复制到剪切版
  --mode    指定环境模式 (默认值：development)
  --host    指定 host (默认值：0.0.0.0)
  --port    指定 port (默认值：8080)
  --https   使用 https (默认值：false)

### Compiles and minifies for production
```
yarn run build
```

用法：vue-cli-service build [options] [entry|pattern]

选项：

  --mode        指定环境模式 (默认值：production)
  --dest        指定输出目录 (默认值：dist)
  --modern      面向现代浏览器带自动回退地构建应用
  --target      app | lib | wc | wc-async (默认值：app)
  --name        库或 Web Components 模式下的名字 (默认值：package.json 中的 "name" 字段或入口文件名)
  --no-clean    在构建项目之前不清除目标目录
  --report      生成 report.html 以帮助分析包内容
  --report-json 生成 report.json 以帮助分析包内容
  --watch       监听文件变化

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### 打包
```
yarn run lib
```

### 查看webpack配置
```
vue inspect > output.js
```
### webpack配置说明(vue-cli3相关)
https://cli.vuejs.org/zh/guide/webpack.html

### 在docker下进行打包的命令

每个组件的添加，需要在doc下建对应的例子，参与doc下demo

服务器上需要 使用docker 、 yarn 进行打包的命令:

进入docker的命令
```
docker run -ti -v /data/htdoc:/data/htdoc c7-yarn-composer-node10.9:v1.0.5 sh
// 改为：
docker run -ti -v /data/htdoc:/data/htdoc harbor.today36524.td/biz/c7-yarn-composer-node10.9:v1.0.5 sh

cd /data/htdoc/weixin-app
yarn && yarn run build
```


如因为node版本太高，引起部分插件打包失败，可以尝试如下两条命令后，再进行yarn run build 打包
```
yarn config set ignore-engines true
yarn install --ignore-engines
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 组件引入

### 注意事项
在vue-cli3引入本组件库时，bable.config.js配置建议如下：

```
module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es6.promise',
        'es6.symbol'
      ],
      "modules": false,
      "useBuiltIns": "entry"
    }]
  ]
}


```



## 组件编写规范

### 组件命名规范
    统一采用小驼峰进行命名，并且name与文件名对应

### css命名规范
    统一采用BEM[规范](https://www.cnblogs.com/dujishi/p/5862911.html)， 并且组件class统一以td-开头， 如： td-notes


### 组件添加

