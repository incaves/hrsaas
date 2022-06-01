import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css
import * as directives from "@/directives"; // 导出全部
import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;
// 注册自定义指令
// 转换为数组并进行遍历注册
Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key]);
});
// 注册所有的全局自定义组件 在index.js
import Component from "@/components";
Vue.use(Component);
import * as filters from "@/filters"; // 引入工具类
// 注册全局的过滤器
Object.keys(filters).forEach((key) => {
  // 注册过滤器
  Vue.filter(key, filters[key]);
});
new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
