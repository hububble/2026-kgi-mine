import { memo, useContext, useEffect, useMemo } from 'react';
import './index.less';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { SceneDepth } from '@/settings/config';
import { JourneyContext, JourneySceneSetting } from '@/pages/journey/config';
import { getViewPxByDirection } from '@/utils';

const StackView = memo(({ offset }: { offset: number }) => {
  const [context] = useContext(Context);
  const [, setState] = useContext(JourneyContext);
  const { coverPercent, ratio, width } = context[ActionType.SceneViewSize]!;

  const left = useMemo(() => {
    if (ratio && coverPercent && width) {
      const offsetPx = getViewPxByDirection(JourneySceneSetting.offset, width);
      const currentOffset = offset - offsetPx;
      const currentRatio = (width - window.innerWidth) / window.innerWidth;
      const currentGap = ((width - window.innerWidth) / window.innerWidth) * 100;
      const totalOffset = currentOffset * SceneDepth.middle * ratio * currentRatio;
      const loop = Math.floor(totalOffset / (coverPercent + currentGap));
      setState((S) => ({ ...S, loop }));
      return (totalOffset * -1) % (coverPercent + currentGap);
    }
  }, [offset, width, ratio]);

  return (
    <div className='StackView'>
      <div className='a' style={{ left: `${left}%` }} />
    </div>
  );
});
export default StackView;
