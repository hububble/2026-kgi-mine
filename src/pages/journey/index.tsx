import Card from '@/components/card';
import Questionnaire from '@/components/questionnaire';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useCallback, useContext, useEffect, useState } from 'react';
import {
  JourneyContext,
  JourneySceneSetting,
  JourneySceneType,
  JourneyState,
  JourneyStepType,
} from './config';
import Dialog from './dialog';
import './index.less';
import Scene from './scene';
import UserData from './userData';

const Journey = memo(() => {
  const [context, setContext] = useContext(Context);
  const journey = context[ActionType.UserData]?.journey;
  const [resetIndex, setResetIndex] = useState(0);

  const [state, setState] = useState({
    ...JourneyState,
    scene: journey
      ? Object.entries(JourneySceneType).filter(([key]) => key === journey)[0][1]
      : JourneyState.scene,
  });

  const onLooped = useCallback((loop: number) => {
    if (loop < 0) return;
    // setContext({ type: ActionType.Questionnaire, state: { enabled: true } });
  }, []);

  const onEnd = useCallback(() => {
    setContext({ type: ActionType.Questionnaire, state: { enabled: true } });
  }, []);

  const onItemSelected = useCallback((item: string) => {
    console.log(item);
  }, []);

  useEffect(() => {
    if (JourneySceneSetting.shouldReloadWhenWindowResized) {
      window.addEventListener('resize', () => {
        setResetIndex((index) => index + 1);
      });
    }
  }, []);

  const onEncounteringRoadSign = useCallback(() => {
    setContext({
      type: ActionType.Modal,
      state: {
        enabled: true,
        body: '是否探索一條新的路線?',
        label: ['好的', '暫時不要'],
        onConfirm: (label) => {
          if (label === '好的') {
            setState((S) => {
              const scenes = Object.values(JourneySceneType).filter((scene) => scene !== S.scene);
              return {
                ...S,
                loop: 0,
                scene: scenes[Math.floor(Math.random() * scenes.length)],
                step: JourneyStepType.unset,
              };
            });
          } else {
            setState((S) => ({ ...S, step: JourneyStepType.resume }));
          }
        },
        onClose: () => {
          setState((S) => ({ ...S, step: JourneyStepType.resume }));
        },
      },
    });
  }, []);

  return (
    <JourneyContext.Provider value={[state, setState]}>
      <OnloadProvider
        key={`${state.scene}-${resetIndex}`}
        onStart={() => {
          setState((S) => ({ ...S, step: JourneyStepType.unset }));
          setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
        }}
        onload={() => {
          setState((S) => ({ ...S, step: JourneyStepType.fadeIn }));
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        }}
      >
        <div className='Journey'>
          <Scene
            onEnd={onEnd}
            onLooped={onLooped}
            onItemSelected={onItemSelected}
            onEncounteringRoadSign={onEncounteringRoadSign}
          />
          <UserData />
          {state.dialog.enabled && <Dialog />}
          {context[ActionType.Card]?.enabled && <Card />}
          {context[ActionType.Questionnaire]?.enabled && <Questionnaire />}
        </div>
      </OnloadProvider>
    </JourneyContext.Provider>
  );
});
export default Journey;
