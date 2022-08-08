import { defineComponent, reactive, ref } from 'vue';
import '../style/home.scss';
import {
  DownloadOutlined,
  CopyOutlined,
  DeleteOutlined,
  RightCircleOutlined,
  EyeOutlined,
  KeyOutlined,
} from '@ant-design/icons-vue';
import RightPanel from './RightPanel';
import Draggable from 'vuedraggable';
import DraggableItem from './component/DraggableItem';
import JsonDrawer from './component/JsonDrawer';
import { inputComponents, selectComponents, layoutComponents, formConf } from '../config/config';
 import { cloneDeep } from 'lodash-es';
export default defineComponent({
  name: 'App',
  setup() {
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
    const drawingList = reactive([...inputComponents]);
    //复制单个
    const handelItemDelete = (index: number) => {
      console.log(index, drawingList);
      drawingList.splice(index, 1);
    };
    // 拷贝单个
    const handelItemCopy = (currentItem:any)=>{
      const obj = cloneDeep(currentItem);
      drawingList.push(obj);
      console.log(currentItem)
    }
    const handelRun = () => {
      console.log('run', drawingList);
    };
    const handelShowJson = () => {
      console.log('showJson');
      showVisible.value = true;
    };
    const handelExport = () => {
      console.log('export');
    };
    const handelCopy = () => {
      console.log('copy');
    };
    const handelDelete = () => {
      console.log('delete');
    };
    const addComponent = (component: any) => {
      console.log('addComponent', component);
    };
    const showVisible = ref(false)
    const closeJsonDrawer = ()=>{
      showVisible.value = false;
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
                  <Draggable
                    itemKey={'id'}
                    class="dragArea list-group"
                    list={item.list}
                    group={{ name: 'componentsGroup', pull: 'clone', put: false }}
                    v-slots={{
                      item: ({ element }: any) => (
                        <div class="components-item" onClick={addComponent.bind(this, element)}>
                          <div class="components-body">{element.__config__.label}</div>
                        </div>
                      ),
                    }}
                  ></Draggable>
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
              <a-form class="center-board-row-form">
                <Draggable
                  class="drawing-board"
                  itemKey={'id'}
                  list={drawingList}
                  animation={340}
                  group="componentsGroup"
                  v-slots={{
                    item: ({ element, index }: any) => (
                      <div class="" onClick={addComponent.bind(this, element)}>
                        {/* <div class="">{element.__config__.label}</div> */}
                        <DraggableItem
                          currentItem={element}
                          index={index}
                          onItemDeleted={handelItemDelete}
                          onItemCopy={handelItemCopy}
                        />
                      </div>
                    ),
                  }}
                />
                <div v-show={drawingList.length == 0} class="empty-info">
                  从左侧拖入或点选组件进行表单设计
                </div>
              </a-form>
            </a-row>
          </div>
        </div>
        {/* 右侧 */}
        <RightPanel />
        {/* jsonDrawer */}
        <JsonDrawer showVisible={showVisible.value} onCloseJsonDrawer={closeJsonDrawer} />
      </div>
    );
  },
});
