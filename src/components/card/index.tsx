import useURI from '@/hooks/useURI';
import { JourneyContext, JourneyStepType } from '@/pages/journey/config';
import { Context } from '@/settings/constant';
import { ActionType, TransitionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Blockquote from '../blockquote';
import Button from '../button';
import Heading from '../heading';
import { URI } from './config';
import './index.less';

const Topic = ({ topic, transition }: { topic: string; transition: TransitionType }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 30 });

  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, y: 0 }, { duration: 600, delay: 1200 });
    }
  }, [transition]);

  return (
    <div className='topic' style={style}>
      {topic}
    </div>
  );
};

const InnerCard = memo(({ transition }: { transition: TransitionType }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 30 });
  const [context, setContext] = useContext(Context);
  const { navBarIcon, mines } = context[ActionType.Card]!;
  const [, setState] = useContext(JourneyContext);

  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, y: 0 }, { duration: 600, delay: 200 });
    }
  }, [transition]);

  return (
    <div className='card' style={style}>
      <img src='/card-demo.jpg' alt='Card Demo' />
      <div className='gradient-top' />
      <div className='gradient-bottom' />
      <div className='ctx'>
        <div className='head'>
          <Heading.D3 icon={navBarIcon}>豐盛未來式</Heading.D3>
          <div className='navBar'>
            {mines?.map((mine) => (
              <div
                key={mine.type}
                className={twMerge(mine.type, `after:content-[attr(data-count)]`)}
                data-count={mine.count}
              />
            ))}
          </div>
        </div>
        <div className='foot'>
          <Button className='w-fit'>
            <Button.Soft>點我觀看</Button.Soft>
          </Button>
          <Button className='w-fit'>
            <Button.Soft>收藏內容</Button.Soft>
          </Button>
          <Button
            className='w-fit'
            onClick={() => {
              setState((S) => ({ ...S, step: JourneyStepType.resume }));
              setContext({ type: ActionType.Card, state: { enabled: false } });
            }}
          >
            <Button.Soft>繼續旅程</Button.Soft>
          </Button>
        </div>
      </div>
    </div>
  );
});

const Card = memo(() => {
  const [context, setContext] = useContext(Context);
  const { cardURI, headline, navigator, topic } = context[ActionType.Card]!;

  const [, setURI] = useURI();
  const [transition, setTransition] = useState(TransitionType.Unset);

  useEffect(() => {
    cardURI?.forEach((uri) => setURI(uri));
    URI.forEach((uri) => setURI(uri));
  }, [cardURI]);

  return (
    <OnloadProvider
      hideBeforeLoaded
      onStart={() => {
        setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
      }}
      onload={() => {
        setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        setTransition(TransitionType.FadeIn);
      }}
    >
      <div className='Card'>
        <Blockquote className='flex w-full justify-center' scroll>
          <div className='inner max-w-md'>
            <div className='inner-contain animate-fadeInPy'>
              <div
                className={twMerge(
                  'round',
                  transition === TransitionType.FadeIn && 'animate-fadeInPy',
                )}
              >
                <div className='head'>
                  <Heading.H2>{headline}</Heading.H2>
                  <div className='navBar'>
                    <Button className='h-6 w-6'>
                      <Button.Card type='Card' />
                    </Button>
                    <Button className='h-6 w-6'>
                      <Button.Card type='Bookmark' />
                    </Button>
                  </div>
                </div>
                <div className='sub'>
                  <Heading.H3>導航員</Heading.H3>
                  <div className='hr' />
                  <Heading.H3>{navigator}</Heading.H3>
                </div>
                <InnerCard transition={transition} />
              </div>
              {topic && <Topic topic={topic} transition={transition} />}
            </div>
          </div>
        </Blockquote>
      </div>
    </OnloadProvider>
  );
});
export default Card;
