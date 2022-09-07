/*
 * @Author: ZYH
 * @Date: 2022-08-08 16:42:18
 * @LastEditTime: 2022-09-07 08:23:51
 * @Description:
 */

import { computed, defineComponent, ref } from 'vue';
import MonacoEditor from '../../components/MonacoEditor.vue';
import useClipboard from 'vue-clipboard3';
import { message } from 'ant-design-vue';
import { CopyOutlined, DownloadOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
import { saveAs } from 'file-saver';

export default defineComponent({
  props: {
    showVisible: {
      type: Boolean,
      default: false,
    },
    editorData: {
      type: String,
      default: '',
    },
    editorJsData:{
      type: String,
      default:''
    }
  },
  component: {
    MonacoEditor,
  },
  emits: ['closeFormDrawer'],
  setup(props, { emit }) {
    const { toClipboard } = useClipboard();
    const visible = computed({
      get() {
        return props.showVisible;
      },
      set() {
        emit('closeFormDrawer');
      },
    });
    const showModel = ref(false);
    const activeKey = ref('1');
    const fileName = ref(`${+new Date()}.json`);
    const showModelVal = computed(()=>{
        const val = activeKey.value === '1' ? props.editorData : props.editorJsData;
        return val

    })
    const handelCopy = async () => {

      try {
        const val = activeKey.value === '1' ? props.editorData : props.editorJsData;
        await toClipboard(val);
        message.success('复制成功！');
      } catch (e) {
        console.error(e);
      }
    };
    const handelExport = () => {
      showModel.value = true;
    };
    const handelTabChange = (e: string) => {
      console.log('eeeee', e);
    };
    const handelCloseModel = () => {
      console.log('eeee', fileName.value);
      if (!fileName.value) fileName.value = `${+new Date()}.json`;
      const codeStr = props.editorData;
      const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, fileName.value);
      showModel.value = false;
    };
    return () => (
      <a-drawer
        v-model={[visible.value, 'visible']}
        placement="right"
        width="100%"
        closable={false}
      >
        <div>
          <a-drawer
            class="form-drawers"
            v-model={[visible.value, 'visible']}
            placement="left"
            closable={false}
            width="50%"
          >
            <a-tabs v-model={[activeKey.value, 'activeKey']} type="card" onChange={handelTabChange}>
              <a-tab-pane key="1" tab="template"></a-tab-pane>
              <a-tab-pane key="2" tab="script" force-render></a-tab-pane>
              <a-tab-pane key="3" tab="css"></a-tab-pane>
            </a-tabs>
            {/*  @ts-ignore */}
            <MonacoEditor height="800px" modelValue={showModelVal.value} language="json" />
          </a-drawer>
          <a-drawer
            class="form-drawer"
            v-model={[visible.value, 'visible']}
            placement="right"
            closable={false}
            mask={false}
            width="50%"
          >
            <div>
              <a-space class="form-drawer-container">
                <a-button
                  type="link"
                  onClick={handelCopy}
                  v-slots={{ icon: () => <CopyOutlined /> }}
                >
                  复制
                </a-button>
                <a-button
                  type="link"
                  onClick={handelExport}
                  v-slots={{ icon: () => <DownloadOutlined /> }}
                >
                  导出json
                </a-button>
                <a-button
                  type="link"
                  onClick={() => emit('closeFormDrawer')}
                  danger
                  v-slots={{ icon: () => <CloseCircleOutlined /> }}
                >
                  关闭
                </a-button>
              </a-space>
            </div>
          </a-drawer>
        </div>
      </a-drawer>
    );
  },
});
