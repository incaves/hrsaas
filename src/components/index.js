/**
 * 全局自定义组件注册
 */
import PageTools from "./PageTools";
import UploadExcel from "./UploadExcel";
export default {
  install(Vue) {
    //  注册全局的通用栏组件对象
    Vue.component("PageTools", PageTools);
    Vue.component("UploadExcel", UploadExcel); // 注册导入excel组件
  },
};
