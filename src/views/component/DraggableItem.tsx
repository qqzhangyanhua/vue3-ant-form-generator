/*
 * @Author: ZYH
 * @Date: 2022-08-08 08:59:32
 * @LastEditTime: 2022-08-10 09:35:42
 * @Description:
 */
import { defineComponent, h, resolveComponent } from 'vue';
import { activeItem, copyItem, deleteItem, setDefaultValue } from '../useDrawing';
import { CopyOutlined,DeleteOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  props: {
    currentItem: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: () => 0,
    },
  },
  emits: ['itemDeleted', 'itemCopy'],
  setup(props, { emit }) {
    const activeId = 1; //prop的
    const formConf: any = {};
    interface ALayout {
      colFormItem: Function;
      rowFormItem: Function;
      raw: Function;
    }
    const components = {
      itemBtns(h: any, currentItem: any, index: number, list: any) {
        return [
          <span
            class="drawing-item-copy"
            title="复制"
            onClick={(event) => {
              copyItem(currentItem, list, emit);
              event.stopPropagation();
            }}
          >
            <CopyOutlined />
          </span>,
          <span
            class="drawing-item-delete"
            title="删除"
            onClick={(event) => {
              deleteItem(props.index, list, emit);
              event.stopPropagation();
            }}
          >
            <DeleteOutlined />
          </span>,
        ];
      },
    };
    const layouts: ALayout = {
      colFormItem(h: any, currentItem: any, index: number, list: any) {
        const config = currentItem.__config__;
        const child = renderChildren(h, currentItem, index, list);
        let className =
          activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item';
        if (formConf.unFocusedComponentBorder) className += ' unfocus-bordered';
        let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
        if (config.showLabel === false) labelWidth = '0';
        return (
          <a-col
            span={config.span}
            class={className}
            nativeOnClick={(event: any) => {
              activeItem(currentItem);
              event.stopPropagation();
            }}
          >
            <a-form-item
              label-width={labelWidth}
              label={config.showLabel ? config.label : ''}
              required={config.required}
            >
              {h(resolveComponent(config.tag),{...currentItem.componentProps})}
              {/* <render key={config.renderKey} conf={currentItem} onInput={setDefaultValue}>
                {child}
              </render> */}
            </a-form-item>
            {components.itemBtns(h, currentItem, index, list)}
          </a-col>
        );
      },
      rowFormItem(h: any, currentItem: any, index: number, list: any) {
        const config = currentItem.__config__;
        const className =
          activeId === config.formId ? 'drawing-row-item active-from-item' : 'drawing-row-item';
        let child = renderChildren(h, currentItem, index, list) as any;
        if (currentItem.type === 'flex') {
          child = (
            <a-row type={currentItem.type} justify={currentItem.justify} align={currentItem.align}>
              {child}
            </a-row>
          );
        }
        return (
          <a-col span={config.span}>
            <a-row
              gutter={config.gutter}
              class={className}
              nativeOnClick={(event: any) => {
                activeItem(currentItem);
                event.stopPropagation();
              }}
            >
              <span class="component-name">{config.componentName}</span>
              <draggable
                list={config.children || []}
                animation={340}
                group="componentsGroup"
                class="drag-wrapper"
              >
                {child}
              </draggable>
              {components.itemBtns(h, currentItem, index, list)}
            </a-row>
          </a-col>
        );
      },
      raw(h: any, currentItem: any, index: number, list: any) {
        const config = currentItem.__config__;
        const child = renderChildren(h, currentItem, index, list);
        return (
          <render key={config.renderKey} conf={currentItem} onInput={setDefaultValue}>
            {child}
          </render>
        );
      },
    };
    function renderChildren(h: any, currentItem: any, index: any, list: any) {
      const config = currentItem.__config__;
      if (!Array.isArray(config?.children)) return null;
      return config.children.map((el: any, i: number) => {
        const lay = el.__config__.layout as any;
        // @ts-ignorets-ignore
        const layout = layouts[lay];
        if (layout) {
          return layout(h, el, i, config.children);
        }
        return layoutIsNotFound();
      });
    }

    function layoutIsNotFound() {
      throw new Error(`没有与${props.currentItem.__config__.layout}匹配的layout`);
    }
    const renderItem = () => {
      //@ts-ignore
      const layout = layouts[props.currentItem.__config__.layout];

      if (layout) {
        return layout(h, props.currentItem, 1, []);
      }
      return layoutIsNotFound.call(this);
    };
    return () => <div>{renderItem()}</div>;
  },
});
