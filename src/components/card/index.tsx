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

const Topic = ({ count, transition }: { count: number; transition: TransitionType }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 30 });

  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, y: 0 }, { duration: 600, delay: 1200 });
    }
  }, [transition]);

  return (
    <div className='topic' style={style}>
      {`已有 ${count} 名Miner探索此礦藏`}
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
          <Heading.H4 icon={navBarIcon}>豐盛未來式</Heading.H4>
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
          <Button
            className='w-fit'
            onClick={() => {
              setContext({
                type: ActionType.Article,
                state: {
                  enabled: true,
                  onClose: () => {
                    setState((S) => ({ ...S, step: JourneyStepType.resume }));
                  },
                },
              });
              setContext({ type: ActionType.Card, state: { enabled: false } });
            }}
          >
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
  const { cardURI, topic, data } = context[ActionType.Card]!;

  console.log(data);

  const [, setURI] = useURI();
  const [transition, setTransition] = useState(TransitionType.Unset);

  useEffect(() => {
    cardURI?.forEach((uri) => setURI(uri));
    URI.forEach((uri) => setURI(uri));
  }, [cardURI]);

  return (
    <OnloadProvider
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
          <div className='inner max-w-md px-5'>
            <div
              className={twMerge(
                'inner-contain',
                transition === TransitionType.FadeIn && 'animate-fadeInPy',
              )}
            >
              <div
                className={twMerge(
                  'round',
                  transition === TransitionType.FadeIn && 'animate-fadeInPy',
                )}
              >
                <div className='head'>
                  <Heading.H2>{data?.hubSpot_HtmlTitle || 'hubSpot_HtmlTitle'}</Heading.H2>
                  <div className='navBar'>
                    <Button className='h-6 w-6' active={data?.isLiked}>
                      <Button.Card type='Like' />
                    </Button>
                    <Button className='h-6 w-6' active={data?.isFavorited}>
                      <Button.Card type='Favorite' />
                    </Button>
                  </div>
                </div>
                <div className='sub'>
                  <Heading.H3>導航員</Heading.H3>
                  <div className='hr' />
                  <Heading.H3>{data?.hubSpot_AuthorName || 'hubSpot_AuthorName'}</Heading.H3>
                </div>
                <InnerCard transition={transition} />
              </div>
              {topic && <Topic count={data?.minerCount || 0} transition={transition} />}
            </div>
          </div>
        </Blockquote>
      </div>
    </OnloadProvider>
  );
});
export default Card;
