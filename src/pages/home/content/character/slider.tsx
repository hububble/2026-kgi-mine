import Blockquote from '@/components/blockquote';
import Button from '@/components/button';
import TweenerProvider from '@/components/tweenProvider';
import { ResponseType } from '@/hooks/useQuestion';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import S from 'swiper';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { twMerge } from 'tailwind-merge';
import { HomeContext, HomeStepType } from '../../config';

import 'swiper/swiper.css';
import './slider.less';

type SlideProps = {
  item: ResponseType['result']['minerList'][number];
  index: number;
  idx: number;
};

const Slide = ({ item, index, idx }: SlideProps) => {
  return (
    <div className='character'>
      <div className={twMerge(index === idx ? 'active scale-100' : 'scale-75')}>
        <div style={{ backgroundImage: `var(--${item.name})` }} />
      </div>
    </div>
  );
};

type SliderContainerProps = {
  data?: ResponseType['result']['minerList'];
};

const SliderArrows = memo(({ onClick }: { onClick: (direct: 'left' | 'right') => void }) => {
  const [state] = useContext(HomeContext);
  return (
    <div className='absolute top-2/5 left-0 z-10 w-full'>
      <div className='flex w-full flex-row justify-between px-5'>
        <TweenerProvider
          initialStyle={{ opacity: 0, y: 50 }}
          tweenTo={{ opacity: 1, y: 0 }}
          shouldFadeIn={state.step === HomeStepType.characterFadeIn}
          options={{ duration: 600, delay: 600 }}
        >
          <Button onClick={() => onClick('left')}>
            <Button.SliderArray direct='left' />
          </Button>
        </TweenerProvider>
        <TweenerProvider
          initialStyle={{ opacity: 0, y: 50 }}
          tweenTo={{ opacity: 1, y: 0 }}
          shouldFadeIn={state.step === HomeStepType.characterFadeIn}
          options={{ duration: 600, delay: 700 }}
        >
          <Button onClick={() => onClick('right')}>
            <Button.SliderArray direct='right' />
          </Button>
        </TweenerProvider>
      </div>
    </div>
  );
});

const SliderContainer = memo(({ data }: SliderContainerProps) => {
  const [state, setState] = useContext(HomeContext);
  const [index, setIndex] = useState(window.innerWidth >= 768 ? 2 : 0);
  const swiperRef = useRef<S | null>(null);

  useEffect(() => {
    if (!data) return;
    setState((S) => ({ ...S, characterData: data[index] }));
  }, [index, data]);

  return (
    <TweenerProvider
      initialStyle={{ opacity: 0, y: 50 }}
      tweenTo={{ opacity: 1, y: 0 }}
      shouldFadeIn={state.step === HomeStepType.characterFadeIn}
      options={{ duration: 600, delay: 200 }}
      shouldFadeOut={state.step === HomeStepType.characterFadeOut}
      fadeOutStyle={{ opacity: 0 }}
      optionsFadeOut={{ duration: 600 }}
    >
      <div className='slider-container'>
        <Swiper
          loop
          spaceBetween={0}
          slidesPerView={3}
          onSlideChange={(swiper) => {
            if (!data) return;
            const slidesCount = window.innerWidth >= 768 ? 5 : 3;
            const offsetIndex = Math.floor(slidesCount / 2);
            setIndex((swiper.realIndex + offsetIndex) % data!.length);
          }}
          effect='coverflow'
          modules={[EffectCoverflow]}
          breakpoints={{
            768: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            scale: 1,
            depth: 20,
            modifier: 1,
            slideShadows: false,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {data?.map((item, idx) => (
            <SwiperSlide key={item.minerId}>
              <Slide item={item} index={index} idx={idx} />
            </SwiperSlide>
          ))}
        </Swiper>
        <SliderArrows
          onClick={(direct) => {
            if (!swiperRef.current) return;
            if (direct === 'left') swiperRef.current.slidePrev();
            else swiperRef.current.slideNext();
          }}
        />
      </div>
    </TweenerProvider>
  );
});

type CarouselProps = {
  data?: ResponseType['result']['minerList'];
};

const Carousel = memo(({ data }: CarouselProps) => (
  <Blockquote className='w-full lg:max-w-5xl xl:max-w-7xl'>
    <SliderContainer data={data} />
  </Blockquote>
));
export default Carousel;
