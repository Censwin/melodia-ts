/*
 * @Date: 2021-11-17 14:47:57
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-24 14:42:42
 * @Description:
 * @FilePath: \melodia-ts\src\utils\tools.ts
 */

export const debounce = () => {};

export const getCount = (count: number) => {
  if (count < 0) return;
  if (count < 10000) return count;
  const a = Math.ceil(count / 10000);
  return `${a}万`;
};

export const getName = (nameArr: { name: string }[]) => {
  return nameArr.reduce((text, currentValue) => {
    return text + ' ' + currentValue.name;
  }, '');
};

export const isEmptyObject = (obj: any) => {
  return (
    !obj ||
    obj.constructor === Array ||
    (obj.constructor === Object && Object.keys(obj).length === 0)
  );
};
