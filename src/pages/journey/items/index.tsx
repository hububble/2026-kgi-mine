import ParallaxView from '@/components/parallaxView';
import useURI from '@/hooks/useURI';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { JourneyContext, JourneyItemsList, JourneyStepType } from '../config';
import './index.less';
import './static.less';
import Item from './item';

type TJourneyItemsProps = {
  offset: number;
  items: ({
    name: string;
    top: number;
    left: number;
    clicked: boolean;
    dissociation: 'back' | 'front';
  } | null)[];
  staticItems?: { name: string; top: number; left: number; clicked: boolean }[];
  onCenter?: (item: string) => void;
  onItemSelected?: (item: string) => void;
  loop?: boolean;
  dissociation: 'back' | 'front';
};

const Items = memo((props: TJourneyItemsProps) => {
  const { offset, items, staticItems, onCenter, onItemSelected, loop, dissociation } = props;

  const [, setContext] = useContext(Context);
  const [state, setState] = useContext(JourneyContext);
  const [currentItems, setCurrentItems] = useState(items);
  const [left, setLeft] = useState('');
  const [, setURI] = useURI();

  useEffect(() => {
    const { scene } = state;
    const items = JourneyItemsList[scene];
    items.forEach((item) => setURI({ path: item.path, name: item.name }));
  }, [state.scene]);

  const onSelected = useCallback(
    (item: string) => {
      setCurrentItems((items) =>
        items.map((i) => (i && i.name === item ? { ...i, clicked: true } : i)),
      );
      setContext({ type: ActionType.Card, state: { enabled: true } });
      setState((S) => ({ ...S, step: JourneyStepType.fadeOut }));
      onItemSelected?.(item);
    },
    [setState, setContext],
  );

  return (
    <ParallaxView
      className='Item'
      offset={offset}
      loop={loop}
      onLeftChange={setLeft}
      onDirectionChange={(direction) => {
        setState((S) => {
          return {
            ...S,
            view: {
              direction,
              index:
                S.view.direction !== direction && S.view.direction !== 'unset'
                  ? S.view.index + 1
                  : S.view.index,
            },
          };
        });
      }}
      staticNode={staticItems?.map(
        (item) =>
          item && (
            <Item
              key={item.name}
              item={item}
              y={item.top + 5.5}
              x={(item.left / 3840) * 100}
              left={left}
              onCenter={() => onCenter?.(item.name)}
              onItemSelected={() => onSelected?.(item.name)}
            />
          ),
      )}
      leftNode={
        state.view.direction === 'left' &&
        currentItems
          .filter((_, index) => state.view.index === index)
          .filter((item) => item?.dissociation === dissociation)
          .map(
            (item) =>
              item && (
                <Item
                  key={item.name}
                  item={item}
                  y={item.top + 5.5}
                  x={(item.left / 3840) * 100}
                  left={left}
                  onCenter={() => onCenter?.(item.name)}
                  onItemSelected={() => onSelected?.(item.name)}
                />
              ),
          )
      }
      rightNode={
        state.view.direction === 'right' &&
        currentItems
          .filter((_, index) => state.view.index === index)
          .filter((item) => item?.dissociation === dissociation)
          .map(
            (item) =>
              item && (
                <Item
                  key={item.name}
                  item={item}
                  y={item.top + 5.5}
                  x={(item.left / 3840) * 100}
                  left={left}
                  onCenter={() => onCenter?.(item.name)}
                  onItemSelected={() => onSelected?.(item.name)}
                />
              ),
          )
      }
    />
  );
});
export default Items;
