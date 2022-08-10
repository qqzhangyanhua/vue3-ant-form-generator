/*
 * @Author: ZYH
 * @Date: 2022-08-06 11:30:56
 * @LastEditTime: 2022-08-10 07:30:40
 * @Description:
 */
import { defineComponent, ref, resolveComponent, h } from 'vue';
import './RightPanel.scss';
import TabField from './component/TabField';
import TabForm from './component/TabForm';
export default defineComponent({
  components: {
    TabField,
    TabForm,
  },
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
    formConfigs:{
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const currentTab = ref('field');
    const handelChange = ()=>{
      console.log(props)
    }
    return () => (
      <div class="right-board">
        <a-tabs v-model={[currentTab.value, 'activeKey']} class="center-tabs" onChange ={handelChange}>
          <a-tab-pane tab="组件属性" key="field" />
          <a-tab-pane tab="表单属性" key="form" />
        </a-tabs>
        {h(resolveComponent(currentTab.value === 'field' ? 'TabField' : 'TabForm'), {
          activeData: props.activeData,
          formConfigs: props.formConfigs,
        })}
      </div>
    );
  },
});
