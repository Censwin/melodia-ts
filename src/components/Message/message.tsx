/*
 * @Date: 2022-01-06 14:47:49
 * @LastEditors: k200c
 * @LastEditTime: 2022-01-06 17:01:33
 * @Description:
 * @FilePath: \melodia-ts\src\components\Message\message.tsx
 */
import React from 'react';
import ReactDOM from 'react-dom';
import animations from 'create-keyframe-animation';

// ==================== Content Layout =======================

interface ILayout {
  content: React.ReactNode;
}
const Layout: React.FC<ILayout> = (props) => {
  const { content } = props;
  return <div className="m-message-notice-content">{content}</div>;
};

// ==================== Content Layout =======================

const unmountMsgWrapper = () => {
  const wrapper = document.getElementsByClassName('m-message')[0];
  const parent = wrapper.parentElement;
  parent?.removeChild(wrapper);
};

const getMsgContent = () => {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('class', 'm-message');
  const child = document.createElement('div');
  child.setAttribute('class', 'm-message-notice');
  wrapper.appendChild(child);
  document.body.appendChild(wrapper);
  return wrapper;
};

const alert = (type: string, content: React.ReactNode) => {
  let container = getMsgContent();
  let timer = 0;
  let duration = 10000;
  ReactDOM.render(<Layout content={content} />, container as HTMLElement, () => {
    animations.registerAnimation({
      name: 'msgFadeShow',
      animation: {
        0: {
          opacity: 0
        },
        100: {
          opacity: 100
        }
      },
      presets: {
        duration: duration,
        easing: 'linear'
      }
    });
    animations.registerAnimation({
      name: 'msgFadeHide',
      animation: {
        0: {
          opacity: 100
        },
        100: {
          opacity: 0
        }
      },
      presets: {
        duration: duration,
        easing: 'linear'
      }
    });
    animations.runAnimation(container, 'msgFadeShow');
    timer = window.setTimeout(() => {
      animations.runAnimation(container, 'msgFadeHide', () => {
        ReactDOM.unmountComponentAtNode(container as HTMLElement);
        clearTimeout(timer);
        unmountMsgWrapper();
      });
    }, duration);
  });
};

const success = alert.bind(this, 'success');
const Message = () => {};
Message.success = success;

export default Message;
