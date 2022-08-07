import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import '../style/home.scss';
import { DownloadOutlined,CopyOutlined,DeleteOutlined,RightCircleOutlined,EyeOutlined ,KeyOutlined} from '@ant-design/icons-vue';
import RightPanel from './RightPanel';
import { inputComponents, selectComponents, layoutComponents, formConf } from '../config/config';
export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const leftComponents = reactive([
      {
        title: '输入型组件',
        list: inputComponents,
      },
      {
        title: '选择型组件',
        list: selectComponents,
      },
      {
        title: '布局型组件',
        list: layoutComponents,
      },
    ]);
   const drawingList = reactive([]);
    const handelRun = () => {
      console.log('run');
      
    }
    const handelShowJson= ()=>{
      console.log('showJson');
    }
    const handelExport = ()=>{
      console.log('export');
    }
    const handelCopy = ()=>{
      console.log('copy');
    }
    const handelDelete =()=>{
      console.log('delete');
    }
    const addComponent = (component:any) => {
    console.log('addComponent',component)
    }
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
                  <div class="components-title">
                    <KeyOutlined />
                    {item.title}
                  </div>
                  {item.list.map((element) => (
                    <div class="components-item" onClick={addComponent.bind(this, element)}>
                      <div class="components-body">{element.__config__.label}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div class="center-board">
          <div class="action-bar">
            <a-button
              type="link"
              onClick={handelRun}
              v-slots={{ icon: () => <RightCircleOutlined /> }}
            >
              运行
            </a-button>
            <a-button
              type="link"
              onClick={handelShowJson}
              v-slots={{ icon: () => <EyeOutlined /> }}
            >
              查看json
            </a-button>
            <a-button
              type="link"
              onClick={handelExport}
              v-slots={{ icon: () => <DownloadOutlined /> }}
            >
              导出vue文件
            </a-button>
            <a-button
              class="copy-btn-main"
              onClick={handelCopy}
              type="link"
              v-slots={{ icon: () => <CopyOutlined /> }}
            >
              复制代码
            </a-button>
            <a-button
              class="delete-btn"
              onClick={handelDelete}
              type="link"
              v-slots={{ icon: () => <DeleteOutlined /> }}
            >
              清空
            </a-button>
          </div>
          <div class="center-scrollbar">
            <a-row class="center-board-row">
              <a-form>
                <div v-show={drawingList.length==0} class="empty-info">
                  从左侧拖入或点选组件进行表单设计
                </div>
              </a-form>
            </a-row>
          </div>
        </div>
        <RightPanel />
      </div>
    );
  },
});
