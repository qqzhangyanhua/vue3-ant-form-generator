/*
 * @Author: ZYH
 * @Date: 2022-08-11 09:30:43
 * @LastEditTime: 2022-08-11 09:53:20
 * @Description:
 */
import loadScript from './loadScript';
import pluginsConfig from './pluginsConfig';

let beautifierObj: any;

export default function loadBeautifier(cb: any) {
  const { beautifierUrl } = pluginsConfig;
  if (beautifierObj) {
    cb(beautifierObj);
    return;
  }

  loadScript(beautifierUrl, () => {
    // eslint-disable-next-line no-undef
    // @ts-ignore
    beautifierObj = beautifier;
    cb(beautifierObj);
  });
}
