import { defineComponent, reactive } from 'vue';

import Draggable from 'vuedraggable';
import './about.css';
export default defineComponent({
  name: 'App',
  setup() {

      let list = reactive([
        { name: 'dog 1', id: 1 },
        { name: 'dog 2', id: 2 },
        { name: 'dog 3', id: 3 },
        { name: 'dog 4', id: 4 },
      ]);
      const list2 = reactive([
        { name: 'cat 5', id: 5 },
        { name: 'cat 6', id: 6 },
        { name: 'cat 7', id: 7 },
      ]);
      const onMoveCallback = (val:any) => {
        console.log('拖动前的索引 :' + val.moved.newIndex);
        console.log('拖动后的索引 :' + val.moved.oldIndex);
      };
      const getdata = (val:any) => {
        console.log(val.draggedContext.element.id);
      };
      // 查看最新的数据
      const handelChange = (e:any) => {
        console.log(e);
      };
    return () => (
      <>
        <a-button danger draggable>
          按钮
        </a-button>
        <div class="drag-box" style={{ display: 'flex' }}>
          <Draggable
            itemKey={'id'}
            class="dragArea list-group"
            list={list}
            on-move={onMoveCallback}
            on-end={getdata}
            group={{ name: 'people', pull: 'clone', put: false }}
            v-slots={{
              item: ({ element }: any) => <div class="items">1234 {element.name}</div>,
            }}
          ></Draggable>
          <Draggable
            class="dragArea list-group"
            itemKey={'id'}
            list={list2}
            group="people"
            on-move={onMoveCallback}
            v-slots={{
              item: ({ element }: any) => <div class="items">456 {element.name}</div>,
            }}
          ></Draggable>
        </div>
      </>
    );
  }
});