/*
 * @Author: Censwin
 * @Date: 2021-11-14 12:09:49
 * @LastEditTime: 2021-11-14 21:45:30
 * @Description:
 * @FilePath: /melodia-ts/src/application/Discover/index.tsx
 */
import React, { useCallback, useEffect } from 'react';
import Scroll from '../../baseUI/Scroll/scroll';
import Icon from '../../components/Icon/icon';
import Slider from '../../components/Slider/slider';
import Card from '../../components/Card/Card';
import { useDispatch } from 'react-redux';
const Discover: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'getBanner' });
  }, []);
  const _imgList = new Array(4).fill({
    imageUrl: 'http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg'
  });
  const MoreBtn = useCallback(() => {
    return (
      <div className="more-btn-wrapper">
        <span>更多</span>
        <Icon icon="angle-right" />
      </div>
    );
  }, []);
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
          <Slider imgList={_imgList} />
          <div style={{ paddingBottom: '100px' }}>
            <Card headerClassName="discover-card-header" title="推荐歌单" extra={<MoreBtn />}>
              asdjkhajkshdkjh
            </Card>
          </div>
        </div>
      </Scroll>
    </div>
  );
};
export default React.memo(Discover);
