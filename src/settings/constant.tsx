import { createContext } from 'react';
import { CardDemoData, PAGE, QuestionnaireDemoData } from './config';
import {
  ActionType,
  IAction,
  IState,
  LoadingProcessType,
  TCardState,
  TContext,
  TDatasetState,
  TLoadingProcessState,
  TModalState,
  TQuestionnaireState,
  TRecentState,
  TSceneViewSizeState,
  TUserDataState,
} from './type';

export const LoadingProcessState: TLoadingProcessState = {
  enabled: false,
  type: LoadingProcessType.SpinningBubbles,
  body: '',
};

export const DatasetState: TDatasetState = {
  dataset: {
    baseUri: window.location.origin,
  },
};

export const ModalState: TModalState = {
  enabled: false,
};

export const UserDataState: TUserDataState = {
  journey: '金黃稻浪',
  character: undefined,
};

export const SceneViewSizeState: TSceneViewSizeState = {
  height: undefined,
  width: undefined,
};

// 卡片
export const CardState: TCardState = {
  enabled: false,
  ...CardDemoData,
};

// 問券
export const QuestionnaireState: TQuestionnaireState = {
  enabled: false,
  question: QuestionnaireDemoData,
};

// 最近活動
export const RecentState: TRecentState = {
  enabled: false,
  title: '探索更多活動',
};

export const InitialState: IState = {
  [ActionType.Page]: PAGE.journey,
  [ActionType.LoadingProcess]: LoadingProcessState,
  [ActionType.Dataset]: DatasetState,
  [ActionType.Sounds]: { track: undefined },
  [ActionType.Modal]: ModalState,
  [ActionType.UserData]: UserDataState,
  [ActionType.SceneViewSize]: SceneViewSizeState,
  [ActionType.Card]: CardState,
  [ActionType.Questionnaire]: QuestionnaireState,
  [ActionType.Recent]: RecentState,
};

export const Context = createContext<TContext>([InitialState, () => {}]);
export const Reducer = (state: IState, action: IAction): IState => {
  if (action.state instanceof Object) {
    let stateStorage: { [key: string]: any } = {};
    Object.entries(action.state)
      .filter((actionState) => {
        const value = Object.values(ActionType).filter(
          (actionValue) => actionValue === actionState[0],
        );
        if (value.length > 0 || action.type) return true;
        return false;
      })
      .map((actionState) => {
        const value = Object.values(ActionType).filter(
          (actionValue) => actionValue === actionState[0],
        );
        if (value.length > 0) return actionState;
        return [action.type, Object.fromEntries([actionState])];
      })
      .forEach((actionState) => {
        if (actionState) {
          const [key, value] = actionState;
          const stringKey = String(key);
          const cloneVale = Object.fromEntries(
            Object.entries(state).filter((stateValue) => stateValue[0] === stringKey),
          )[action.type];
          if (Object.prototype.hasOwnProperty.call(stateStorage, stringKey)) {
            stateStorage = {
              [stringKey]: { ...stateStorage[stringKey], ...value },
            };
          } else stateStorage = { [stringKey]: { ...cloneVale, ...value } };
        }
      });
    return { ...state, ...stateStorage };
  }

  if (action.type) return { ...state, [action.type]: action.state };
  return state;
};
