// 组件全局注册

import TdNotes from './tdNotes'
import TdTitle from './tdTitle'
import TdToolbar from './tdToolbar'
import TdSearch from './tdSearch'
import TdImgsView from './tdImgsView'
import TdTableMixin from './tdTableMixin'
import TdTableTree from './tdTableTree'
import elementUi from 'element-ui'

import locale from 'element-ui/src/locale'
import Loading from "element-ui/packages/loading";
import MessageBox from "element-ui/packages/message-box";
import Notification from "element-ui/packages/notification";
import Message from "element-ui/packages/message";
// td addons
import tdMain from './tdMain'
import tdHeader from './tdHeader'
import tdButtonRow from './tdButtonRow'

// 树封装
import TdTable from './tdTable/table.vue'
// 级联树选择
import TdCascaderTree from './tdCascaderTree/tdCascaderTree.vue'
import TdDraggable from './tdDraggable/index'
import TdSvgIcon from './tdSvgIcon/index'
import TdDatePicker from './tdDatePicker'

const debounce = require('./util/debounce');
const toolbarFix = require('./util/toolbarFix');
require('./theme-chalk/index.scss')

// 引入lodash
const _ = require('lodash');
const version = elementUi.version
delete elementUi.install
delete elementUi.locale
delete elementUi.version
delete elementUi.Loading
delete elementUi.MessageBox
delete elementUi.Notification
delete elementUi.Message

/*
* element 的组件
* */
const eleComponents = _.values(elementUi)

/*
* td-addon自定义的组件,在此添加组件
* */
const tdComponents = [
    TdNotes,
    TdTitle,
    TdToolbar,
    TdSearch,
    TdImgsView,
    tdMain,
    tdHeader,
    tdButtonRow,
    TdTable,
    TdCascaderTree,
    TdDraggable,
    TdSvgIcon,
    TdDatePicker,
    TdTableMixin,
    TdTableTree
]
const Components = [...eleComponents, ...tdComponents]
/*
* 获取组件导出时Object
* */

let exportList = {}
Components.forEach(component => {
    if (component.name) {
        exportList[component.name] = component
    }
})

const install = function (vueInstra, opts = {}) {
    locale.use(opts.locale);
    locale.i18n(opts.i18n);
    Components.forEach(component => {
        if (component.name) {
            vueInstra.component(component.name, component);
        }
        
    });
    vueInstra.use(Loading.directive);
    vueInstra.prototype.$ELEMENT = {
        size: opts.size || '',
        zIndex: opts.zIndex || 2000
    };

    vueInstra.prototype.$loading = Loading.service;
    vueInstra.prototype.$msgbox = MessageBox;
    vueInstra.prototype.$alert = MessageBox.alert;
    vueInstra.prototype.$confirm = MessageBox.confirm;
    vueInstra.prototype.$prompt = MessageBox.prompt;
    vueInstra.prototype.$notify = Notification;
    vueInstra.prototype.$message = Message;
    vueInstra.prototype.$_ = _
    toolbarFix(exportList, vueInstra)
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default Object.assign({
    // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    install,
    version,
    locale: locale.use,
    i18n: locale.i18n,
    debounce: debounce,
}, exportList, { Loading, MessageBox, Notification, Message })