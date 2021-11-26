/*
 * @Date: 2021-11-17 14:47:57
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-26 15:31:56
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

export const filterRankList = (list: Array<any>) => {
  // const recommend = ['云音乐欧美热歌榜', '云音乐韩语榜', '美国Billboard榜']; // 推荐榜
  const choiceness = ['黑胶VIP爱听榜', '网络热歌榜', 'KTV唛榜']; // 精选榜
  const musicstyle = [
    '云音乐电音榜',
    '云音乐ACG榜',
    '云音乐说唱榜',
    '云音乐摇滚榜',
    '云音乐民谣榜',
    '云音乐国电榜',
    '云音乐古典榜',
    '云音乐古风榜',
    '中文DJ榜'
  ]; // 曲风榜
  const global = [
    '美国Billboard榜',
    'UK排行榜周榜',
    '日本Oricon榜',
    '法国 NRJ Vos Hits 周榜',
    '俄罗斯top hit流行音乐榜',
    '云音乐欧美新歌榜',
    '云音乐欧美热歌榜',
    '云音乐日语榜',
    '云音乐韩语榜',
    '俄语榜',
    '越南语榜'
  ]; // 全球榜
  let index;
  let officialList = []; // 官方榜
  let choicenessList = [];
  let musicstyleList = [];
  let globalList = [];
  let specialList = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].tracks.length && !list[i + 1].tracks.length) {
      index = i + 1;
      break;
    }
  }
  officialList = list.slice(0, index);
  let list2 = list.slice(index);
  for (const cur of list2) {
    if (choiceness.some((name) => name === cur.name)) {
      choicenessList.push(cur);
      continue;
    } else if (musicstyle.some((name) => name === cur.name)) {
      musicstyleList.push(cur);
      continue;
    } else if (global.some((name) => name === cur.name)) {
      globalList.push(cur);
      continue;
    } else {
      specialList.push(cur);
    }
  }
  return [officialList, choicenessList, musicstyleList, globalList, specialList];
};
