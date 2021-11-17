export const debounce = () => {};

export const getCount = (count: number) => {
  if (count < 0) return;
  if (count < 10000) return count;
  const a = Math.ceil(count / 10000);
  return `${a}万`;
};
