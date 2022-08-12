/*
 * @Author: ZYH
 * @Date: 2022-08-11 19:45:32
 * @LastEditTime: 2022-08-11 19:48:45
 * @Description: 
 */
import loadScript from './loadScript';

import pluginsConfig from './pluginsConfig';

// monaco-editor单例
let monacoEidtor:any;

/**
 * 动态加载monaco-editor cdn资源
 * @param {Function} cb 回调，必填
 */
export default function loadMonaco(cb: any) {
  if (monacoEidtor) {
    cb(monacoEidtor);
    return;
  }
  // @ts-ignore
  const { monacoEditorUrl: vs } = pluginsConfig;

  // @ts-ignore
  !window.require && (window.require = {});
  // @ts-ignore
  !window.require.paths && (window.require.paths = {});
  // @ts-ignore
  window.require.paths.vs = vs;

  loadScript(`${vs}/loader.js`, () => {
    // @ts-ignore
    window.require(['vs/editor/editor.main'], () => {
      // @ts-ignore
      monacoEidtor = window.monaco;
      cb(monacoEidtor);
    });
  });
}
