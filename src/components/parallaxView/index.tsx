import { JourneyContext } from '@/pages/journey/config';
import { SceneDepth, SceneSize } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import { getViewPxRatio } from '@/utils';
import { memo, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import './index.less';
import { twMerge } from 'tailwind-merge';

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

type ViewProps = {
  left: number;
  className: string;
  currentWidth: number;
  isStatic: boolean;
  leftNode?: ReactNode;
  rightNode?: ReactNode;
};
const View = memo(({ left, className, currentWidth, isStatic, leftNode, rightNode }: ViewProps) => {
  return (
    <div style={{ left: `${(left % innerWidth) * (isStatic ? 1 : 2)}%` }}>
      <div className={twMerge(className, 'left-0')} style={{ width: `${currentWidth}px` }}>
        {leftNode}
      </div>
      <div
        className={twMerge(className)}
        style={{ width: `${currentWidth}px`, left: `${currentWidth}px` }}
      >
        {rightNode}
      </div>
    </div>
  );
});

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

  const [currentWidth, setCurrentWidth] = useState(0);

  const [, setState] = useContext(JourneyContext);
  const [context] = useContext(Context);
  const { width = window.innerWidth } = context[ActionType.SceneViewSize]!;
  const ratio = useMemo(() => getViewPxRatio({ width }), [width]);

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [debounceOffsetRef] = useDebounce(innerWidth, 1000);

  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    const resize = () => {
      if (containerRef.current && contentRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const ratio = SceneSize.width / SceneSize.height;
        const currentWidth = width / height < ratio ? height * ratio : width;
        const currentHeight = width / height < ratio ? height : width / ratio;
        contentRef.current.style.width = `${currentWidth - width}px`;
        contentRef.current.style.height = `${currentHeight}px`;
        contentRef.current.style.visibility = 'visible';
        setCurrentWidth(currentWidth);
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
    if (innerWidth === 0) return 0;
    return offset * SceneDepth.middle * ratio * -1;
  }, [offset, innerWidth, ratio]);

  useEffect(() => {
    onLeftChange?.(`${left % (innerWidth * 2)}%`);
    setDirection(left % (innerWidth * 2) < -100 ? 'right' : 'left');
  }, [left]);

  useEffect(() => {
    if (direction) onDirectionChange?.(direction);
  }, [direction]);

  return (
    <div className='ParallaxView' ref={containerRef}>
      <div ref={contentRef}>
        {staticNode && (
          <View
            left={left}
            className={className}
            currentWidth={currentWidth}
            isStatic={true}
            leftNode={staticNode}
            rightNode={staticNode}
          />
        )}
        <View
          left={left}
          className={className}
          currentWidth={currentWidth}
          isStatic={false}
          leftNode={leftNode}
          rightNode={rightNode}
        />
      </div>
    </div>
  );
});
export default ParallaxView;
