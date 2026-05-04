import Button from '@/components/button';
import { TDataDiversionItem } from '@/hooks/useDataDiversion';
import { PATTERN_URI_PROPERTIES } from '@/settings/config';
import { memo, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

type TItemProps = {
  data: TDataDiversionItem;
};

const Item = memo(({ data }: TItemProps) => {
  const randomPattern = useRef(
    PATTERN_URI_PROPERTIES[Math.floor(Math.random() * PATTERN_URI_PROPERTIES.length)].name,
  );

  return (
    <div
      className={twMerge(data.name)}
      style={{
        transform: `translateY(${data.top}vh)`,
        left: `${data.left.toFixed(2)}%`,
      }}
    >
      {!data.name.includes('roadSign') && data.name && data.clicked === false && (
        <div className='marker'>
          <Button
            onClick={() => {
              console.log(data.clicked);
            }}
          >
            <Button.Marker>
              <div className={`box ${randomPattern.current}`}></div>
            </Button.Marker>
          </Button>
        </div>
      )}
    </div>
  );
});
export default Item;
