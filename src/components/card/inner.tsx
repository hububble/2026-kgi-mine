import useSkip from '@/hooks/useSkip';
import { JourneyContext, JourneyStepType } from '@/pages/journey/config';
import { Context } from '@/settings/constant';
import { ActionType, TransitionType } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useMemo } from 'react';
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
  const [style, setStyle, destroy] = useTween({ opacity: 0, y: 30 });
  const [context, setContext] = useContext(Context);
  const { data, navBarIcon } = context[ActionType.Card]!;

  const contentCategory = data?.contentCategory?.toLocaleLowerCase() || '';
  const [, setState] = useContext(JourneyContext);

  const [response, fetch] = useSkip();

  useEffect(() => {
    if (response) {
      if (!response.isSuccess) {
        setContext({
          type: ActionType.Modal,
          state: {
            enabled: true,
            body: response.message || '伺服器連線異常，請稍後再試',
          },
        });
      }
      setState((S) => ({ ...S, step: JourneyStepType.resume }));
      setContext({ type: ActionType.Card, state: { enabled: false } });
    }
  }, [response]);

  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, y: 0 }, { duration: 600, delay: 200 });
    }
    return () => destroy();
  }, [transition]);

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
    <div className='card' style={style}>
      <div
        className='featuredImage'
        style={
          data?.hubSpot_FeaturedImage
            ? { backgroundImage: `url(${data.hubSpot_FeaturedImage})` }
            : {}
        }
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
                key={`primary-${primary.type}`}
                className={twMerge(primary.type, `after:content-[attr(data-count)]`)}
                data-count={primary.count}
              />
            )}
            {secondary.type !== 'none' && (
              <div
                key={`secondary-${secondary.type}`}
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
          <Button disabled={isFavorited} className='w-fit' onClick={() => favoriteSwitcher()}>
            <Button.Soft>{isFavorited ? '取消收藏' : '收藏內容'}</Button.Soft>
          </Button>
          <Button
            className='w-fit'
            onClick={() => {
              if (data) fetch({ contentId: data?.contentId });
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
