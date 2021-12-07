/* eslint-disable react/no-this-in-sfc */
/*
 * @Date: 2021-12-06 10:11:17
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-07 14:56:11
 * @Description:
 * @FilePath: \melodia-ts\src\baseUI\musicNote\index.tsx
 */
import React, {
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle,
  ReactChild,
  ReactChildren,
  ReactNode
} from 'react';
import { Icon } from '../../components';
import { prefixStyle } from '../../utils/tools';
import animations from 'create-keyframe-animation';

const transform = prefixStyle('transform');

const MusicNote = forwardRef((props, refs) => {
  const WrapperRef = useRef(document.createElement('article'));
  const IconRef = useRef(null);
  let IconNum = 3;

  const RenderIcon = () => {
    return [1, 2, 3].map((item) => {
      return (
        <div key={item} className="icon-wrapper">
          <span>
            <Icon icon="music" />
          </span>
        </div>
      );
    });
  };
  const startAnimation = (y: number) => {
    if (!WrapperRef.current) return;
    for (let i = 0; i < IconNum; i++) {
      const items = Array.from(WrapperRef.current.querySelectorAll<HTMLElement>('.icon-wrapper'));
      let item: any = items[i];
      if (item.running === false) {
        item.style.left = '100px';
        item.style.top = y + 'px';
        item.style.display = 'inline-block';

        setTimeout(() => {
          item.running = true;
          item.style[transform] = `translate3d(0, 700px, 0)`;
          let icon = item.querySelector('span');
          icon.style[transform] = `translate3d(50vw, 0, 0)`;
        }, 0);
        break;
      }
    }
  };
  useEffect(() => {
    for (let i = 0; i < IconNum; i++) {
      const items = Array.from(WrapperRef.current.querySelectorAll<HTMLElement>('.icon-wrapper'));
      items.forEach((item: any) => {
        item.running = false;
        item.addEventListener(
          'transitionend',
          function (this: any) {
            this.style['display'] = 'none';
            this.style[transform as any] = `translate3d(0, 0, 0)`;
            this.running = false;
            let icon = this.querySelector('span');
            icon.style[transform as any] = `translate3d(0, 0, 0)`;
          },
          false
        );
      });
    }
  }, []);
  useImperativeHandle(refs, () => ({ startAnimation }));

  return (
    <article ref={WrapperRef} className="musicnote-wrapper">
      {RenderIcon()}
    </article>
  );
});

export default MusicNote;
