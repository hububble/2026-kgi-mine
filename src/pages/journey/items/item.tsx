import Button from '@/components/button';
import { TDataDiversionItem } from '@/hooks/useDataDiversion';
import { PATTERN_URI_PROPERTIES } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { checkElementCenterOfScreenWithOffset, checkElementInViewport } from '@/utils';
import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { JourneyContext, JourneySceneDebug, JourneySceneSetting } from '../config';

type TItemProps = {
  data: TDataDiversionItem;
  offset: number;
  onCenter?: (name: string) => void;
  onItemSelected?: (name: string, index?: number) => void;
};

const Item = memo(({ data, offset, onCenter, onItemSelected }: TItemProps) => {
  const [context] = useContext(Context);
  const { contents } = context[ActionType.UserData]!;

  const [, setState] = useContext(JourneyContext);

  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState({ isCenter: false, isInView: false });

  const currentPattern = useMemo(() => {
    const random =
      PATTERN_URI_PROPERTIES[Math.floor(Math.random() * PATTERN_URI_PROPERTIES.length)].name;

    if (data.index !== undefined) {
      const currentIndex = Math.max(data.index - 1, 0);
      const hubSpot_PrimaryTag = contents?.[currentIndex]?.hubSpot_PrimaryTag;

      const tag = hubSpot_PrimaryTag || 'NONE';
      const lowercaseTag = tag.toLowerCase() as
        | 'career'
        | 'finance'
        | 'health'
        | 'relations'
        | 'society'
        | 'none';
      const pattern = PATTERN_URI_PROPERTIES.find((p) => p.name.includes(lowercaseTag));
      return pattern ? pattern.name : random;
    }
    return random;
  }, [contents, data.index]);

  useEffect(() => {
    const currentThreshold =
      JourneySceneSetting.itemsCenterThreshold * (Math.min(window.innerWidth, 640) / 320);

    if (ref.current) {
      const inCenter = checkElementCenterOfScreenWithOffset(ref.current, currentThreshold);
      const inView = checkElementInViewport(ref.current);

      if (data.name) {
        if (data.name.includes('wave')) return;

        setState((S) => {
          const included = S.onCenterItem.includes(data.name);
          if (inCenter) {
            if (included) return S;
            return { ...S, onCenterItem: [...S.onCenterItem, data.name] };
          }
          if (!included) return S;
          return { ...S, onCenterItem: S.onCenterItem.filter((name) => name !== data.name) };
        });
      }

      if (data.clicked) {
        setState((S) => {
          if (!S.onCenterItem.includes(data.name)) return S;
          return {
            ...S,
            onCenterItem: S.onCenterItem.filter((name) => name !== data.name),
          };
        });
      }

      if (inCenter && !status.isCenter) {
        onCenter?.(data.name);
        setStatus((S) => ({ ...S, isCenter: true }));
      }
      if (inView && !status.isInView) {
        setStatus((S) => ({ ...S, isInView: true }));
      }
    }
  }, [offset]);

  if (data.name === '') return null;

  return (
    <div
      className={twMerge(
        data.name,
        'relative',
        JourneySceneDebug.enabled ? 'before:pointer-events-auto' : 'before:pointer-events-none',
      )}
      style={{
        top: `${data.top}%`,
        left: `${data.left}%`,
      }}
    >
      <div className='marker'>
        {data.name !== '' && <div ref={ref} className='absolute h-10 w-10' />}
        {!data.name.includes('roadSign') && data.name && data.clicked === false && (
          <Button
            onClick={() => {
              onItemSelected?.(data.name, (data.index ?? 1) - 1);
              setStatus((S) => {
                if (S.isCenter && S.isInView) return S;
                return { ...S, isCenter: true, isInView: true };
              });
            }}
          >
            <Button.Marker>
              <div className={`box ${currentPattern}`} />
            </Button.Marker>
          </Button>
        )}
      </div>
    </div>
  );
});
export default Item;
