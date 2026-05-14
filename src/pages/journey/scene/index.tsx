import { PreloadType } from '@/components/sounds';
import { SoundName } from '@/components/sounds/type';
import { CharacterFrame } from '@/hooks/useCharacterSlowDown';
import useURI from '@/hooks/useURI';
import { PATTERN_URI_PROPERTIES, SceneDepth } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { getPercentByViewPx, getViewPxByDirection as getPx, getScreenOffset } from '@/utils';
import EnterFrame from 'lesca-enterframe';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import {
  JourneyContext,
  JourneySceneDebug,
  JourneySceneList,
  JourneySceneType,
  JourneyStepType,
  JourneySceneSetting as setting,
} from '../config';
import Items from '../items';
import MinerWalker from '../miner';
import { URI } from './config';
import './index.less';
import Moon from './Moon';
import View from './view';
import { JourneyEventsContext } from '../events';

const Scene = memo(() => {
  const [context] = useContext(Context);
  const [state, setState] = useContext(JourneyContext);
  const [, setEvent] = useContext(JourneyEventsContext);
  const [, setURI] = useURI();

  const { width = window.innerWidth } = context[ActionType.SceneViewSize]!;
  const sounds = context[ActionType.Sounds];

  const left = useMemo(
    () => getPx(setting.offset, width) - setting.walkFadeInDistance * getScreenOffset(),
    [],
  );
  const [, setStyle] = useTween({ left });
  const [offset, setOffset] = useState(left);

  const [isAlpha, setIsAlpha] = useState(false);

  useEffect(() => {
    PATTERN_URI_PROPERTIES.forEach((item) => setURI(item));
  }, []);

  useEffect(() => {
    if (state && state.scene) {
      JourneySceneList[state.scene].forEach((item) => setURI(item));
      if (state.scene === JourneySceneType.蔚藍海岸) URI.forEach((item) => setURI(item));
      sounds?.track?.stopAll();
    }
  }, [state.scene]);

  useEffect(() => {
    if (sounds && sounds.track) {
      if (sounds?.track) {
        let type: PreloadType = 'onAzureCoast';
        let name: SoundName = 'azureCoast';

        switch (state.scene) {
          case JourneySceneType.金黃稻浪:
            type = 'onGoldenRiceField';
            name = 'goldenRiceField';
            break;
          case JourneySceneType.花海平原:
            type = 'onFlowerSeaPlain';
            name = 'flowerSeaPlain';
            break;
          case JourneySceneType.蔚藍海岸:
            type = 'onAzureCoast';
            name = 'azureCoast';
            break;
          case JourneySceneType.月夜雪地:
            type = 'onMoonlitSnowfield';
            name = 'moonlitSnowfield';
            break;
          case JourneySceneType.晴光森林:
            type = 'onLushForest';
            name = 'lushForest';
            break;
        }
        sounds.track?.preload(type, () => {
          sounds.track?.play(name, 1, false);
          sounds.track?.fadeOut('bgm', 500);
        });
      }
    }
  }, [state.scene, sounds]);

  useEffect(() => {
    if (state.step === JourneyStepType.fadeIn) {
      if (JourneySceneDebug.enabled) {
        EnterFrame.stop();
        return;
      }

      setStyle(
        { left: getPx(setting.offset, width) },
        {
          duration: setting.walkFadeInDuration * getScreenOffset(),
          easing: Bezier.easeIn,
          onUpdate: (value: { left: number }) => setOffset(value.left),
          onEnd: (value: { left: number }) => {
            setOffset(value.left);
            setState((S) => ({ ...S, step: JourneyStepType.loop }));
            document.title = 'fadeIn end';
          },
        },
      );
    } else if (state.step === JourneyStepType.fadeOut) {
      setStyle({ left: offset }, 1);
    } else if (state.step === JourneyStepType.resume) {
      EnterFrame.play();
      setIsAlpha(false);
      setEvent((S) => ({ ...S, isCharacterStopped: false }));
    } else if (state.step === JourneyStepType.loop) {
      EnterFrame.destroy();
      EnterFrame.reset();
      EnterFrame.add(() => setOffset((S) => S + 1));
      EnterFrame.play();
    }
  }, [state.step]);

  const onShowDown = (frame: CharacterFrame) => {
    if (frame) {
      setStyle(
        { left: offset + frame.stepShouldGo },
        {
          duration: frame.duration,
          easing: Bezier.easeOut,
          onUpdate: (value: { left: number }) => {
            setOffset(value.left);
          },
          onEnd: (value: { left: number }) => {
            setOffset(value.left);
            if (state.scene === JourneySceneType.晴光森林) setIsAlpha(true);
            setEvent((S) => ({ ...S, isCharacterStopped: true }));
          },
        },
      );
    }
  };

  // TODO: remove debug code after testing
  useEffect(() => {
    if (!JourneySceneDebug.enabled) return;
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        setOffset((S) => {
          document.title = `offset:${getPercentByViewPx(S + 20, width).toFixed(2)}`;
          return S + 50;
        });
        EnterFrame.stop();
      }
      if (e.key === 'ArrowLeft') {
        setOffset((S) => {
          document.title = `offset:${getPercentByViewPx(S - 20, width).toFixed(2)}`;
          return S - 50;
        });
        EnterFrame.stop();
      }
    });
  }, []);

  return (
    <div className='Scene'>
      <View offset={offset} depth={SceneDepth.back} image='back' />
      {state.scene && state.scene === JourneySceneType.月夜雪地 && <Moon />}
      <View offset={offset} depth={SceneDepth.middle} image='middle' />
      <Items offset={offset}>
        <MinerWalker onShowDown={onShowDown} />
      </Items>
      <View offset={offset} depth={SceneDepth.front} image='front' isAlpha={isAlpha} />
    </div>
  );
});
export default Scene;
