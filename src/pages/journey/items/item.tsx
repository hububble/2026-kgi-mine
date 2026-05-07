import Button from '@/components/button';
import { TDataDiversionItem } from '@/hooks/useDataDiversion';
import { PATTERN_URI_PROPERTIES } from '@/settings/config';
import { memo, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { JourneySceneSetting } from '../config';
import { checkElementCenterOfScreenWithOffset, checkElementInViewport } from '@/utils';

type TItemProps = {
  data: TDataDiversionItem;
  offset: number;
  onCenter?: (name: string) => void;
  onItemSelected?: (name: string) => void;
};

const Item = memo(({ data, offset, onCenter, onItemSelected }: TItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState({ isCenter: false, isInView: false });

  const randomPattern = useRef(
    PATTERN_URI_PROPERTIES[Math.floor(Math.random() * PATTERN_URI_PROPERTIES.length)].name,
  );

  useEffect(() => {
    const currentThreshold =
      JourneySceneSetting.itemsCenterThreshold * (Math.min(window.innerWidth, 640) / 320);

    if (ref.current) {
      const inCenter = checkElementCenterOfScreenWithOffset(ref.current, currentThreshold);
      const inView = checkElementInViewport(ref.current);
      if (inCenter && !status.isCenter) {
        onCenter?.(data.name);
        setStatus((S) => ({ ...S, isCenter: true }));
      }
      if (inView && !status.isInView) {
        setStatus((S) => ({ ...S, isInView: true }));
      }
    }
  }, [offset]);

  return (
    <div
      className={twMerge(data.name)}
      style={{
        transform: `translateY(${data.top}vh)`,
        left: `${data.left.toFixed(2)}%`,
      }}
    >
      {!data.name.includes('roadSign') && data.name && data.clicked === false && (
        <div className='marker'>
          <Button
            onClick={() => {
              onItemSelected?.(data.name);
              setStatus((S) => ({ ...S, isCenter: true, isInView: true }));
            }}
          >
            <Button.Marker>
              <div ref={ref} className={`box ${randomPattern.current}`}></div>
            </Button.Marker>
          </Button>
        </div>
      )}
    </div>
  );
});
export default Item;
