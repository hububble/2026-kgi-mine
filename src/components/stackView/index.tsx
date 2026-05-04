import { JourneyContext, JourneySceneDebug, JourneySceneSetting } from '@/pages/journey/config';
import { SceneDepth } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import { getViewPxByDirection } from '@/utils';
import { memo, useContext, useEffect, useMemo } from 'react';
import './index.less';
import { twMerge } from 'tailwind-merge';

type TStackViewProps = IReactProps & {
  offset: number;
  type: 'odd' | 'even';
  onPushed?: (loop: number) => void;
};

const StackView = memo(({ offset, type, children, onPushed }: TStackViewProps) => {
  const [context] = useContext(Context);
  const [, setState] = useContext(JourneyContext);
  const { coverPercent, ratio, width } = context[ActionType.SceneViewSize]!;

  const normalizeModulo = (value: number, mod: number) => ((value % mod) + mod) % mod;

  const { left, loop } = useMemo(() => {
    if (ratio && coverPercent && width) {
      const offsetPx = getViewPxByDirection(JourneySceneSetting.offset, width);
      const currentOffset = offset - offsetPx;
      const currentRatio = (width - window.innerWidth) / window.innerWidth;
      const currentGap = ((width - window.innerWidth) / window.innerWidth) * 100;
      const totalOffset = currentOffset * SceneDepth.middle * ratio * currentRatio;
      const cycleDistance = coverPercent + currentGap;
      const phaseOffset = type === 'even' ? cycleDistance / 2 : 0;
      const movedInCycle = normalizeModulo(totalOffset + phaseOffset, cycleDistance);
      const loop = Math.floor(totalOffset / (cycleDistance * 0.5));
      const left = movedInCycle * -1;

      const isPushPrevToEnd = left <= -100;
      if (isPushPrevToEnd) onPushed?.(loop);

      return { left, loop };
    }
    return { left: 0, loop: -1 };
  }, [offset, width, ratio, coverPercent, type, onPushed]);

  useEffect(() => {
    setState((S) => ({ ...S, loop }));
  }, [loop, setState]);

  return (
    <div className='StackView'>
      <div
        className={twMerge('stack', JourneySceneDebug.enabled && type)}
        style={{ left: `${left}%` }}
      >
        <div>{children}</div>
      </div>
    </div>
  );
});
export default StackView;
