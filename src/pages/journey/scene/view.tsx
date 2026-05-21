import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { getViewPxRatio } from '@/utils';
import { memo, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';

type ViewProps = { offset: number; depth: number; image: string; isAlpha?: boolean };

const View = memo(({ offset, depth, image, isAlpha }: ViewProps) => {
  const [context] = useContext(Context);
  const { width = window.innerWidth } = context[ActionType.SceneViewSize]!;
  const ratio = getViewPxRatio({ width });
  const currentOffset = offset * depth * ratio;

  return (
    <div
      className={twMerge('view', isAlpha && 'opacity-50 duration-500', image)}
      style={{ backgroundPositionX: `${currentOffset}%` }}
    />
  );
});

export default View;
