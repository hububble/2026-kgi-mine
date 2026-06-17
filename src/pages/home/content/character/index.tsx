import Heading from '@/components/heading';
import TweenerProvider from '@/components/tweenProvider';
import useAnswer from '@/hooks/useAnswer';
import { ResponseType } from '@/hooks/useQuestion';
import useURI from '@/hooks/useURI';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useCallback, useContext, useEffect } from 'react';
import { HomeContext, HomeStepType } from '../../config';
import SelectButton from './button';
import Carousel from './slider';
import { CharacterURIList } from '@/settings/config';

const 選擇你的Miner角色 = memo(({ data }: { data?: ResponseType['result']['minerList'] }) => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useContext(HomeContext);
  const [, setURI] = useURI();

  const [response, fetchAnswer] = useAnswer();

  useEffect(() => {
    if (response?.isSuccess) {
      setState((S) => ({ ...S, step: HomeStepType.characterFadeOut }));
    }
  }, [response]);

  useEffect(() => {
    if (data) {
      setState((S) => ({ ...S, characterData: data[window.innerWidth >= 768 ? 2 : 1] }));
      data.forEach((item) => {
        const dat = CharacterURIList[item.name as keyof typeof CharacterURIList];
        if (dat) setURI({ path: dat.path, name: dat.name });
      });
    }
  }, [data]);

  if (!data) return null;

  const onSelect = useCallback(() => {
    const quizList = state.decadeData?.map((item) => item.quizId) || [];
    const minerId = state.characterData?.minerId || '';
    const [tripId] = state.journeyData?.map((item) => item.trip) || [''];

    fetchAnswer({ tripId, quizList, minerId });
  }, [state]);

  return (
    <OnloadProvider
      onStart={() => {
        setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
      }}
      onload={() => {
        setState((S) => ({ ...S, step: HomeStepType.characterFadeIn }));
        setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
      }}
    >
      <div className='flex w-full flex-col items-center'>
        <div className='flex w-fit flex-col items-center gap-2 text-center'>
          <TweenerProvider
            initialStyle={{ y: 50, opacity: 0 }}
            tweenTo={{ y: 0, opacity: 1 }}
            shouldFadeIn={state.step === HomeStepType.characterFadeIn}
            options={{ duration: 600, delay: 0 }}
            shouldFadeOut={state.step === HomeStepType.characterFadeOut}
            fadeOutStyle={{ opacity: 0 }}
            optionsFadeOut={{ duration: 600 }}
          >
            <Heading.H3>選擇你的Miner角色</Heading.H3>
          </TweenerProvider>
          <TweenerProvider
            initialStyle={{ y: 50, opacity: 0 }}
            tweenTo={{ y: 0, opacity: 1 }}
            shouldFadeIn={state.step === HomeStepType.characterFadeIn}
            options={{ duration: 600, delay: 50 }}
            shouldFadeOut={state.step === HomeStepType.characterFadeOut}
            fadeOutStyle={{ opacity: 0 }}
            optionsFadeOut={{ duration: 600 }}
          >
            <Heading.H3>開啟一段專屬旅程！</Heading.H3>
          </TweenerProvider>
        </div>
        <div className='max-h-[40vh] w-full overflow-hidden'>
          <Carousel data={data} />
        </div>
        <SelectButton onClick={onSelect} />
      </div>
    </OnloadProvider>
  );
});

export default 選擇你的Miner角色;
