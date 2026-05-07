import { createContext } from 'react';
import { CardDemoData, PAGE, QuestionnaireDemoData } from './config';
import {
  ActionType,
  IAction,
  IState,
  LoadingProcessType,
  TArticleState,
  TCardState,
  TCharacterName,
  TContext,
  TDatasetState,
  TLoadingProcessState,
  TModalState,
  TQuestionnaireState,
  TRecentState,
  TSceneViewSizeState,
  TUserDataState,
} from './type';
import QueryString from 'lesca-url-parameters';

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

const characterList: TCharacterName[] = [
  'character-blue',
  'character-green',
  'character-orange',
  'character-yellow',
  'character-peach',
  'character-gray',
];

const journey = QueryString.get('journey');
const getJourneyName: () => TUserDataState['journey'] = () => {
  switch (journey) {
    default:
    case '1':
      return '晴光森林';
    case '2':
      return '金黃稻浪';
    case '4':
      return '花海平原';
    case '3':
      return '蔚藍海岸';
    case '5':
      return '月夜雪地';
  }
};

export const UserDataState: TUserDataState = {
  journey: getJourneyName(),
  character: characterList[Math.floor(Math.random() * characterList.length)],
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
  onClose: () => {},
};

// 最近活動
export const RecentState: TRecentState = {
  enabled: false,
  title: '探索更多活動',
};

// 文章
export const ArticleState: TArticleState = {
  enabled: false,
  type: 'article',
  onClose: () => {},
};

export const InitialState: IState = {
  [ActionType.Page]: QueryString.get('page') === '1' ? PAGE.journey : PAGE.home,
  [ActionType.LoadingProcess]: LoadingProcessState,
  [ActionType.Dataset]: DatasetState,
  [ActionType.Sounds]: { track: undefined },
  [ActionType.Modal]: ModalState,
  [ActionType.UserData]: UserDataState,
  [ActionType.SceneViewSize]: SceneViewSizeState,
  [ActionType.Card]: CardState,
  [ActionType.Questionnaire]: QuestionnaireState,
  [ActionType.Recent]: RecentState,
  [ActionType.Article]: ArticleState,
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
