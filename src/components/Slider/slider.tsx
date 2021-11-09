import React, { ReactElement, useEffect, useState } from 'react';
import Swiper, { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
Swiper.use([Pagination, Autoplay]);

interface ISliderProps {
  imgList: { imageUrl: string }[];
}

const Slider: React.FC<ISliderProps> = (props) => {
  const [swiperEle, setSwiperEle] = useState<Swiper>();
  const { imgList } = props;
  useEffect(() => {
    if (imgList.length !== 0 && !swiperEle) {
      const swiper = new Swiper('.slider-container', {
        loop: true,
        autoplay: true,
        pagination: { el: '.swiper-pagination' }
      });
      setSwiperEle(swiper);
    }
  }, [imgList.length]);
  return (
    <div className="sliderComponent">
      <div className="slider-mask" />
      <div className="slider-container">
        <div className="swiper-wrapper">
          {imgList.map((slider, index) => {
            return (
              <div className="swiper-slide" key={slider.imageUrl + index}>
                <div className="slider-nav">
                  <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="swiper-pagination" />
      </div>
    </div>
  );
};

export default Slider;
