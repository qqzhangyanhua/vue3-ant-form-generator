/*
 * @Author: ZYH
 * @Date: 2022-08-06 18:21:09
 * @LastEditTime: 2022-08-06 20:39:09
 * @Description:
 */
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return () => (
      <div class="field-box">
        <a-form labelCol={{ style: { width: '80px' } }} wrapperCol={{ span: 14 }}>
          <a-form-item label="组件类型">
            <a-select></a-select>
          </a-form-item>
          <a-form-item label="字段名">
            <a-input />
          </a-form-item>
          <a-form-item label="标题">
            <a-input />
          </a-form-item>
          <a-form-item label="占位提示">
            <a-input />
          </a-form-item>
          <a-form-item label="表格栅格">
            <a-slider />
          </a-form-item>
          <a-form-item label="标签宽度" wrapperCol={{ span: 4 }}>
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
          <a-form-item label="最多输入" wrapperCol={{ span: 4 }}>
            <a-input-number />
          </a-form-item>
          <a-form-item label="显示标签" wrapperCol={{ span: 4 }}>
            <a-switch />
          </a-form-item>
          <a-form-item label="是否只读" wrapperCol={{ span: 4 }}>
            <a-switch />
          </a-form-item>
          <a-form-item label="是否禁用" wrapperCol={{ span: 4 }}>
            <a-switch />
          </a-form-item>
        </a-form>
      </div>
    );
  },
});
