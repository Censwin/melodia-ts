/*
 * @Author: Censwin
 * @Date: 2021-11-14 12:09:49
 * @LastEditTime: 2021-11-18 15:14:55
 * @Description:
 * @FilePath: \melodia-ts\src\application\Discover\index.tsx
 */
import React, { useCallback, useEffect, useRef } from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { useDispatch, connect } from 'react-redux';
import { Icon, Slider, Card } from '../../components';
import { IApplicationState } from '../../store/reducers';
import { IDiscoverState, ActionTypes } from './store';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { getCount } from '../../utils/tools';
import { useHistory } from 'react-router';
import { HorizenList, Scroll } from '../../baseUI';
const CHANNEL_LIST = [
  {
    icon: 'calendar-week',
    name: '每日推荐',
    path: ''
  },
  {
    icon: 'stream',
    name: '歌单',
    path: ''
  },
  {
    icon: 'sort-amount-up',
    name: '排行榜',
    path: ''
  },
  {
    icon: 'street-view',
    name: '歌手',
    path: ''
  }
];
type TDiscoverProps = IDiscoverState & RouteConfig;

const Discover: React.FC<TDiscoverProps> = (props) => {
  const { bannerList, recommendList, route } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!bannerList.length) {
      dispatch({ type: ActionTypes.GET_BANNER });
    }
    if (!recommendList.length) {
      dispatch({ type: ActionTypes.GET_RECOMMEND });
    }
  }, []);
  type ScrollComponentType = React.ElementRef<typeof Scroll>;
  const VerticalScrollRef = useRef<ScrollComponentType>(null);
  useEffect(() => {
    VerticalScrollRef.current?.refresh();
  });

  const MoreBtn = useCallback((props) => {
    const { path } = props;
    return (
      <div className="more-btn-wrapper" onClick={() => history.push(path)}>
        <span>更多</span>
        <Icon icon="angle-right" />
      </div>
    );
  }, []);

  const RenderRecommend = useCallback(() => {
    return recommendList.map((item) => {
      return (
        <div key={item.id} className="recommend-item horizen-item">
          <img className="recommend-item-pic" src={item.picUrl} />
          <div className="play-count">
            <Icon icon="play" />
            {getCount(item.playCount)}
          </div>
          <span className="recommend-item-name">{item.name}</span>
        </div>
      );
    });
  }, [recommendList]);
  const RenderChannelList = useCallback(() => {
    return CHANNEL_LIST.map((item) => {
      return (
        <div className="channel-entity" key={item.name}>
          <a className="c-blocka">
            <div className="channel-icon-wrapper">
              <div className="channel-icon-bg">
                <Icon icon={item.icon as IconName} />
              </div>
            </div>
            <p className="channel-name">{item.name}</p>
          </a>
        </div>
      );
    });
  }, []);
  return (
    <div className="discover-content">
      {renderRoutes(route.routes)}
      <div className="Header">
        <div className="searchBar">
          <span>
            <Icon icon="search" />
            <span>周杰伦</span>
          </span>
        </div>
        <Icon icon="bars" className="header-more" />
      </div>
      <Scroll ref={VerticalScrollRef}>
        <div>
          <Slider imgList={bannerList} />
          <div className="channel-list">{RenderChannelList()}</div>
          <div style={{ paddingBottom: '100px' }}>
            <Card
              headerClassName="discover-card-header"
              title="推荐歌单"
              extra={<MoreBtn path="/discover/recommend" />}
            >
              <HorizenList>
                <div className="recommend-wrapper">{RenderRecommend()}</div>
              </HorizenList>
            </Card>
            <Card
              headerClassName="discover-card-header"
              title="精选音乐视频"
              extra={<MoreBtn path="/recommend" />}
            >
              <div className="video-list-wrapper">视频</div>
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
