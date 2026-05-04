import StackView from '@/components/stackView';
import useDataDiversion, { TDataDiversionStateData } from '@/hooks/useDataDiversion';
import { IReactProps } from '@/settings/type';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { JourneyContext } from '../config';
import './azureCoast.less';
import './index.less';
import Item from './item';

type TItemsProps = IReactProps & {
  offset: number;
};

const Items = memo(({ children, offset }: TItemsProps) => {
  const [state] = useContext(JourneyContext);
  const [itemData, updateStep] = useDataDiversion({ index: -1, scene: state.scene });
  const { data } = useMemo(() => itemData, [itemData]);

  const [odd, setOdd] = useState<TDataDiversionStateData>({ back: [], front: [], static: [] });
  const [even, setEven] = useState<TDataDiversionStateData>({ back: [], front: [], static: [] });

  useEffect(() => {
    updateStep({ step: state.loop });
  }, [state.loop]);

  useEffect(() => {
    if (state.loop === -1) {
      setOdd((S) => ({ ...S, static: data.static }));
      setEven((S) => ({ ...S, static: data.static }));
    }

    if (state.loop % 2 === 1) setEven(data);
    else setOdd(data);
  }, [data, state.loop]);

  return (
    <div className='Items'>
      <StackView offset={offset} type='odd'>
        {odd.static.map((item, idx) => (
          <Item key={`${item.name}-${idx}-odd-static`} data={item} />
        ))}
        {odd.back.map((item, idx) => (
          <Item key={`${item.name}-${idx}-odd-back`} data={item} />
        ))}
      </StackView>
      <StackView offset={offset} type='even'>
        {even.static.map((item, idx) => (
          <Item key={`${item.name}-${idx}-even-static`} data={item} />
        ))}
        {even.back.map((item, idx) => (
          <Item key={`${item.name}-${idx}-even-back`} data={item} />
        ))}
      </StackView>
      {children}
      <StackView offset={offset} type='odd'>
        {odd.front.map((item, idx) => (
          <Item key={`${item.name}-${idx}-odd-front`} data={item} />
        ))}
      </StackView>
      <StackView offset={offset} type='even'>
        {even.front.map((item, idx) => (
          <Item key={`${item.name}-${idx}-even-front`} data={item} />
        ))}
      </StackView>
    </div>
  );
});
export default Items;
