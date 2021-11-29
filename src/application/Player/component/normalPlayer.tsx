/*
 * @Date: 2021-11-29 14:29:06
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-29 17:45:10
 * @Description:
 * @FilePath: \melodia-ts\src\application\Player\component\normalPlayer.tsx
 */
import classNames from 'classnames';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Marquee } from '../../../baseUI';
import { Icon } from '../../../components';
import { getName } from '../../../utils/tools';

interface INplayerProps {
  song: any;
  isFullScreen: boolean;
  toggleFullScreen: Function;
}

const NormalPlayer: React.FC<INplayerProps> = (props) => {
  const { song, isFullScreen, toggleFullScreen } = props;
  const CD_PIC_CLASSES = classNames('cd-image', {
    play: true,
    pause: false
  });
  return (
    <CSSTransition in={isFullScreen} classNames="PAGE_IN_UP" timeout={400} mountOnEnter>
      <section className="normal-player-container">
        <div className="player-background">
          <img src={song.al.picUrl + '?param=300x300'} width="100%" height="100%" />
        </div>
        <div className="background layer" />
        <article className="player-header">
          <span className="close-btn" onClick={toggleFullScreen(false)}>
            <Icon icon="chevron-down" />
          </span>
          <div className="title-wrapper">
            <Marquee className="title" text={song.name} />
            <p className="subtitle">{getName(song.ar)}</p>
          </div>
        </article>
        <article className="player-middle">
          <div className="cd-wrapper">
            <div className="img-wrapper">
              <img className={CD_PIC_CLASSES} src={song.al.picUrl + '?param=400x400'} alt="" />
            </div>
          </div>
        </article>
        <article className="player-bottom">
          <div className="player-control-bar">
            <span>
              <Icon icon="random" />
            </span>
            <span>
              <Icon icon="step-backward" />
            </span>
            <span>
              <Icon icon="play" />
            </span>
            <span>
              <Icon icon="step-forward" />
            </span>
            <span>
              <Icon icon="stream" />
            </span>
          </div>
        </article>
      </section>
    </CSSTransition>
  );
};

export default React.memo(NormalPlayer);
