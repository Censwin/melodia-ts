/*
 * @Date: 2022-01-06 14:47:49
 * @LastEditors: k200c
 * @LastEditTime: 2022-01-06 18:22:42
 * @Description:
 * @FilePath: \melodia-ts\src\components\Message\message.tsx
 */
import React from 'react';
import ReactDOM from 'react-dom';
import animations from 'create-keyframe-animation';
// ==================== Type =======================
interface IParams {
  name: string;
  animation: any[];
  presets: { duration: number; easing: string };
}
// ==================== Content Layout =======================

interface ILayout {
  content: React.ReactNode;
}
const Layout: React.FC<ILayout> = (props) => {
  const { content } = props;
  return <div className="m-message-notice-content">{content}</div>;
};

// ==================== Content Layout =======================

const nodePosition = (num: number) => {
  return [0, (num - 1) * 60 + 10];
};

const unmountMsgWrapper = () => {
  const wrapper = document.getElementsByClassName('m-message')[0];
  const parent = wrapper.parentElement;
  parent?.removeChild(wrapper);
};

const getMsgWrapper = () => {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('class', 'm-message');
  const child = document.createElement('div'); // 目标不能为空节点，否则无法 render
  wrapper.appendChild(child);
  document.body.appendChild(wrapper);
  return wrapper;
};

const alert = (type: string, content: React.ReactNode) => {
  let msgWrapper = getMsgWrapper();
  let timer = 0;
  let duration = 5000;
  let nums = 0;
  ReactDOM.render(<Layout content={content} />, msgWrapper as HTMLElement, () => {
    nums++;
    let params: IParams = {
      name: `msgFade${nodePosition(nums)[1]}`,
      animation: [
        {
          opacity: 0,
          y: 0
        },
        {
          opacity: 1,
          y: nodePosition(nums)[1]
        }
      ],
      presets: {
        duration: duration,
        easing: 'linear'
      }
    };
    animations.registerAnimation(params);
    animations.runAnimation(msgWrapper, params.name);
    timer = window.setTimeout(() => {
      let _params: IParams = JSON.parse(JSON.stringify(params));
      _params.animation = _params.animation.reverse();
      _params.name = `${_params.name}H`;
      animations.registerAnimation(_params);
      animations.runAnimation(msgWrapper, _params.name, () => {
        nums--;
        ReactDOM.unmountComponentAtNode(msgWrapper as HTMLElement);
        clearTimeout(timer);
        unmountMsgWrapper();
      });
    }, duration);
  });
};

// https://www.jianshu.com/p/c796ee179392

const success = alert.bind(this, 'success');
const Message = () => {};
Message.success = success;

export default Message;
