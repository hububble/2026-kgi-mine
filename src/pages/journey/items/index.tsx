import StackView from '@/components/stackView';
import { IReactProps } from '@/settings/type';
import { memo, useContext } from 'react';
import './index.less';
import useDataDiversion from '@/hooks/useDataDiversion';
import { JourneyContext } from '../config';

type TItemsProps = IReactProps & {
  offset: number;
};

const Items = memo(({ children, offset }: TItemsProps) => {
  const [state] = useContext(JourneyContext);
  const [data, updateStep] = useDataDiversion({ index: 0, scene: state.scene });

  return (
    <div className='Items'>
      <StackView offset={offset} type='odd' />
      <StackView offset={offset} type='even' />
      {children}
      <StackView offset={offset} type='odd' />
      <StackView offset={offset} type='even' />
    </div>
  );
});
export default Items;
