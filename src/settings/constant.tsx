import { faker } from '@faker-js/faker';
import QueryString from 'lesca-url-parameters';
import { createContext } from 'react';
import { CardDemoData, PAGE, QuestionnaireDemoData } from './config';
import {
  ActionType,
  IAction,
  IState,
  LoadingProcessType,
  TAlertState,
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
  TTripList,
  TUserDataState,
} from './type';

export const LoadingProcessState: TLoadingProcessState = {
  enabled: false,
  type: LoadingProcessType.SpinningBubbles,
  body: '',
};

export const DatasetState: TDatasetState = {
  dataset: {
    baseUri: window.location.origin + '/',
  },
};

export const ModalState: TModalState = {
  enabled: false,
};

const characterList: TCharacterName[] = [
  '小桃_正_灰底',
  '小綠_正_灰底',
  '小藍_正_灰底',
  '小橘_正_灰底',
  '小灰_正_灰底',
  '小黃_正_灰底',
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

const getCharacterName: () => TUserDataState['character'] | null = () => {
  const character = QueryString.get('character');
  switch (character) {
    case '1':
      return characterList[0];
    case '2':
      return characterList[1];
    case '3':
      return characterList[2];
    case '4':
      return characterList[3];
    case '5':
      return characterList[4];
    case '6':
      return characterList[5];

    default:
      return null;
  }
};

export const UserDataState: TUserDataState = {
  journey: getJourneyName(),
  character: getCharacterName() || characterList[Math.floor(Math.random() * characterList.length)],
  contents: [],
  memberInfoDto: {
    baseNum: faker.number.int({ min: 0, max: 100 }),
    careerNum: faker.number.int({ min: 0, max: 100 }),
    financeNum: faker.number.int({ min: 0, max: 100 }),
    healthNum: faker.number.int({ min: 0, max: 100 }),
    relationsNum: faker.number.int({ min: 0, max: 100 }),
    communityNum: faker.number.int({ min: 0, max: 100 }),
    name: faker.person.firstName(),
    nickName: faker.person.fullName(),
  },
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
  url: 'https://mine.kgifund.com.tw/tisa-fund-guide',
  onClose: () => {},
};

const getPageByQueryString = (): IState[ActionType.Page] => {
  const page = QueryString.get('page');
  switch (page) {
    default:
    case '1':
      return PAGE.home;
    case '2':
      return PAGE.journey;
    case '3':
      return PAGE.demo;
  }
};

export const AlertState: TAlertState = {
  enabled: false,
  aliveDuration: 0,
  message: (
    <>
      獲得
      <div className='icon icon-career' />
      社群礦 1 枚、
      <div className='icon icon-relations' />
      人際礦 1 枚
    </>
  ),
  onClose: () => {},
};

export const TripListState: TTripList = {
  minerList: [],
  quizList: [],
  tripList: [],
};

export const InitialState: IState = {
  [ActionType.Page]: getPageByQueryString(),
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
  [ActionType.Alert]: AlertState,
  [ActionType.TripList]: TripListState,
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
