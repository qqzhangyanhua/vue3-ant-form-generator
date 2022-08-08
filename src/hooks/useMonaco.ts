/*
 * @Author: ZYH
 * @Date: 2022-08-08 17:55:43
 * @LastEditTime: 2022-08-08 18:33:51
 * @Description: 
 */
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

export default function useMonaco(language = 'json') {
  let monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null;
  let initReadOnly = false;
  const updateVal = async (val: string) => {
    monacoEditor?.setValue(val);
    setTimeout(async () => {
      initReadOnly && monacoEditor?.updateOptions({ readOnly: false });
      await monacoEditor?.getAction('editor.action.formatDocument')?.run();
      initReadOnly && monacoEditor?.updateOptions({ readOnly: true });
    }, 100);
  };

  const createEditor = (
    el: HTMLElement | null,
    editorOption: monaco.editor.IStandaloneEditorConstructionOptions = {},
  ) => {
    if (monacoEditor) {
      return;
    }
    initReadOnly = !!editorOption.readOnly;
    monacoEditor =
      el &&
      monaco.editor.create(el, {
        language,
        minimap: { enabled: false },
        theme: 'vs-dark',
        multiCursorModifier: 'ctrlCmd',
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
        tabSize: 2,
        automaticLayout: true, // 自适应宽高
        fontSize: 16, //字体大小
        renderLineHighlight: 'all', // 行亮
        selectOnLineNumbers: true, // 显示行号
        ...editorOption,
      });
    return monacoEditor;
  };
  const onFormatDoc = () => {
    monacoEditor?.getAction('editor.action.formatDocument')?.run();
  };
  return {
    updateVal,
    getEditor: () => monacoEditor,
    createEditor,
    onFormatDoc,
  };
}