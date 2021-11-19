/*
 * @Date: 2021-11-17 14:47:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-18 15:33:05
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
