import StackView from '@/components/stackView';
import useDataDiversion, { TDataDiversionStateData } from '@/hooks/useDataDiversion';
import { ActionType, IReactProps } from '@/settings/type';
import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { JourneyContext, JourneySceneDebug, JourneySceneType, JourneyStepType } from '../config';
import Item from './item';

import './azureCoast.less';
import './flowerSeaPlain.less';
import './goldenRiceField.less';
import './index.less';
import './lushForest.less';
import './moonlitSnowfield.less';
import { Context } from '@/settings/constant';
import { JourneyEventsContext } from '../events';

type TItemsProps = IReactProps & {
  offset: number;
};

const Items = memo(({ children, offset }: TItemsProps) => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useContext(JourneyContext);
  const [, setEvent] = useContext(JourneyEventsContext);

  const [itemData, updateStep] = useDataDiversion({ index: -1, scene: state.scene });
  const { data } = useMemo(() => itemData, [itemData]);
  const endLoopShouldBe = useRef(Infinity);

  const [odd, setOdd] = useState<TDataDiversionStateData>({ back: [], front: [], static: [] });
  const [even, setEven] = useState<TDataDiversionStateData>({ back: [], front: [], static: [] });

  useEffect(() => {
    updateStep({ step: state.loop });
  }, [state.loop]);

  useEffect(() => {
    if (state.loop === -1) {
      setOdd((S) => ({ ...S, static: data.static }));
      setEven((S) => ({ ...S, static: data.static }));
    } else if (state.loop % 2 === 1) setEven(data);
    else setOdd(data);
  }, [data, state.loop]);

  useEffect(() => {
    if (data.back.length === 0 && data.front.length === 0 && state.loop !== -1) {
      endLoopShouldBe.current = state.loop;
    }
  }, [data]);

  const onCenter = useMemo(
    () => (name: string) => {
      if (JourneySceneDebug.enabled) return;
      setState((S) => ({ ...S, step: JourneyStepType.fadeOut }));
      const isRoadSign = name.includes('roadSign');
      if (isRoadSign) {
        setEvent((S) => ({
          ...S,
          onEncounteringRoadSign: {
            ...S.onEncounteringRoadSign,
            index: S.onEncounteringRoadSign.index + 1,
          },
        }));
      }
    },
    [],
  );

  const onItemSelected = useMemo(
    () => (name: string) => {
      setState((S) => ({ ...S, step: JourneyStepType.fadeOut }));
      setEvent((S) => ({
        ...S,
        onItemSelected: { ...S.onItemSelected, index: S.onItemSelected.index + 1 },
      }));
      setOdd((S) => ({
        ...S,
        back: S.back.map((item) => (item.name === name ? { ...item, clicked: true } : item)),
        front: S.front.map((item) => (item.name === name ? { ...item, clicked: true } : item)),
      }));
      setEven((S) => ({
        ...S,
        back: S.back.map((item) => (item.name === name ? { ...item, clicked: true } : item)),
        front: S.front.map((item) => (item.name === name ? { ...item, clicked: true } : item)),
      }));
    },
    [],
  );

  const onPushed = useCallback((loop: number) => {
    if (loop === endLoopShouldBe.current) {
      setState((S) => ({ ...S, step: JourneyStepType.fadeOut }));
      setTimeout(() => {
        setContext({ type: ActionType.Questionnaire, state: { enabled: true } });
      }, 500);
    }
  }, []);

  return (
    <div className='Items'>
      <StackView offset={offset} type='odd' onPushed={onPushed}>
        {odd.static.map((item, idx) => (
          <Item key={`${item.name}-${idx}-odd-static`} data={item} offset={offset} />
        ))}
        {odd.back.map((item, idx) => (
          <Item
            key={`${item.name}-${idx}-odd-back`}
            data={item}
            offset={offset}
            onCenter={onCenter}
            onItemSelected={onItemSelected}
          />
        ))}
      </StackView>
      <StackView offset={offset} type='even'>
        {even.static.map((item, idx) => (
          <Item key={`${item.name}-${idx}-even-static`} data={item} offset={offset} />
        ))}
        {even.back.map((item, idx) => (
          <Item
            key={`${item.name}-${idx}-even-back`}
            data={item}
            offset={offset}
            onCenter={onCenter}
            onItemSelected={onItemSelected}
          />
        ))}
      </StackView>
      {children}
      <StackView offset={offset} type='odd'>
        {odd.front.map((item, idx) => (
          <Item
            key={`${item.name}-${idx}-odd-front`}
            data={item}
            offset={offset}
            onCenter={onCenter}
            onItemSelected={onItemSelected}
          />
        ))}
      </StackView>
      <StackView offset={offset} type='even'>
        {even.front.map((item, idx) => (
          <Item
            key={`${item.name}-${idx}-even-front`}
            data={item}
            offset={offset}
            onCenter={onCenter}
            onItemSelected={onItemSelected}
          />
        ))}
      </StackView>
    </div>
  );
});
export default Items;
