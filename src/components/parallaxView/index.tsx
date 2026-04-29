import { JourneyContext } from '@/pages/journey/config';
import { SceneDepth, SceneSize } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import { getViewPxRatio } from '@/utils';
import { memo, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import './index.less';

type ParallaxViewProps = {
  className: string;
  offset: number;
  loop?: boolean;
  onLeftChange?: (left: string) => void;
  onDirectionChange?: (direction: 'left' | 'right') => void;
  leftNode?: ReactNode;
  rightNode?: ReactNode;
  staticNode?: ReactNode;
};

const ParallaxView = memo((props: ParallaxViewProps) => {
  const {
    className,
    offset,
    loop,
    onLeftChange,
    onDirectionChange,
    leftNode,
    rightNode,
    staticNode,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);

  const [, setState] = useContext(JourneyContext);
  const [context] = useContext(Context);
  const { width = window.innerWidth } = context[ActionType.SceneViewSize]!;
  const ratio = useMemo(() => getViewPxRatio({ width }), [width]);

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [debounceOffsetRef] = useDebounce(innerWidth, 1000);

  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    const resize = () => {
      if (containerRef.current && contentRef.current && rightBoxRef.current && leftBoxRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const ratio = SceneSize.width / SceneSize.height;
        const currentWidth = width / height < ratio ? height * ratio : width;
        const currentHeight = width / height < ratio ? height : width / ratio;
        contentRef.current.style.width = `${currentWidth - width}px`;
        contentRef.current.style.height = `${currentHeight}px`;
        contentRef.current.style.visibility = 'visible';

        rightBoxRef.current.style.width = `${currentWidth}px`;
        leftBoxRef.current.style.width = `${currentWidth}px`;
        rightBoxRef.current.style.left = `${currentWidth}px`;
        leftBoxRef.current.style.left = '0px';

        setInnerWidth((currentWidth / (currentWidth - width)) * 100);
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (innerWidth === 0) return;
    if (innerWidth !== debounceOffsetRef) return;
    const currentLoop = Math.floor((offset * SceneDepth.middle * ratio) / (innerWidth * 2));
    if (loop) {
      setState((S) => ({ ...S, loop: currentLoop }));
    }
  }, [offset, innerWidth, ratio, debounceOffsetRef, width]);

  const left = useMemo(() => {
    if (innerWidth === 0) return '0%';
    return `${(offset * SceneDepth.middle * ratio * -1) % (innerWidth * 2)}%`;
  }, [offset, innerWidth, ratio]);

  useEffect(() => {
    onLeftChange?.(left);
    setDirection(parseFloat(left) < -100 ? 'right' : 'left');
  }, [left]);

  useEffect(() => {
    if (direction) onDirectionChange?.(direction);
  }, [direction]);

  return (
    <div className='ParallaxView' ref={containerRef}>
      <div ref={contentRef}>
        <div style={{ left }}>
          <div className={className} ref={leftBoxRef}>
            {staticNode}
            {leftNode}
          </div>
          <div className={className} ref={rightBoxRef}>
            {staticNode}
            {rightNode}
          </div>
        </div>
      </div>
    </div>
  );
});
export default ParallaxView;
