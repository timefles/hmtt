import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
// import 'vant/lib/index.css'
import "vant/lib/index.less";
import "amfe-flexible";
// import '@/styles/icon.less'
// import '@/styles/reset.less'
import "@/styles/index.less";
// 一次性把filters/index.js中所有的按需要导出全部导出来
// 作为obj的属性
import * as obj from "@/filiters";
import FollowUser from "@/components/FollowUser.vue";

Vue.component(FollowUser.name, FollowUser);
Object.keys(obj).forEach((key) => {
  Vue.filter(key, obj[key]);
});
Vue.use(Vant);

Vue.config.productionTip = false;
import '@/components';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
