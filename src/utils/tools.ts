/*
 * @Date: 2021-11-17 14:47:57
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-23 16:15:54
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
