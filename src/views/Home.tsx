import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import '../style/home.scss';
import { DownloadOutlined,CopyOutlined,DeleteOutlined,RightCircleOutlined,EyeOutlined } from '@ant-design/icons-vue';
import RightPanel from './RightPanel';
export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const leftComponents = reactive([
      {
        title: '输入型组件',
        list: [],
      },
      {
        title: '选择型组件',
        list: [],
      },
      {
        title: '布局型组件',
        list: [],
      },
    ]);
    return () => (
      <div class="container">
        <div class="left-board">
          <div class="logo-wrapper">
            <div class="logo">ZYH-Form Generator</div>
          </div>
          <div class="left-scrollbar">
            <div class="components-list">
              {leftComponents.map((item, index) => (
                <div>
                  <div class="components-title">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div class="center-board">
          <div class="action-bar">
            <a-button type="link" v-slots={{ icon: () => <RightCircleOutlined /> }}>
              运行
            </a-button>
            <a-button type="link" v-slots={{ icon: () => <EyeOutlined /> }}>
              查看json
            </a-button>
            <a-button type="link" v-slots={{ icon: () => <DownloadOutlined /> }}>
              导出vue文件
            </a-button>
            <a-button class="copy-btn-main" type="link" v-slots={{ icon: () => <CopyOutlined /> }}>
              复制代码
            </a-button>
            <a-button class="delete-btn" type="link" v-slots={{ icon: () => <DeleteOutlined /> }}>
              清空
            </a-button>
          </div>
          <div class="center-scrollbar">
            <a-row class="center-board-row">我是content</a-row>
          </div>
        </div>
        <RightPanel />
      </div>
    );
  },
});
