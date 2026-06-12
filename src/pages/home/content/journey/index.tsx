import Blockquote from '@/components/blockquote';
import Button from '@/components/button';
import Heading from '@/components/heading';
import TweenerProvider from '@/components/tweenProvider';
import { ResponseType } from '@/hooks/useQuestion';
import OnloadProvider from 'lesca-react-onload';
import { Bezier } from 'lesca-use-tween';
import { memo, useCallback, useContext, useEffect, useMemo } from 'react';
import { HomeContext, HomePageType, HomeStepType } from '../../config';

const 你想要哪一場理想旅程呢 = memo(({ data }: { data?: ResponseType['result']['tripList'] }) => {
  const [state, setState] = useContext(HomeContext);

  useEffect(() => {
    if (state.journeyData && state.journeyData?.length >= 1) {
      setState((S) => ({ ...S, step: HomeStepType.journeyFadeOut }));
    }
  }, [state.journeyData]);

  const onClick = useCallback(
    (dataset?: Record<string, string>) => {
      setState((S) => {
        const clone = { ...S };
        const isDatasetExist = clone.journeyData?.find((d) => d.name === dataset?.name);
        const whichJourneyData = isDatasetExist
          ? clone.journeyData?.filter((d) => d.name !== dataset?.name)
          : [...(clone.journeyData || []), (dataset as { trip: string; name: string }) || {}];
        if (whichJourneyData && whichJourneyData.length > 1) return S;
        clone.journeyData = whichJourneyData as { trip: string; name: string }[];
        return clone;
      });
    },
    [setState],
  );

  const currentData = useMemo(() => {
    return data?.map((dat) => {
      const isActive = state.journeyData?.find((d) => d.name === dat.name);
      return { ...dat, active: String(!!isActive) };
    });
  }, [data, state.journeyData]);

  return (
    <Blockquote>
      <OnloadProvider
        onload={() => {
          setState((S) => ({ ...S, step: HomeStepType.journeyFadeIn }));
        }}
      >
        <div className='flex h-full w-full flex-col items-center justify-center'>
          <TweenerProvider
            initialStyle={{ y: 50, opacity: -0.1 }}
            tweenTo={{ y: 0, opacity: 1 }}
            shouldFadeIn
            options={{ duration: 600, delay: 0 }}
            shouldFadeOut={state.step === HomeStepType.journeyFadeOut}
            fadeOutStyle={{ opacity: 0, y: -200 }}
            optionsFadeOut={{ duration: 1200, easing: Bezier.inQuart }}
          >
            <Heading.H3>你想要哪一場理想旅程呢？</Heading.H3>
          </TweenerProvider>
          <div className='w-full px-10 pt-16 md:px-44'>
            <div className='grid w-full grid-cols-1 gap-5 md:gap-8'>
              {currentData?.map((dat, index) => (
                <TweenerProvider
                  key={JSON.stringify(index)}
                  initialStyle={{ opacity: -0.1, y: 80 }}
                  tweenTo={{ opacity: 1, y: 0 }}
                  options={{ duration: 600, delay: 100 + index * 50 }}
                  shouldFadeIn
                  shouldFadeOut={state.step === HomeStepType.journeyFadeOut}
                  fadeOutStyle={{ opacity: 0, y: -200 }}
                  optionsFadeOut={{
                    duration: 1200,
                    delay: 100 + index * 20,
                    easing: Bezier.inQuart,
                    onEnd: () => {
                      setTimeout(() => {
                        setState((S) => ({ ...S, page: HomePageType.character }));
                      }, 2000);
                    },
                  }}
                >
                  <div className='flex w-full justify-center'>
                    <Button
                      className='w-full'
                      onClick={onClick}
                      dataset={dat}
                      active={dat.active === 'true'}
                      disabled={state.step === HomeStepType.journeyFadeOut}
                    >
                      <Button.Outline size='w-full'>{dat.name}</Button.Outline>
                    </Button>
                  </div>
                </TweenerProvider>
              ))}
            </div>
          </div>
        </div>
      </OnloadProvider>
    </Blockquote>
  );
});
export default 你想要哪一場理想旅程呢;
