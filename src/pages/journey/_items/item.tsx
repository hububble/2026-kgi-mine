import Button from '@/components/button';
import { PATTERN_URI_PROPERTIES } from '@/settings/config';
import { checkElementCenterOfScreenWithOffset, checkElementInViewport } from '@/utils';
import { memo, useEffect, useRef, useState } from 'react';
import { JourneySceneSetting } from '../config';

type TItemProps = {
  item: { name: string; top: number; left: number; clicked: boolean };
  y: number;
  x: number;
  left: string;
  onCenter?: () => void;
  onInView?: () => void;
  onItemSelected?: (item: string) => void;
  isStatic?: boolean;
};

const Item = memo(
  ({ item, y, x, left, onCenter, onInView, onItemSelected, isStatic }: TItemProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState({ isCenter: false, isInView: false });

    const randomPattern = useRef(
      PATTERN_URI_PROPERTIES[Math.floor(Math.random() * PATTERN_URI_PROPERTIES.length)].name,
    );

    useEffect(() => {
      const currentThreshold =
        JourneySceneSetting.itemsCenterThreshold * (Math.min(window.innerWidth, 640) / 320);

      if (ref.current && left !== '' && !isStatic) {
        const inCenter = checkElementCenterOfScreenWithOffset(ref.current, currentThreshold);
        const inView = checkElementInViewport(ref.current);
        if (inCenter && !status.isCenter) {
          onCenter?.();
          setStatus((S) => ({ ...S, isCenter: true }));
        }
        if (inView && !status.isInView) {
          onInView?.();
          setStatus((S) => ({ ...S, isInView: true }));
        }
      }
    }, [left, status, isStatic]);

    return (
      <div
        ref={ref}
        key={item.name}
        className={item.name}
        style={{
          transform: `translateY(${y}vh)`,
          left: `${x.toFixed(2)}%`,
        }}
      >
        <div className='marker'>
          {!item.name.includes('roadSign') && !item.clicked && (
            <Button
              onClick={() => {
                setStatus((S) => ({ ...S, isCenter: true, isInView: true }));
                onItemSelected?.(item.name);
              }}
            >
              <Button.Marker>
                <div className={`box ${randomPattern.current}`}></div>
              </Button.Marker>
            </Button>
          )}
        </div>
      </div>
    );
  },
);
export default Item;
