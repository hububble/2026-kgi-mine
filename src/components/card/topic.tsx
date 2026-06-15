import { TransitionType } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useEffect } from 'react';
import './index.less';

const Topic = memo(({ count, transition }: { count: number; transition: TransitionType }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 30 });

  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, y: 0 }, { duration: 600, delay: 1200 });
    }
  }, [transition]);

  return (
    <div className='topic' style={style}>
      {`已有 ${count} 名Miner探索此礦藏`}
    </div>
  );
});

export default Topic;
