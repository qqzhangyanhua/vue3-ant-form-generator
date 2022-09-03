/*
 * @Author: ZYH
 * @Date: 2022-08-11 09:58:05
 * @LastEditTime: 2022-09-03 08:50:01
 * @Description: 
 */

// 首字母大小
export function titleCase(str:string) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}
export const exportDefault = 'export default ';
export const isArray=(value:any)=>{
  return Array.isArray(value)
}
// 下划转驼峰
export function camelCase(str:string) {
  return str.replace(/-[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}
export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true,
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true,
  },
};