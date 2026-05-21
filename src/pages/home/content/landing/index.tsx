import Heading from '@/components/heading';
import Paragraph from '@/components/paragraph';
import TweenerProvider from '@/components/tweenProvider';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext } from 'react';
import { HomeContext, HomeStepType } from '../../config';
import Buttons from './button';
import Character from './character';

const animationSetting = {
  start: 800,
  duration: 600,
  paragraphStart: 1200,
  gap: 200,
  easing: Bezier.outQuart,
  y: 30,
};

const 歡迎踏上豐盛之旅 = memo(() => {
  const [{ step }] = useContext(HomeContext);

  return (
    <>
      <TweenerProvider
        initialStyle={{ y: animationSetting.y, opacity: 0 }}
        tweenTo={{ y: 0, opacity: 1 }}
        shouldFadeIn={step === HomeStepType.landingFadeIn}
        options={{
          duration: animationSetting.duration,
          delay: animationSetting.start,
          easing: animationSetting.easing,
        }}
        shouldFadeOut={step === HomeStepType.landingFadeOut}
        fadeOutStyle={{ opacity: 0 }}
        optionsFadeOut={{ duration: 800 }}
      >
        <Heading.H3>歡迎踏上豐盛之旅</Heading.H3>
      </TweenerProvider>
      <Paragraph className='text-center'>
        <TweenerProvider
          initialStyle={{ y: animationSetting.y, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn={step === HomeStepType.landingFadeIn}
          options={{
            duration: animationSetting.duration,
            delay: animationSetting.paragraphStart,
            easing: animationSetting.easing,
          }}
          shouldFadeOut={step === HomeStepType.landingFadeOut}
          fadeOutStyle={{ opacity: 0 }}
          optionsFadeOut={{ duration: 800 }}
        >
          你將在旅途中偶遇各種精選內容
        </TweenerProvider>
        <TweenerProvider
          initialStyle={{ y: animationSetting.y, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn={step === HomeStepType.landingFadeIn}
          options={{
            duration: animationSetting.duration,
            delay: animationSetting.paragraphStart + animationSetting.gap,
            easing: animationSetting.easing,
          }}
          shouldFadeOut={step === HomeStepType.landingFadeOut}
          fadeOutStyle={{ opacity: 0 }}
          optionsFadeOut={{ duration: 800 }}
        >
          你可以用自己的步調
        </TweenerProvider>
        <TweenerProvider
          initialStyle={{ y: animationSetting.y, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn={step === HomeStepType.landingFadeIn}
          options={{
            duration: animationSetting.duration,
            delay: animationSetting.paragraphStart + animationSetting.gap * 2,
            easing: animationSetting.easing,
          }}
          shouldFadeOut={step === HomeStepType.landingFadeOut}
          fadeOutStyle={{ opacity: 0 }}
          optionsFadeOut={{ duration: 800 }}
        >
          即時瀏覽或收藏再看
        </TweenerProvider>
        <TweenerProvider
          initialStyle={{ y: animationSetting.y, opacity: 0 }}
          tweenTo={{ y: 0, opacity: 1 }}
          shouldFadeIn={step === HomeStepType.landingFadeIn}
          options={{
            duration: animationSetting.duration,
            delay: animationSetting.paragraphStart + animationSetting.gap * 3,
            easing: animationSetting.easing,
          }}
          shouldFadeOut={step === HomeStepType.landingFadeOut}
          fadeOutStyle={{ opacity: 0 }}
          optionsFadeOut={{ duration: 800 }}
        >
          準備好展開旅程嗎？
        </TweenerProvider>
      </Paragraph>
      <Character />
      <Buttons />
    </>
  );
});
export default 歡迎踏上豐盛之旅;
