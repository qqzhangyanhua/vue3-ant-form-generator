/*
 * @Author: ZYH
 * @Date: 2022-08-11 09:27:54
 * @LastEditTime: 2022-08-11 09:30:26
 * @Description:
 */
const callbacks = {};

/**
 * 加载一个远程脚本
 * @param {String} src 一个远程脚本
 * @param {Function} callback 回调
 */
function loadScript(src:string, callback:Function) {
  const existingScript = document.getElementById(src);
  const cb = callback || (() => {});
  if (!existingScript) {
    // @ts-ignore
    callbacks[src] = [];
    const $script = document.createElement('script');
    $script.src = src;
    $script.id = src;
    // @ts-ignore
    $script.async = 1;
    document.body.appendChild($script);
    const onEnd = 'onload' in $script ? stdOnEnd.bind($script) : ieOnEnd.bind($script);
    onEnd($script);
  }
  // @ts-ignore
  callbacks[src].push(cb);

  function stdOnEnd(script:any) {
    script.onload = () => {
      // @ts-ignore
      this.onerror = this.onload = null;
      // @ts-ignore
      callbacks[src].forEach((item: any) => {
        item(null, script);
      });
      // @ts-ignore
      delete callbacks[src];
    };
    script.onerror = () => {
      // @ts-ignore
      this.onerror = this.onload = null;
      cb(new Error(`Failed to load ${src}`), script);
    };
  }

  function ieOnEnd(script:any) {
    script.onreadystatechange = () => {
      // @ts-ignore
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') return;
      // @ts-ignore
      this.onreadystatechange = null;
      // @ts-ignore
      callbacks[src].forEach((item) => {
        item(null, script);
      });
      // @ts-ignore
      delete callbacks[src];
    };
  }
}

/**
 * 顺序加载一组远程脚本
 * @param {Array} list 一组远程脚本
 * @param {Function} cb 回调
 */
export function loadScriptQueue(list:any, cb:any) {
  const first = list.shift();
  list.length ? loadScript(first, () => loadScriptQueue(list, cb)) : loadScript(first, cb);
}

export default loadScript;
