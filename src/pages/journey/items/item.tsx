import { TDataDiversionItem } from '@/hooks/useDataDiversion';
import { IReactProps } from '@/settings/type';
import { memo, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

type TItemProps = {
  data: TDataDiversionItem;
};

const Item = memo(({ data }: TItemProps) => {
  useEffect(() => {
    console.log(data);
  }, [data]);

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
