/*
 * @Author: Censwin
 * @Date: 2021-09-05 15:23:27
 * @LastEditTime: 2021-12-07 17:42:14
 * @Description: 通用滚动组件
 * @FilePath: \melodia-ts\src\baseUI\Scroll\scroll.tsx
 */
import * as React from 'react';
import BScroll from 'better-scroll';
import classNames from 'classnames';
export interface ScrollImperativeHandle {
  finishPullDown: Function;
  getBScroll: Function;
  refresh: Function;
}

interface SrcollPropsType {
  direction: string;
  click: boolean;
  onScroll: any; // 滑动触发的回调函数
  pullUp: any; // 上拉加载逻辑
  pullDown: any; // 下拉加载逻辑
  pullUpLoading: boolean; // 是否显示上拉 loading 动画
  pullDownLoading: boolean; // 是否显示下拉 loading 动画
  bounceTop: boolean; // 是否支持向上吸顶
  bounceBottom: boolean; // 是否支持向下吸底
  children: React.ReactNode;
  refresh: Function;
}

const Scroll = React.forwardRef<ScrollImperativeHandle, Partial<SrcollPropsType>>((props, ref) => {
  const [bScroll, setBScroll] = React.useState<BScroll | null>();
  const scrollContaninerRef = React.useRef<HTMLDivElement | null>(null);

  const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } =
    props;

  const { pullUp, pullDown, onScroll } = props;

  React.useEffect(() => {
    if (bScroll) return;
    const scroll = new BScroll(scrollContaninerRef.current as HTMLDivElement, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
  }, []);

  React.useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  React.useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', onScroll);
    return () => {
      bScroll.off('scroll', onScroll);
    };
  }, [onScroll, bScroll]);

  React.useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    };
  }, [pullUp, bScroll]);

  React.useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (pos: { y: number }) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off('touchEnd');
    };
  }, [pullDown, bScroll]);

  React.useImperativeHandle(ref, () => ({
    refresh: () => {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll: () => {
      if (bScroll) {
        return bScroll;
      }
    },
    finishPullDown() {
      if (bScroll) {
        // setBeforePullDown(false)
        bScroll.finishPullDown();
      }
    }
  }));

  const classes = classNames('myscroll-container', {
    'myscroll-vertical': direction === 'vertical'
  });
  const renderChildren = () => {
    if (direction === 'vertical') {
      return <div className="scroll-content">{props.children}</div>;
    } else {
      return props.children;
    }
  };
  return (
    <div className={classes} ref={scrollContaninerRef}>
      {renderChildren()}
    </div>
  );
});

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};
export default React.memo(Scroll);
