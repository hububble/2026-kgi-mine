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
import JourneyEventProvider, { JourneyEventsContext, JourneyEventsState } from './events';

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

  const value = useState(JourneyEventsState);

  useEffect(() => {
    if (JourneySceneSetting.shouldReloadWhenWindowResized) {
      window.addEventListener('resize', () => {
        setResetIndex((index) => index + 1);
      });
    }
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
