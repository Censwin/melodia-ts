import React, { useCallback } from 'react';
import Scroll from '../../baseUI/Scroll/scroll';
import Icon from '../../components/Icon/icon';
import Slider from '../../components/Slider/slider';
import Card from '../../components/Card/Card';
const Discover: React.FC = () => {
  console.log(process.env.NODE_ENV); // dev
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
