import { computed, defineComponent, h, ref, resolveComponent } from 'vue';
import {Modal} from 'ant-design-vue';
import '../../style/icon-dialog.scss'
import * as AntIcon from '@ant-design/icons-vue';

export default defineComponent({
  props: {
    visible:{
        type:Boolean,
        default:false,
    }
  },
  emits:['update:visible'],
  setup(props,{emit}) {
    //const visible = ref(true);
    const handelClick = () => {
      const val = Object.keys(AntIcon);
      console.log('sdasdasdasd', val);
    };
    const showVisible = computed({
        get:()=>{
            return props.visible
        },
        set:(val)=>{
            emit('update:visible',val)
        }
    })
    return () => (
      <Modal v-model={[showVisible.value, 'visible']} title="选择图标">
        <a-button onClick={handelClick}>按钮</a-button>
        <ul class="icon-dialog">
          {Object.keys(AntIcon).map((el) => (
            <li>{h(resolveComponent(el))}</li>
          ))}
        </ul>
      </Modal>
    );
  },
});
