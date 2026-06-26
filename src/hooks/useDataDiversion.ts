import {
  JourneyContext,
  JourneyItemsList,
  JourneySceneDebug,
  JourneySceneSetting,
  JourneyStaticItemsList,
} from '@/pages/journey/config';
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
  data: TDataDiversionStateData;
};

const useDataDiversion = () => {
  const [context] = useContext(Context);
  const { contents } = context[ActionType.UserData]!;

  const [{ loop, scene, startFetchData }] = useContext(JourneyContext);

  const [state, setState] = useState<TDataDiversionState>({
    data: { back: [], front: [], static: [] },
  });

  const dataRef = useRef<TDataDiversionData>({ back: [], front: [], static: [] });

  const [, setURI] = useURI();

  useEffect(() => {
    if (!scene) return;
    dataRef.current = { back: [], front: [], static: [] };
  }, [scene]);

  useEffect(() => {
    if (startFetchData) dataRef.current = { back: [], front: [], static: [] };
  }, [startFetchData]);

  useEffect(() => {
    if (!scene) return;

    let allData: TDataDiversionData = { ...dataRef.current };
    let staticData = JourneyStaticItemsList[scene] || [];

    if (contents.length === 0) {
      const data = {
        back: [],
        front: [],
        static: staticData,
      };
      setState((S) => ({ ...S, data }));
      return;
    }

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

      // 把items分成每組groupCount個
      const groupCount = JourneySceneDebug.enabled
        ? JourneySceneDebug.count
        : Math.min(JourneySceneSetting.itemCountOfScene, itemsList.length);

      const groupList: TDataDiversionItem[][] = [];
      let indexCounter = 0;
      for (let i = 0; i < itemsWithRoadSign.length; i += groupCount) {
        const group: TDataDiversionItem[] = itemsWithRoadSign
          .slice(i, i + groupCount)
          .map((item) =>
            item.name.includes('roadSign')
              ? { ...item, clicked: false }
              : { ...item, clicked: false, index: (indexCounter += 1) },
          );
        groupList.push(group);
      }

      allData = groupList.reduce(
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
      back: allData.back[loop] || [],
      front: allData.front[loop] || [],
      static: staticData,
    };

    setState((S) => ({ ...S, data }));
  }, [scene, loop, contents]);

  const forceUpdate = () => {
    dataRef.current = { back: [], front: [], static: [] };
  };

  return [state, forceUpdate] as const;
};
export default useDataDiversion;
