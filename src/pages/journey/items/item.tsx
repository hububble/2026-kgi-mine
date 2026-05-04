import { TDataDiversionItem } from '@/hooks/useDataDiversion';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

type TItemProps = {
  data: TDataDiversionItem;
};

const Item = memo(({ data }: TItemProps) => {
  return (
    <div
      className={twMerge(data.name)}
      style={{
        transform: `translateY(${data.top}vh)`,
        left: `${data.left.toFixed(2)}%`,
      }}
    />
  );
});
export default Item;
