/*
 * @Author: Censwin
 * @Date: 2021-11-14 12:09:49
 * @LastEditTime: 2021-11-24 14:58:04
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
import { HorizenScroll, Scroll } from '../../baseUI';
import { Link } from 'react-router-dom';
const CHANNEL_LIST = [
  {
    icon: 'calendar-week',
    name: '每日推荐',
    path: ''
  },
  {
    icon: 'stream',
    name: '歌单',
    path: '/discover/recommend'
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

  const enterDetail = useCallback((id) => {
    history.push(`/album/${id}`);
  }, []);

  const RenderRecommend = useCallback(() => {
    return recommendList.map((item) => {
      return (
        <div
          key={item.id}
          className="recommend-item horizen-item"
          onClick={(_) => enterDetail(item.id)}
        >
          <img className="recommend-item-pic" src={item.picUrl + '?param=300x300'} />
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
          <Link to={item.path} className="c-blocka">
            <div className="channel-icon-wrapper">
              <div className="channel-icon-bg">
                <Icon icon={item.icon as IconName} />
              </div>
            </div>
            <p className="channel-name">{item.name}</p>
          </Link>
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
      <div className="scroll-window-wrapper">
        <Scroll ref={VerticalScrollRef}>
          <div>
            <Slider imgList={bannerList} />
            <div className="channel-list">{RenderChannelList()}</div>
            <Card
              headerClassName="discover-card-header"
              title="推荐歌单"
              extra={<MoreBtn path="/discover/recommend" />}
            >
              <HorizenScroll>
                <div className="recommend-wrapper">{RenderRecommend()}</div>
              </HorizenScroll>
            </Card>
            <Card
              headerClassName="discover-card-header"
              title="精选音乐视频"
              extra={<MoreBtn path="/recommend" />}
            >
              <div className="video-list-wrapper">
                <video
                  autoPlay
                  src="http://vodkgeyttp9c.vod.126.net/vodkgeyttp8/68sKFbGS_1328070069_hd.mp4?ts=1637740559&rid=47115DC667964F5C42BDE925D7219E80&rl=3&rs=WYVsmqNlDBDdTxSQCSFxUKRWmHXMrNkG&sign=b3031414d6fb290b1fcc11369f0e6cb5&ext=NnR5gMvHcZNcbCz592mDGUGuDOFN18isir07K1EOfL1J%2BCNMRjdqn8PtxXuEIBJL%2BpoG%2F8kQw12Y7FWqqZOAgPxqqGHeXJ%2FodHo047nqVAXrkSLPqAfh4ZkfqsDD3gNadW5GEJfoZKpQY4MfwlhlFMUQxdgkNMymrMX7kiJ5r7CdOkNxcTxKcWZBhRdWGXcYzfbZuRjfEeKg7LELu9A7MrSaX7y2Sr8QHxS%2ByY%2BkRaFr96KUucVYvQLWBd0PbK2D"
                >
                  您的浏览器不支持 video 标签。
                </video>
              </div>
            </Card>
          </div>
        </Scroll>
      </div>
    </div>
  );
};

const mapStateToProps = ({ Discover }: IApplicationState) => ({
  bannerList: Discover.bannerList,
  recommendList: Discover.recommendList
});

export default connect(mapStateToProps)(React.memo(Discover));
