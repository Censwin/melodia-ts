/*
 * @Date: 2021-12-06 10:11:17
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-06 15:51:11
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
  const RenderIcon = () => {
    return [1, 2, 3].map((item) => {
      return (
        <div key={item} className="icon-wrapper" style={{ display: 'none' }}>
          <Icon icon="coffee" />
        </div>
      );
    });
  };
  const startAnimation = () => {
    if (!WrapperRef.current) return;
    const items = Array.from(WrapperRef.current.querySelectorAll<HTMLElement>('.icon-wrapper'));
    const item = items[0];
    item.style.left = '10px';
    item.style.top = '200px';
    item.style.display = 'inline-block';
    let animation = {
      0: {
        transform: `translate3d(0, 0, 0)`
      },
      10: {
        transform: `translate3d(10vw, -30px, 0)`
      },
      20: {
        transform: `translate3d(20vw, -50px, 0)`
      },
      30: {
        transform: `translate3d(30vw, -70px, 0)`
      },
      40: {
        transform: `translate3d(40vw, -50px, 0)`
      },
      50: {
        transform: `translate3d(50vw, -30px, 0)`
      },
      100: {
        transform: `translate3d(50vw, 100vh, 0)`
      }
    };
    animations.registerAnimation({
      name: 'flowdown',
      animation,
      presets: {
        duration: 1000,
        easing: 'linear'
      }
    });
    setTimeout(() => {
      // item.style[transform as any] = `translate3d(50px, 50px, 0)`;
      animations.runAnimation(item, 'flowdown');
    }, 0);
    // let children = React.Children.toArray((WrapperRef.current.children) as HTMLCollectionOf<HTMLElement>);
    // const item: ReactNode = children[0]
    // item.style.display = "inline-block";
    // setTimeout(() => {
    //   item
    // }, 0);
  };
  useEffect(() => {
    console.log(WrapperRef.current);
  }, []);
  useImperativeHandle(refs, () => ({ startAnimation }));

  return (
    <article ref={WrapperRef} className="musicnote-wrapper">
      {RenderIcon()}
    </article>
  );
});

export default MusicNote;
