import Card from '@/components/card';
import Questionnaire from '@/components/questionnaire';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import {
  JourneyContext,
  JourneySceneSetting,
  JourneySceneType,
  JourneyState,
  JourneyStepType,
} from './config';
import JourneyEventProvider, { JourneyEventsContext, JourneyEventsState } from './events';
import './index.less';
import Scene from './scene';
import UserData from './userData';
import EnterFrame from 'lesca-enterframe';

const Journey = memo(() => {
  const [context, setContext] = useContext(Context);
  const journey = context[ActionType.UserData]?.journey;
  const [resetIndex, setResetIndex] = useState(0);
  const innerWidthRef = useRef<number>(0);

  const [state, setState] = useState({
    ...JourneyState,
    scene: journey
      ? Object.entries(JourneySceneType).filter(([key]) => key === journey)[0][1]
      : JourneyState.scene,
  });

  const value = useState(JourneyEventsState);

  useEffect(() => {
    const resize = () => {
      if (innerWidthRef.current !== 0 && innerWidthRef.current !== window.innerWidth) {
        if (innerWidthRef.current > window.innerWidth) {
          if (JourneySceneSetting.shouldReloadWhenWindowResized) {
            EnterFrame.destroy();
            setState((S) => ({ ...S, loop: -1, step: JourneyStepType.unset }));
            setResetIndex((I) => I + 1);
          }
        }
      }
      innerWidthRef.current = window.innerWidth;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <JourneyContext.Provider value={[state, setState]}>
      <JourneyEventsContext.Provider value={value}>
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
            <JourneyEventProvider>
              <Scene />
              <UserData />
              {context[ActionType.Card]?.enabled && <Card />}
              {context[ActionType.Questionnaire]?.enabled && <Questionnaire />}
            </JourneyEventProvider>
          </div>
        </OnloadProvider>
      </JourneyEventsContext.Provider>
    </JourneyContext.Provider>
  );
});
export default Journey;
