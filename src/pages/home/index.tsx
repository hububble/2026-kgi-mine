import { Context } from '@/settings/constant';
import { ActionType, TCharacterName } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import Background from './background';
import { HomeContext, HomeState, HomeStepType, THomeState } from './config';
import Content from './content';
import './index.less';

const Home = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState<THomeState>(HomeState);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const { journeyData } = state;
    if (journeyData) {
      const [{ name }] = journeyData;
      setContext({
        type: ActionType.UserData,
        state: {
          journey:
            (name as '金黃稻浪' | '花海平原' | '蔚藍海岸' | '月夜雪地' | '晴光森林' | undefined) ||
            '晴光森林',
        },
      });
    }
  }, [state.journeyData]);

  useEffect(() => {
    const { characterData } = state;
    if (characterData) {
      const { name } = characterData;
      setContext({
        type: ActionType.UserData,
        state: {
          character: (name as TCharacterName) || '小桃_正_灰底',
        },
      });
    }
  }, [state.characterData]);

  useEffect(() => {
    if (imageLoaded) {
      setState((S) => ({ ...S, step: HomeStepType.landingFadeIn }));
    }
  }, [imageLoaded]);

  return (
    <HomeContext.Provider value={[state, setState]}>
      <OnloadProvider
        onStart={() => setContext({ type: ActionType.LoadingProcess, state: { enabled: true } })}
        onload={() => {
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
          setImageLoaded(true);
        }}
      >
        <div className='Home'>
          <Background />
          <Content />
        </div>
      </OnloadProvider>
    </HomeContext.Provider>
  );
});

export default Home;
