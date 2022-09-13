import { createApp } from 'vue';
import App from './App';
import router from './router';
import Antd from 'ant-design-vue';
import store from './store';
import './style/index.scss';
import * as AntIcon from '@ant-design/icons-vue';
import 'ant-design-vue/dist/antd.css';
const app = createApp(App);
for (let i in AntIcon) {
  app.component(`${i}`, (AntIcon as any)[i]);
}
app.use(router).use(Antd).use(store).mount('#app');
