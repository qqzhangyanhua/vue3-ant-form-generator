/*
 * @Author: ZYH
 * @Date: 2022-08-06 18:21:09
 * @LastEditTime: 2022-08-10 09:53:40
 * @Description:
 */
import { computed, defineComponent } from 'vue';
export default defineComponent({
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
    formConfigs: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const formList:any = computed({
      get(){
        console.log('props.activeData;',props);
        return props.activeData;
      },
      set(){
        
      }
    })
    return () => (
      <div class="field-box">
        <a-form labelCol={{ style: { width: '80px' } }} wrapperCol={{ span: 14 }}>
          <a-form-item label="字段名">
            <a-input />
          </a-form-item>
          <a-form-item label="标题">
            <a-input v-model={[formList.value.__config__.label, 'value']} maxlength={14} />
          </a-form-item>
          <a-form-item label="占位提示">
            <a-input v-model={[formList.value.componentProps.placeholder, 'value']} />
          </a-form-item>
          <a-form-item label="表格栅格">
            <a-slider v-model={[formList.value.__config__.span, 'value']} max={24} />
          </a-form-item>
          <a-form-item label="标签宽度" wrapperCol={{ span: 4 }} min={0}>
            <a-input-number />
          </a-form-item>
          <a-form-item label="默认值">
            <a-input />
          </a-form-item>
          <a-form-item label="前图标">
            <a-input />
          </a-form-item>
          <a-form-item label="后图标">
            <a-input />
          </a-form-item>
          <a-form-item label="最多输入" wrapperCol={{ span: 12 }}>
            <a-input-number
              v-model={[formList.value.componentProps.maxlength, 'value']}
              min={1}
              addon-after='个字符'
            />
          </a-form-item>
          <a-form-item label="显示标签" wrapperCol={{ span: 4 }}>
            <a-switch />
          </a-form-item>
          <a-form-item label="是否只读" wrapperCol={{ span: 4 }}>
            <a-switch v-model={[formList.value.componentProps.readonly, 'checked']} />
          </a-form-item>
          <a-form-item label="是否禁用" wrapperCol={{ span: 4 }}>
            <a-switch v-model={[formList.value.componentProps.disabled, 'checked']} />
          </a-form-item>
        </a-form>
      </div>
    );
  },
});
