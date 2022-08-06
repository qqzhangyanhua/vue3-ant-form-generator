/*
 * @Author: ZYH
 * @Date: 2022-08-06 18:21:09
 * @LastEditTime: 2022-08-06 20:25:31
 * @Description:
 */
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return () => (
      <div>
        <a-form labelCol={{ style: { width: '80px' } }} wrapperCol={{ span: 14 }}>
          <a-form-item label="表单名">
            <a-input />
          </a-form-item>
          <a-form-item label="表单模型">
            <a-input />
          </a-form-item>
          <a-form-item label="校验模型">
            <a-input />
          </a-form-item>
          <a-form-item label="表单尺寸">
            <a-radio-group button-style="solid">
              <a-radio-button value="a">中等</a-radio-button>
              <a-radio-button value="b">较小</a-radio-button>
              <a-radio-button value="c">迷你</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="标签对齐" wrapperCol={{ span: 18 }}>
            <a-radio-group button-style="solid">
              <a-radio-button value="a">左对齐</a-radio-button>
              <a-radio-button value="b">右对齐</a-radio-button>
              <a-radio-button value="c">顶部对齐</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="标签宽度" wrapperCol={{ span: 4 }}>
            <a-input-number />
          </a-form-item>
          <a-form-item label="栅格间隔" wrapperCol={{ span: 4 }}>
            <a-input-number />
          </a-form-item>
          <a-form-item label="禁用表单" wrapperCol={{ span: 4 }}>
            <a-switch />
          </a-form-item>
        </a-form>
      </div>
    );
  },
});
