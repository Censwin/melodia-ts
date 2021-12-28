/*
 * @Date: 2021-12-27 10:00:34
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-28 18:13:50
 * @Description:
 * @FilePath: \melodia-ts\src\application\Singer\index.tsx
 */
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import { CommonSongList, Header, Scroll } from '../../baseUI';
import { prefixStyle } from '../../utils/tools';
const artist = {
  picUrl: 'https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg',
  name: '薛之谦',
  hotSongs: [
    {
      name: '我好像在哪见过你',
      ar: [{ name: '薛之谦' }],
      al: {
        name: '薛之谦专辑'
      }
    },
    {
      name: '我好像在哪见过你',
      ar: [{ name: '薛之谦' }],
      al: {
        name: '薛之谦专辑'
      }
    },
    {
      name: '我好像在哪见过你',
      ar: [{ name: '薛之谦' }],
      al: {
        name: '薛之谦专辑'
      }
    },
    {
      name: '我好像在哪见过你',
      ar: [{ name: '薛之谦' }],
      al: {
        name: '薛之谦专辑'
      }
    },
    {
      name: '我好像在哪见过你',
      ar: [{ name: '薛之谦' }],
      al: {
        name: '薛之谦专辑'
      }
    },
    {
      name: '我好像在哪见过你',
      ar: [{ name: '薛之谦' }],
      al: {
        name: '薛之谦专辑'
      }
    },
    {
      name: '我好像在哪见过你',
      ar: [{ name: '薛之谦' }],
      al: {
        name: '薛之谦专辑'
      }
    },
    {
      name: '我好像在哪见过你',
      ar: [{ name: '薛之谦' }],
      al: {
        name: '薛之谦专辑'
      }
    },
    {
      name: '我好像在哪见过你',
      ar: [{ name: '薛之谦' }],
      al: {
        name: '薛之谦专辑'
      }
    },
    {
      name: '我好像在哪见过你',
      ar: [{ name: '薛之谦' }],
      al: {
        name: '薛之谦专辑'
      }
    },
    {
      name: '我好像在哪见过你',
      ar: [{ name: '薛之谦' }],
      al: {
        name: '薛之谦专辑'
      }
    },
    {
      name: '我好像在哪见过你',
      ar: [{ name: '薛之谦' }],
      al: {
        name: '薛之谦专辑'
      }
    }
    // 省略 20 条
  ]
};
const Singer: React.FC = () => {
  const containerRef = useRef(null);
  const [showStatus, setShowStatus] = useState(true);
  const history = useHistory();
  const params = useParams();
  console.log(params);
  const imgWrapperRef = useRef<HTMLElement>(null);
  const songsWrapperRef = useRef<HTMLElement>(null);
  type ScrollType = React.ElementRef<typeof Scroll>;
  const scrollRef = useRef<ScrollType>(null);
  const initHeight = useRef(0);
  const layerRef = useRef<HTMLElement>(null);
  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;
  const transform = prefixStyle('transform');
  useEffect(() => {
    if (imgWrapperRef.current && songsWrapperRef.current && layerRef.current && scrollRef.current) {
      let h = imgWrapperRef.current.offsetHeight;
      songsWrapperRef.current.style.top = `${h - OFFSET}px`;
      initHeight.current = h;
      layerRef.current.style.top = `${h - OFFSET}px`;
      scrollRef.current.refresh();
    }
  }, []);

  const handleScroll = (pos: { y: number }) => {
    if (imgWrapperRef.current && songsWrapperRef.current && layerRef.current && scrollRef.current) {
      let height = initHeight.current;
      const newY = pos.y;
      const percent = Math.abs(newY / height);
      if (newY > 0) {
        // 向下拉
        imgWrapperRef.current.style[transform as any] = `scale(${1 + percent})`;
        layerRef.current.style.top = `${height - OFFSET + newY}px`;
      }
    }
  };

  return (
    <CSSTransition
      nodeRef={containerRef} // TRG issue 668
      in={showStatus}
      timeout={300}
      classNames="common-fadeInUp"
      unmountOnExit
      appear={true}
      onExited={history.goBack}
    >
      <section className="singer-container">
        <Header title="" className="singer-header" handleClick={() => setShowStatus(false)} />
        <article
          className="img-wrapper"
          style={{ backgroundImage: `url(${artist.picUrl}?param=300x300)` }}
          ref={imgWrapperRef}
        >
          <div className="filter" />
          <div className="singer-info">
            <div className="info-left">
              <h1>{artist.name}</h1>
              <p>175.5 万 粉丝</p>
            </div>
            <span className="mark-btn">关注</span>
          </div>
        </article>
        <article className="Bglayer" ref={layerRef} />
        <article className="SingerSongwrapper" ref={songsWrapperRef}>
          <Scroll ref={scrollRef} onScroll={handleScroll}>
            <CommonSongList songs={artist.hotSongs} onClickCallback={() => {}} />
          </Scroll>
        </article>
      </section>
    </CSSTransition>
  );
};

export default Singer;
