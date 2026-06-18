import useContent from '@/hooks/useContent';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import { createContext, Dispatch, memo, SetStateAction, useContext, useEffect } from 'react';
import { JourneyContext, JourneySceneType, JourneyStepType } from './config';
import useActiveTrip from '@/hooks/useActiveTrip';

export type TJourneyEventsState = {
  isCharacterStopped: boolean;
  onLoopChange: {
    loop: number;
  };
  onEncounteringRoadSign: {
    index: number;
    prev: number;
    callback: () => void;
  };
  onItemSelected: {
    index: number;
    prev: number;
    callback: (name: string) => void;
  };
  onJourneyEnd: {
    index: number;
    prev: number;
    callback: () => void;
  };
  onContentEmpty: {
    index: number;
    prev: number;
    callback: () => void;
  };
};

export type TJourneyEventsContext = [
  TJourneyEventsState,
  Dispatch<SetStateAction<TJourneyEventsState>>,
];

export const JourneyEventsState: TJourneyEventsState = {
  onEncounteringRoadSign: { index: -1, prev: -1, callback: () => {} },
  onItemSelected: { index: -1, prev: -1, callback: () => {} },
  onJourneyEnd: { index: -1, prev: -1, callback: () => {} },
  onLoopChange: { loop: -1 },
  onContentEmpty: { index: -1, prev: -1, callback: () => {} },
  isCharacterStopped: false,
};

export const JourneyEventsContext = createContext<TJourneyEventsContext>([
  JourneyEventsState,
  () => {},
]);

export const JourneyEventProvider = memo(({ children }: IReactProps) => {
  const [context, setContext] = useContext(Context);
  const { contents } = context[ActionType.UserData]!;

  const [state, setState] = useContext(JourneyContext);
  const [eventState, setEventState] = useContext(JourneyEventsContext);
  const [, getActiveTrip] = useActiveTrip();
  const [contentResponse, getContent] = useContent();

  useEffect(() => {
    if (!eventState.isCharacterStopped) return;
    if (eventState.onItemSelected.index !== eventState.onItemSelected.prev) {
      setContext({ type: ActionType.Card, state: { enabled: true } });

      // 根據選擇的項目索引，更新卡片內容
      const { index } = eventState.onItemSelected;
      const currentContent = contents[index];
      setContext({ type: ActionType.Card, state: { data: currentContent } });
      eventState.onItemSelected.prev = index;
    }
  }, [eventState.onItemSelected, eventState.isCharacterStopped, contents]);

  useEffect(() => {
    if (!eventState.isCharacterStopped) return;

    if (eventState.onEncounteringRoadSign.index !== eventState.onEncounteringRoadSign.prev) {
      // TODO: 顯示對話框，詢問玩家是否要探索新的路線
      setContext({
        type: ActionType.Modal,
        state: {
          enabled: true,
          body: '是否探索一條新的路線?',
          label: ['好的', '暫時不要'],
          onConfirm: (label) => {
            if (label === '好的') {
              // TODO: 根據玩家選擇的路線，更新與當前不重複旅程場景
              const scenes = Object.values(JourneySceneType).filter(
                (scene) => scene !== state.scene,
              );
              const randomScene = scenes[Math.floor(Math.random() * scenes.length)];
              // 根據選擇的路線，更新旅程場景
              getActiveTrip({ trip: randomScene }).then((response) => {
                if (response.isSuccess) {
                  setState((S) => ({
                    ...S,
                    loop: -1,
                    scene: randomScene,
                    step: JourneyStepType.unset,
                  }));
                }
              });
            } else {
              setState((S) => ({ ...S, step: JourneyStepType.resume }));
            }
          },
          onClose: () => {
            setState((S) => ({ ...S, step: JourneyStepType.resume }));
          },
        },
      });
      eventState.onEncounteringRoadSign.prev = eventState.onEncounteringRoadSign.index;
    }
  }, [eventState.onEncounteringRoadSign, eventState.isCharacterStopped]);

  useEffect(() => {
    if (contentResponse) {
      if (contentResponse.isSuccess) {
        const currentResult = contentResponse.result
          .filter((content) => content.contentId)
          .filter((content) => content.hubSpot_Id)
          .filter((_, index) => index === 9999);

        console.log(`新的資料有${currentResult.length}筆`, currentResult);

        if (currentResult.length === 0) {
          // 旅程結束，重置所有狀態
          setState((S) => ({ ...S, step: JourneyStepType.fadeOut }));
          setEventState((S) => ({
            ...S,
            onJourneyEnd: {
              ...S.onJourneyEnd,
              index: S.onJourneyEnd.index + 1,
            },
          }));
        } else {
          // 還有內容，繼續旅程
          eventState.onContentEmpty.callback();
          setContext({ type: ActionType.UserData, state: { contents: currentResult } });
        }
      }
    }
  }, [contentResponse]);

  useEffect(() => {
    if (eventState.onContentEmpty.index !== eventState.onContentEmpty.prev) {
      getContent();
      eventState.onContentEmpty.prev = eventState.onContentEmpty.index;
    }
  }, [eventState.onContentEmpty]);

  useEffect(() => {
    if (!eventState.isCharacterStopped) return;
    if (eventState.onJourneyEnd.index !== eventState.onJourneyEnd.prev) {
      // TODO: 旅程結束，顯示問卷
      setContext({
        type: ActionType.Questionnaire,
        state: {
          enabled: true,
          onClose: () => {
            setState((S) => ({ ...S, step: JourneyStepType.resume }));
          },
        },
      });
      eventState.onJourneyEnd.callback();
      eventState.onJourneyEnd.prev = eventState.onJourneyEnd.index;
    }
  }, [eventState.onJourneyEnd, eventState.isCharacterStopped]);

  useEffect(() => {
    if (eventState.onLoopChange.loop === -1) return;
    console.log(`畫布第${eventState.onLoopChange.loop + 1}圈`);
  }, [eventState.onLoopChange]);

  return <>{children}</>;
});
export default JourneyEventProvider;
