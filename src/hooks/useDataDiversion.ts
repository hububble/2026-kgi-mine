import {
  JourneyItemsList,
  JourneySceneDebug,
  JourneySceneType,
  JourneyStaticItemsList,
} from '@/pages/journey/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import QueryString from 'lesca-url-parameters';
import { useContext, useEffect, useRef, useState } from 'react';
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
  const [context] = useContext(Context);
  const { contents } = context[ActionType.UserData]!;

  const [state, setState] = useState<TDataDiversionState>({
    index,
    scene,
    data: { back: [], front: [], static: [] },
  });

  const dataRef = useRef<TDataDiversionData>({ back: [], front: [], static: [] });

  const [, setURI] = useURI();

  useEffect(() => {
    if (!state.scene) return;
    dataRef.current = { back: [], front: [], static: [] };
  }, [state.scene]);

  useEffect(() => {
    const { scene } = state;
    if (!scene) return;
    if (contents.length === 0) return;

    let allData: TDataDiversionData = dataRef.current;
    let staticData = JourneyStaticItemsList[scene] || [];

    if (dataRef.current.back.length === 0 && dataRef.current.front.length === 0) {
      console.log(contents);

      const currentList = JourneyItemsList[scene];
      const length = currentList.length;
      const roadSign = currentList.find((item) => item.name.includes('roadSign'));

      const currentListWithoutRoadSign = currentList
        .filter((item) => !item.name.includes('roadSign'))
        .sort(() => Math.random() - 0.5);

      const pickCount = Math.min(
        Number(QueryString.get('count')) || JourneySceneDebug.count,
        length,
      );
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
      dataRef.current = allData;

      // 預載入圖片
      staticData.forEach((item) => {
        setURI({ path: item.path, name: item.name });
      });

      [...allData.front, ...allData.back].flat().forEach((item) => {
        if (item.name) setURI({ path: item.path, name: item.name });
      });
    }

    const data = {
      back: allData.back[state.index] || [],
      front: allData.front[state.index] || [],
      static: staticData,
    };

    setState((S) => ({ ...S, data }));
  }, [state.scene, state.index, contents]);

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
