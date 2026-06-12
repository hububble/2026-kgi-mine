import { JourneyItemsList, JourneySceneType, JourneyStaticItemsList } from '@/pages/journey/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { useContext, useEffect, useRef, useState } from 'react';
import useURI from './useURI';

export type TDataDiversionItem = {
  dissociation: string;
  name: string;
  path: string;
  top: number;
  left: number;
  clicked?: boolean;
  index?: number;
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
      // 洗牌並分組資料
      const itemsList = JourneyItemsList[scene].filter((item) => !item.name.includes('roadSign'));
      const shuffledItemsList = itemsList.sort(() => Math.random() - 0.5);
      const itemsLineUpSameAsContentLength = [...new Array(contents.length)].map(
        (_, i) => shuffledItemsList[i % shuffledItemsList.length],
      );

      // 把路牌塞入固定在第8個位置，如果內容長度超過7的話，如果內容長度不足7的話就塞在內容長度的下一個位置
      const contentLength = contents.length;
      const roadSign = JourneyItemsList[scene].find((item) => item.name.includes('roadSign'))!;
      const itemsWithRoadSign =
        contentLength > 7
          ? itemsLineUpSameAsContentLength
              .slice(0, 7)
              .concat(roadSign)
              .concat(itemsLineUpSameAsContentLength.slice(7))
          : itemsLineUpSameAsContentLength.concat(roadSign);

      // 把items分成每組3個
      const groupList: TDataDiversionItem[][] = [];
      let indexCounter = 0;
      for (let i = 0; i < itemsWithRoadSign.length; i += 3) {
        const group: TDataDiversionItem[] = itemsWithRoadSign
          .slice(i, i + 3)
          .map((item) =>
            item.name.includes('roadSign')
              ? { ...item, clicked: false }
              : { ...item, clicked: false, index: (indexCounter += 1) },
          );
        groupList.push(group);
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

      [...allData.front, ...allData.back].flat().forEach((item) => {
        if (item.name) setURI({ path: item.path, name: item.name });
      });
    }

    // 預載入圖片
    staticData.forEach((item) => {
      setURI({ path: item.path, name: item.name });
    });

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
