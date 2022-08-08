/*
 * @Author: ZYH
 * @Date: 2022-08-08 09:07:55
 * @LastEditTime: 2022-08-08 16:07:28
 * @Description: 
 */
export const copyItem = (currentItem: any,list: any,emit:any) => {
    emit('itemCopy', currentItem);
}
export const deleteItem = (index: any, list: any,emit:any) => {
  emit('itemDeleted',index);
};
export const setDefaultValue = (e: any)=>{
    console.log('setDefaultValue',e)
}
export const activeItem = (currentItem: any)=>{
    console.log('activeItem',currentItem)
}