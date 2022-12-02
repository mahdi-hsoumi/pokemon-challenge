import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
require("@/assets/main.scss");
import Pagination from "v-pagination-3";

const app = createApp(App);

app.use(router);

app.use(VueAxios, axios);
app.provide("axios", app.config.globalProperties.axios);
// eslint-disable-next-line vue/multi-word-component-names
app.component("pagination", Pagination);

app.mount("#app");
