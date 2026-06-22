import { JourneyContext, JourneyStepType } from '@/pages/journey/config';
import { Context } from '@/settings/constant';
import { ActionType, TransitionType } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../button';
import Heading from '../heading';
import { findPrimarySecondaryTag } from './config';

type TInnerProps = {
  transition: TransitionType;
  isFavorited: boolean;
  favoriteSwitcher: () => void;
};

const Inner = memo(({ transition, isFavorited, favoriteSwitcher }: TInnerProps) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 30 });
  const [context, setContext] = useContext(Context);
  const { data, navBarIcon } = context[ActionType.Card]!;
  const contentCategory = data?.contentCategory?.toLocaleLowerCase() || '';
  const [, setState] = useContext(JourneyContext);
  const [imageDidLoaded, setImageDidLoaded] = useState(false);

  useEffect(() => {
    if (transition === TransitionType.FadeIn && imageDidLoaded) {
      setStyle({ opacity: 1, y: 0 }, { duration: 600, delay: 200 });
    }
  }, [transition, imageDidLoaded]);

  const { primary, secondary } = useMemo(() => findPrimarySecondaryTag(data), [data]);

  const icon = useMemo(() => {
    if (!navBarIcon) return null;

    switch (contentCategory) {
      case 'video':
        return navBarIcon.video;
      case 'audio':
        return navBarIcon.audio;
      case 'article':
        return navBarIcon.article;
      default:
        return null;
    }
  }, [contentCategory, navBarIcon]);

  return (
    <div className={twMerge('card', imageDidLoaded ? 'block' : 'hidden')} style={style}>
      <img
        src={data?.hubSpot_FeaturedImage || '/card-demo.jpg'}
        alt='Card Demo'
        onLoad={() => setImageDidLoaded(true)}
      />
      <div className='gradient-top' />
      <div className='gradient-bottom' />
      <div className='ctx'>
        <div className='head'>
          {data?.hubSpot_PostCollection ? (
            <Heading.H4 icon={icon}>{data?.hubSpot_PostCollection}</Heading.H4>
          ) : (
            <div />
          )}
          <div className='navBar'>
            {primary.type !== 'none' && (
              <div
                key={primary.type + primary.count}
                className={twMerge(primary.type, `after:content-[attr(data-count)]`)}
                data-count={primary.count}
              />
            )}
            {secondary.type !== 'none' && (
              <div
                key={secondary.type + secondary.count}
                className={twMerge(secondary.type, `after:content-[attr(data-count)]`)}
                data-count={secondary.count}
              />
            )}
          </div>
        </div>
        <div className='foot'>
          <Button
            className='w-fit'
            onClick={() => {
              if (!data?.hubSpot_Url) {
                setContext({
                  type: ActionType.Modal,
                  state: {
                    enabled: true,
                    title: '文章連結不存在',
                    body: '請聯絡客服人員',
                    label: ['關閉'],
                  },
                });
                return;
              }
              setContext({
                type: ActionType.Article,
                state: {
                  enabled: true,
                  url: data?.hubSpot_Url || 'https://mine.kgifund.com.tw/',
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
          {!isFavorited && (
            <Button className='w-fit' onClick={() => favoriteSwitcher()}>
              <Button.Soft>收藏內容</Button.Soft>
            </Button>
          )}
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
export default Inner;
