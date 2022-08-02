import { defineComponent, reactive } from 'vue';

import Draggable from 'vuedraggable';
import './about.css';
export default defineComponent({
  name: 'App',
  setup() {

      let list = reactive([
        {
          label: '模块1',
          id: 1,
          isflod: false,
        },
        {
          label: '模块2',
          id: 2,
          isflod: false,
        },
        {
          label: '模块3',
          id: 3,
          isflod: false,
        },
        {
          label: '模块4',
          id: 4,
          isflod: false,
        },
        {
          label: '模块5',
          id: 5,
          isflod: false,
        },
        {
          label: '模块6',
          id: 6,
          isflod: false,
        },
      ]);
      const onMoveCallback = (val:any) => {
        console.log('拖动前的索引 :' + val.moved.newIndex);
        console.log('拖动后的索引 :' + val.moved.oldIndex);
      };
      const getdata = (val:any) => {
        console.log(val.draggedContext.element.id);
      };
      // 查看最新的数据
      const submit = () => {
        console.log(list);
      };
    return () => (
      <>
        <a-button danger>按钮</a-button>
        <div class="drag-box">
          <Draggable
            itemKey={'id'}
            list={list}
            on-move={onMoveCallback}
            on-end={getdata}
            v-slots={{ item: (element: any) => <div class="items">1234 {element.id}</div> }}
          ></Draggable>
        </div>
      </>
    );
  }
});