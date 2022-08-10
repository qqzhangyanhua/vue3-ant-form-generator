/*
 * @Author: ZYH
 * @Date: 2022-08-08 16:42:18
 * @LastEditTime: 2022-08-10 07:02:49
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
    jsonList: {
      type: String,
      default: '',
    },
  },
  component: {
    MonacoEditor,
  },
  emits: ['closeJsonDrawer'],
  setup(props, { emit }) {
    const { toClipboard } = useClipboard();
    const visible = computed({
      get() {
        return props.showVisible;
      },
      set() {
        emit('closeJsonDrawer');
      },
    });
    const showModel = ref(false);
    const fileName = ref(`${+new Date()}.json`);
    const editorData = `{
        "a":1,"b":2}`;
    const handelCopy = async () => {
      console.log('drawingList', props.jsonList);
      try {
        await toClipboard(editorData);
        message.success('复制成功！');
      } catch (e) {
        console.error(e);
      }
    };
    const handelExport = () => {
      showModel.value = true;
    };
    const handelCloseModel = () => {
      console.log('eeee', fileName.value);
      if (!fileName.value) fileName.value = `${+new Date()}.json`;
      const codeStr = editorData;
      const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, fileName.value);
      showModel.value = false;
    };
    return () => (
      <a-drawer
        v-model={[visible.value, 'visible']}
        placement="right"
        size="large"
        closable={false}
      >
        <a-space>
          <a-button type="link" onClick={handelCopy} v-slots={{ icon: () => <CopyOutlined /> }}>
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
            onClick={() => emit('closeJsonDrawer')}
            danger
            v-slots={{ icon: () => <CloseCircleOutlined /> }}
          >
            关闭
          </a-button>
        </a-space>
        {/*  @ts-ignore */}
        <MonacoEditor height="800px" modelValue={editorData} language="json" />
        <a-modal
          v-model={[showModel.value, 'visible']}
          onOk={handelCloseModel}
          centered
          cancelText="取消"
          okText="确定"
        >
          <h3>文件名：</h3>
          <a-input placeholder="请输入" v-model={[fileName.value, 'value']}></a-input>
        </a-modal>
      </a-drawer>
    );
  },
});
