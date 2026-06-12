import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import { createContext, Dispatch, memo, SetStateAction, useContext, useEffect } from 'react';
import { JourneyContext, JourneySceneType, JourneyStepType } from './config';

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
  isCharacterStopped: false,
};

export const JourneyEventsContext = createContext<TJourneyEventsContext>([
  JourneyEventsState,
  () => {},
]);

export const JourneyEventProvider = memo(({ children }: IReactProps) => {
  const [context, setContext] = useContext(Context);
  const { contents } = context[ActionType.UserData]!;

  const [, setState] = useContext(JourneyContext);
  const [eventState] = useContext(JourneyEventsContext);

  useEffect(() => {
    if (!eventState.isCharacterStopped) return;
    if (eventState.onItemSelected.index !== eventState.onItemSelected.prev) {
      setContext({ type: ActionType.Card, state: { enabled: true } });

      // 根據選擇的項目索引，更新卡片內容
      const { index } = eventState.onItemSelected;
      const currentContent = contents[index];
      console.log(currentContent);

      eventState.onItemSelected.prev = index;
    }
  }, [eventState.onItemSelected, eventState.isCharacterStopped, contents]);

  useEffect(() => {
    if (!eventState.isCharacterStopped) return;

    if (eventState.onEncounteringRoadSign.index !== eventState.onEncounteringRoadSign.prev) {
      setContext({
        type: ActionType.Modal,
        state: {
          enabled: true,
          body: '是否探索一條新的路線?',
          label: ['好的', '暫時不要'],
          onConfirm: (label) => {
            if (label === '好的') {
              setState((S) => {
                const scenes = Object.values(JourneySceneType).filter((scene) => scene !== S.scene);
                return {
                  ...S,
                  loop: -1,
                  scene: scenes[Math.floor(Math.random() * scenes.length)],
                  step: JourneyStepType.unset,
                };
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
    if (!eventState.isCharacterStopped) return;

    if (eventState.onJourneyEnd.index !== eventState.onJourneyEnd.prev) {
      // 旅程結束，重置所有狀態
      setContext({
        type: ActionType.Questionnaire,
        state: {
          enabled: true,
          onClose: () => {
            setState((S) => ({ ...S, step: JourneyStepType.resume }));
          },
        },
      });
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
