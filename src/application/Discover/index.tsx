/*
 * @Author: Censwin
 * @Date: 2021-11-14 12:09:49
 * @LastEditTime: 2021-11-16 18:14:09
 * @Description:
 * @FilePath: /melodia-ts/src/application/Discover/index.tsx
 */
import React, { useCallback, useEffect, useRef } from 'react';
import { RouteConfig } from 'react-router-config';
import { useDispatch, connect } from 'react-redux';
import Scroll from '../../baseUI/Scroll/scroll';
import Icon from '../../components/Icon/icon';
import Slider from '../../components/Slider/slider';
import Card from '../../components/Card/Card';
import { IApplicationState } from '../../store/reducers';
import { IDiscoverState, constants as actionTypes } from './store';

type TDiscoverProps = IDiscoverState & RouteConfig;

const Discover: React.FC<TDiscoverProps> = (props) => {
  const { bannerList, recommendList } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: actionTypes.GET_BANNER });
    dispatch({ type: actionTypes.GET_RECOMMEND });
  }, []);
  const HorizenWrapperRef = useRef<HTMLElement & HTMLDivElement>(null);
  type HorizenScroll = React.ElementRef<typeof Scroll>;
  const HorizenScrollRef = useRef<HorizenScroll>(null);
  const MoreBtn = useCallback(() => {
    return (
      <div className="more-btn-wrapper">
        <span>更多</span>
        <Icon icon="angle-right" />
      </div>
    );
  }, []);
  const renderRecommend = useCallback(() => {
    return recommendList.map((item) => {
      return (
        <div key={item.id} className="recommend-item">
          <img className="recommend-item-pic" src={item.picUrl} />
          <span className="recommend-item-name">{item.name}</span>
        </div>
      );
    });
  }, [recommendList]);
  useEffect(() => {
    let Dom = HorizenWrapperRef.current as HTMLElement;
    let items = Dom.querySelectorAll<HTMLElement>('.recommend-item');
    let totalWidth = 0;
    Array.from(items).forEach((e) => {
      totalWidth += e.offsetWidth;
    });
    Dom.style.width = `${totalWidth}px`;
    if (HorizenScrollRef.current) {
      HorizenScrollRef.current.refresh();
    }
  }, [recommendList.length !== 0]);
  // const handleMove = (e: React.TouchEvent<HTMLElement>) => {
  // onTouchMove={(e) => handleMove(e)}
  //   console.log(e.touches[0].pageX);
  // };
  return (
    <div className="discover-content">
      <div className="Header">
        <div className="searchBar">
          <span>
            <Icon icon="search" />
            <span>周杰伦</span>
          </span>
        </div>
        <Icon icon="bars" className="header-more" />
      </div>
      <Scroll>
        <div>
          <Slider imgList={bannerList} />
          <div style={{ paddingBottom: '100px' }}>
            <Card headerClassName="discover-card-header" title="推荐歌单" extra={<MoreBtn />}>
              <Scroll ref={HorizenScrollRef} direction="horizental">
                <div ref={HorizenWrapperRef}>
                  <div className="recommend-wrapper">{renderRecommend()}</div>
                </div>
              </Scroll>
            </Card>
          </div>
        </div>
      </Scroll>
    </div>
  );
};

const mapStateToProps = ({ Discover }: IApplicationState) => ({
  bannerList: Discover.bannerList,
  recommendList: Discover.recommendList
});

export default connect(mapStateToProps)(React.memo(Discover));
