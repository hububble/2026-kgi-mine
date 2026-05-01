import { memo, useContext, useEffect, useMemo } from 'react';
import './index.less';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { SceneDepth } from '@/settings/config';
import { JourneyContext, JourneySceneSetting } from '@/pages/journey/config';
import { getViewPxByDirection } from '@/utils';

const StackView = memo(({ offset, type }: { offset: number; type: 'odd' | 'even' }) => {
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
      const loop = Math.floor(totalOffset / cycleDistance);
      const left = movedInCycle * -1;
      return { left, loop };
    }
    return { left: 0, loop: -1 };
  }, [offset, width, ratio, coverPercent, type]);

  useEffect(() => {
    if (loop === -1) return;
    setState((S) => ({ ...S, loop }));
  }, [loop, setState]);

  return (
    <div className='StackView'>
      <div className={`stack ${type}`} style={{ left: `${left}%` }}></div>
    </div>
  );
});
export default StackView;
