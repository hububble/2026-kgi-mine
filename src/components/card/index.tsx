import useFavoriteSwitcher from '@/hooks/useFavoriteSwitcher';
import useURI from '@/hooks/useURI';
import { Context } from '@/settings/constant';
import { ActionType, TransitionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Blockquote from '../blockquote';
import Button from '../button';
import Heading from '../heading';
import { URI } from './config';
import './index.less';
import Inner from './inner';
import Topic from './topic';

const Card = memo(() => {
  const [context, setContext] = useContext(Context);
  const { data } = context[ActionType.Card]!;

  const [isFavorited, setIsFavorited] = useState(data?.isFavorited || false);

  const [response, favoriteSwitcher] = useFavoriteSwitcher({
    isFavorited: data?.isFavorited || false,
    contentId: data?.contentId || 0,
  });

  useEffect(() => {
    if (response) {
      if (response.isSuccess) {
        setIsFavorited(typeof response.result !== 'boolean');
      } else {
        setContext({
          type: ActionType.Modal,
          state: {
            enabled: true,
            body: '操作失敗，請稍後再試',
          },
        });
      }
    }
  }, [response]);

  const [, setURI] = useURI();
  const [transition, setTransition] = useState(TransitionType.Unset);

  useEffect(() => {
    URI.forEach((uri) => setURI(uri));
  }, []);

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
                'inner-contain hidden',
                transition === TransitionType.FadeIn && 'animate-fadeInPy block',
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
                <Inner
                  transition={transition}
                  favoriteSwitcher={favoriteSwitcher}
                  isFavorited={isFavorited || false}
                />
              </div>
              <Topic count={data?.minerCount || 0} transition={transition} />
            </div>
          </div>
        </Blockquote>
      </div>
    </OnloadProvider>
  );
});
export default Card;
