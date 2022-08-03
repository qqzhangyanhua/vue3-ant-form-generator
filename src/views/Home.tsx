import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import '../style/home.scss';
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
            <div class="logo">Form Generator</div>
          </div>
          <div class="left-scrollbar">
            <div class="components-list">
              {leftComponents.map((item, index) => (
                <div>
                  <div class="components-title">
                    <svg-icon icon-class="component" />
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div class="center-board">
          <div class="action-bar">
            <a-button type="text">运行</a-button>
            <a-button type="text">查看json</a-button>
            <a-button type="text">导出vue文件</a-button>
            <a-button class="copy-btn-main" type="text">
              复制代码
            </a-button>
            <a-button class="delete-btn" type="text">
              清空
            </a-button>
          </div>
        </div>
      </div>
    );
  },
});
