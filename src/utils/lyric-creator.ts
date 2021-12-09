/*
 * @Date: 2021-12-08 11:42:08
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-09 16:27:35
 * @Description:
 * @FilePath: \melodia-ts\src\utils\lyric-creator.ts
 */

const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;
interface ILineItem {
  time: number;
  text: string;
}
type Tplay = (offset: number, controllingProgress: boolean) => void;
type TPlayState = 'play' | 'pause';
class LyricFormater {
  public lines: ILineItem[];
  private lrc: string;
  private handle: Function;
  private playState: TPlayState;
  private currentIndex: number;
  private startStamp: number;
  private timer: any;
  public constructor(lrc: string, handle: Function) {
    this.lrc = lrc; // 原始数据
    this.handle = handle; // 回调函数
    this.lines = []; // 格式化后的数据
    this.playState = 'pause'; // 播放状态
    this.currentIndex = 0; // 当前行
    this.startStamp = 0; // 开始时间戳
    this.timer = 0;
    this.initLines();
  }

  /**
   * @param timing 当前播放进度， controllingProgress 是否在控制进度条
   */
  public play(timing = 0, controllingProgress = false) {
    if (!this.lines.length) {
      return;
    }
    this.playState = 'play';
    this.currentIndex = this.findCuurentIndex(timing);
    // 定位到行后将歌词传递给回调函数
    this.getCurrentLyric(this.currentIndex - 1);
    this.startStamp = Number(new Date()) - timing;
    if (this.currentIndex < this.lines.length) {
      clearTimeout(this.timer);
      this._playRest(controllingProgress);
    }
  }

  public ProgressControl(offset: number) {
    this.play(offset, true);
  }

  public togglePlay(timing: number) {
    if (this.playState === 'play') {
      this.stop();
    } else {
      this.playState = 'play';
      this.play(timing, true);
    }
  }

  public stop() {
    this.playState = 'pause';
    clearTimeout(this.timer);
  }

  private getCurrentLyric(index: number) {
    if (index < 0) return;
    this.handle({
      lineIndex: index,
      text: this.lines[index].text
    });
  }

  private findCuurentIndex(timing: number) {
    if (timing >= this.lines[this.lines.length - 1].time) {
      return this.lines.length - 1;
    } else {
      return this.lines.findIndex((item) => timing <= item.time);
    }
  }

  private initLines() {
    const lineArray = this.lrc.split('\n');
    for (let line of lineArray) {
      // '[00:00.000] 作词 : 无'
      let result = timeExp.exec(line);
      //   [
      //     "[00:00.000]",
      //     "00",
      //     "00",
      //     "000"
      // ]
      if (!result) continue;
      const text = line.replace(timeExp, '').trim(); // 去除时间戳

      if (text) {
        if (result[3].length === 3) {
          result[3] = result[3].slice(0, result[3].length - 1); // 截取两位
          this.lines.push({
            time:
              Number(result[1]) * 60 * 1000 +
              Number(result[2]) * 1000 +
              (Number(result[3]) || 0) * 10,
            text
          });
        }
      }
    }
    this.lines.sort((a, b) => a.time - b.time);
  }

  private _playRest(controllingProgress = false) {
    // 通过定时器定时触发回调函数
    let line = this.lines[this.currentIndex];
    let delay;
    if (controllingProgress) {
      delay = line.time - (Number(new Date()) - this.startStamp);
    } else {
      // 拿到上一行的歌词开始时间，算间隔
      let preTime = this.lines[this.currentIndex - 1] ? this.lines[this.currentIndex - 1].time : 0;
      delay = line.time - preTime;
    }
    this.timer = setTimeout(() => {
      this.getCurrentLyric(this.currentIndex++);
      if (this.currentIndex < this.lines.length && this.playState === 'play') {
        this._playRest();
      }
    }, delay);
  }
}

export default LyricFormater;
