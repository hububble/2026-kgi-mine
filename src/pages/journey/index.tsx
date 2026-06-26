import Alert from '@/components/alert';
import Article from '@/components/article';
import Card from '@/components/card';
import Modal from '@/components/modal';
import Questionnaire from '@/components/questionnaire';
import Recent from '@/components/recent';
import useContent from '@/hooks/useContent';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import EnterFrame from 'lesca-enterframe';
import Storage from 'lesca-local-storage';
import OnloadProvider from 'lesca-react-onload';
import QueryString from 'lesca-url-parameters';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import {
  JourneyContext,
  JourneyFakeData,
  JourneySceneSetting,
  JourneySceneType,
  JourneyState,
  JourneyStepType,
} from './config';
import JourneyEventProvider, { JourneyEventsContext, JourneyEventsState } from './events';
import './index.less';
import Scene from './scene';
import UserData from './userData';

let timeout: number = 0;

const Journey = memo(() => {
  const [context, setContext] = useContext(Context);
  const journey = context[ActionType.UserData]?.journey;
  const [resetIndex, setResetIndex] = useState(0);
  const innerWidthRef = useRef<number>(0);

  const [response, getContent] = useContent();

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
        if (innerWidthRef.current !== window.innerWidth) {
          if (JourneySceneSetting.shouldReloadWhenWindowResized) {
            // reset when window resized to smaller size
            EnterFrame.destroy();
            setState((S) => ({ ...S, loop: -1, step: JourneyStepType.unset }));
            setResetIndex((I) => I + 1);
            setContext({ type: ActionType.Card, state: { enabled: false } });
            setContext({ type: ActionType.Questionnaire, state: { enabled: false } });
            setContext({ type: ActionType.Article, state: { enabled: false } });
          }
        }
      }
      innerWidthRef.current = window.innerWidth;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (response) {
      if (response.isSuccess) {
        // TODO
        // const contents = response.result
        //   .filter((content) => content.contentId)
        //   .filter((content) => content.hubSpot_Id)
        //   .filter((content) => content.hubSpot_FeaturedImage);
        // .filter((_, index) => index === 0);
        const contents: typeof JourneyFakeData = JourneyFakeData;

        console.log(`第一次讀取資料`, contents);
        setContext({ type: ActionType.UserData, state: { contents } });
        setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        setState((S) => ({ ...S, step: JourneyStepType.fadeIn }));
      } else {
        Storage.clear();
        window.location.href = QueryString.root();
      }
    }
  }, [response]);

  return (
    <JourneyContext.Provider value={[state, setState]}>
      <JourneyEventsContext.Provider value={value}>
        <OnloadProvider
          key={`${state.scene}-${resetIndex}}`}
          onStart={() => {
            setState((S) => ({ ...S, step: JourneyStepType.unset }));
            setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
          }}
          onload={() => {
            clearTimeout(timeout);
            timeout = setTimeout(() => getContent(), 300);
          }}
        >
          <div className='Journey'>
            <JourneyEventProvider>
              <Scene />
              <UserData />
              {context[ActionType.Card]?.enabled && <Card />}
              {context[ActionType.Questionnaire]?.enabled &&
                !context[ActionType.Questionnaire]?.has_triggered && <Questionnaire />}
              {context[ActionType.Article]?.enabled && <Article />}
              {context[ActionType.Modal]?.enabled && <Modal />}
              {context[ActionType.Recent]?.enabled && <Recent />}
              {context[ActionType.Alert]?.enabled && <Alert />}
            </JourneyEventProvider>
          </div>
        </OnloadProvider>
      </JourneyEventsContext.Provider>
    </JourneyContext.Provider>
  );
});
export default Journey;
