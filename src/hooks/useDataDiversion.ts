import { JourneyItemsList, JourneySceneType } from '@/pages/journey/config';
import { TUserDataState } from '@/settings/type';
import QueryString from 'lesca-url-parameters';
import { useEffect, useState } from 'react';

//  const items = useMemo(() => {
//     const { scene } = state;
//     const currentList = JourneyItemsList[scene];

//     const pickCount = Math.min(
//       currentList?.length || 1,
//       JourneySceneDebug.count === 'max' ? currentList.length : JourneySceneDebug.count,
//     );

//     const roadSign = currentList.find((item) => item.name.includes('roadSign'));
//     const currentListWithoutRoadSign = currentList.filter(
//       (item) => !item.name.includes('roadSign'),
//     );
//     const items = currentListWithoutRoadSign.sort(() => Math.random() - 0.5).slice(0, pickCount);
//     if (roadSign) items.splice(1, 0, roadSign);

//     const currentItems = items.map((item) => {
//       const dissociation = item.top < 5.5 ? 'back' : ('front' as 'back' | 'front');
//       return { name: item.name, top: item.top, left: item.left, clicked: false, dissociation };
//     });

//     return [null, ...currentItems];
//   }, [state.scene]);

type TDataDiversionState = {
  index: number;
  scene: JourneySceneType | '';
  data: ({ name: string; path: string; top: number; left: number } | null)[];
};

const useDataDiversion = ({ index = 0, scene }: { index: number; scene: JourneySceneType }) => {
  const [state, setState] = useState<TDataDiversionState>({ index, scene, data: [] });

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
    const groupList: TDataDiversionState['data'][] = [];
    for (let i = 0; i < currentListWithoutRoadSign.length; i += pickCount) {
      const group: TDataDiversionState['data'] = currentListWithoutRoadSign.slice(i, i + pickCount);
      while (group.length < pickCount) group.push(null);
      groupList.push(group);
    }

    if (roadSign) groupList.splice(1, 0, [roadSign, null, null]);
  }, [state]);

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
