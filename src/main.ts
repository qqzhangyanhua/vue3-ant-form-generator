import { createApp } from 'vue';
import App from './App';
import router from './router';
import Antd from 'ant-design-vue';
import store from './store';
import '@/style/index.scss';
import 'ant-design-vue/dist/antd.css';
createApp(App).use(router).use(Antd).use(store).mount('#app');
