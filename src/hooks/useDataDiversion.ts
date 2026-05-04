import { JourneyItemsList, JourneySceneType, JourneyStaticItemsList } from '@/pages/journey/config';
import QueryString from 'lesca-url-parameters';
import { useEffect, useState } from 'react';
import useURI from './useURI';

export type TDataDiversionItem = {
  dissociation: string;
  name: string;
  path: string;
  top: number;
  left: number;
  clicked?: boolean;
};

type TDataDiversionData = {
  back: TDataDiversionItem[][];
  front: TDataDiversionItem[][];
  static: TDataDiversionItem[][];
};

export type TDataDiversionStateData = {
  back: TDataDiversionItem[];
  front: TDataDiversionItem[];
  static: TDataDiversionItem[];
};

type TDataDiversionState = {
  index: number;
  scene: JourneySceneType | '';
  data: TDataDiversionStateData;
};

const useDataDiversion = ({ index = 0, scene }: { index: number; scene: JourneySceneType }) => {
  const [state, setState] = useState<TDataDiversionState>({
    index,
    scene,
    data: { back: [], front: [], static: [] },
  });

  const [, setURI] = useURI();

  useEffect(() => {
    const { scene } = state;
    if (!scene) return;
    const currentList = JourneyItemsList[scene];
    const length = currentList.length;
    const roadSign = currentList.find((item) => item.name.includes('roadSign'));

    const currentListWithoutRoadSign = currentList
      .filter((item) => !item.name.includes('roadSign'))
      .sort(() => Math.random() - 0.5);

    const pickCount = Math.min(Number(QueryString.get('count')) || 3, length);

    const groupList: TDataDiversionItem[][] = [];

    for (let i = 0; i < currentListWithoutRoadSign.length; i += pickCount) {
      const group: TDataDiversionItem[] = currentListWithoutRoadSign
        .slice(i, i + pickCount)
        .map((item) => ({ ...item, clicked: false }));
      while (group.length < pickCount)
        group.push({ name: '', path: '', top: 0, left: 0, clicked: true, dissociation: 'back' });
      groupList.push(group);
    }

    if (roadSign) {
      groupList.splice(1, 0, [
        { ...roadSign, clicked: false },
        { name: '', path: '', top: 0, left: 0, clicked: true, dissociation: 'back' },
        { name: '', path: '', top: 0, left: 0, clicked: true, dissociation: 'back' },
      ]);
    }

    const allData: TDataDiversionData = groupList.reduce(
      (acc, group) => {
        const backGroup: TDataDiversionItem[] = [];
        const frontGroup: TDataDiversionItem[] = [];
        group.forEach((item) => {
          if (item.dissociation === 'back') {
            backGroup.push(item);
            frontGroup.push({
              name: '',
              path: '',
              top: 0,
              left: 0,
              clicked: true,
              dissociation: 'front',
            });
          } else {
            frontGroup.push(item);
            backGroup.push({
              name: '',
              path: '',
              top: 0,
              left: 0,
              clicked: true,
              dissociation: 'back',
            });
          }
        });
        acc.back.push(backGroup);
        acc.front.push(frontGroup);
        return acc;
      },
      { back: [], front: [], static: [] } as TDataDiversionData,
    );

    const staticData = JourneyStaticItemsList[scene] || [];

    const data = {
      back: allData.back[state.index] || [],
      front: allData.front[state.index] || [],
      static: staticData,
    };

    staticData.forEach((item) => {
      setURI({ path: item.path, name: item.name });
    });

    [...data.front, ...data.back].forEach((item) => {
      if (item.name) setURI({ path: item.path, name: item.name });
    });

    setState((S) => ({ ...S, data }));
  }, [state.scene, state.index]);

  const updateStep = ({ step, scene }: { step?: number; scene?: JourneySceneType }) => {
    setState((S) => ({
      ...S,
      index: step === undefined ? S.index + 1 : step,
      scene: !scene ? S.scene : scene,
    }));
  };

  return [state, updateStep] as const;
};
export default useDataDiversion;
