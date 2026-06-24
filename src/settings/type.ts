import Sounds from '@/components/sounds';
import { Dispatch, ReactNode } from 'react';

export enum ActionType {
  Page = 'page',
  LoadingProcess = 'loadingProcess',
  Dataset = 'dataset',
  Sounds = 'sounds',
  Modal = 'modal',
  UserData = 'userData',
  SceneViewSize = 'sceneViewSize',
  Card = 'card',
  Questionnaire = 'questionnaire',
  Recent = 'recent',
  Article = 'article',
  Alert = 'alert',
  TripList = 'tripList',
}

export enum LoadingProcessType {
  Ball = 'balls',
  Bars = 'bars',
  Bubbles = 'bubbles',
  Cubes = 'cubes',
  Cylon = 'cylon',
  Spin = 'spin',
  SpinningBubbles = 'spinningBubbles',
  Spokes = 'spokes',
}

export enum TransitionType {
  Unset = 0,
  FadeIn = 1,
  FadeOut = 2,
  DidFadeIn = 3,
  DidFadeOut = 4,
  Loop = 5,
  Stop = 6,
}

export type TLoadingProcessState = {
  enabled?: boolean;
  type?: LoadingProcessType;
  body?: '';
};

export type TDatasetState = {
  dataset: { [key: string]: string | undefined };
};

export type TSounds = { track?: Sounds };

export type TModalState = {
  enabled?: boolean;
  title?: string;
  body?: ReactNode;
  label?: [string, string?];
  onConfirm?: (label: string) => void;
  onClose?: () => void;
};

export type TCharacterName =
  | '小桃_正_灰底'
  | '小綠_正_灰底'
  | '小藍_正_灰底'
  | '小橘_正_灰底'
  | '小灰_正_灰底'
  | '小黃_正_灰底';

export enum PostMessageList {
  'iframe-height-change' = 'iframe-height-change',
  'iframe-video-complete' = 'iframe-video-complete',
  'iframe-audio-complete' = 'iframe-audio-complete',
  'iframe-first-addBookmark' = 'iframe-first-addBookmark',
  'iframe-first-addFavorite' = 'iframe-first-addFavorite',
}

export type TUserDataContent = {
  baseRequirement: number;
  baseReward: number;
  contentCategory: 'Video' | 'Audio' | 'Article';
  careerRequirement: number;
  careerReward: number;
  contentId: number;
  financeRequirement: number;
  financeReward: number;
  healthRequirement: number;
  healthReward: number;
  hubSpot_AuthorAvatar: string;
  hubSpot_AuthorBio: string;
  hubSpot_AuthorDisplayName: string;
  hubSpot_AuthorFullName: string;
  hubSpot_AuthorId: string;
  hubSpot_AuthorName: string;
  hubSpot_FeaturedImage: string;
  hubSpot_HtmlTitle: string;
  hubSpot_Id: string;
  hubSpot_Name: string;
  hubSpot_PostBody: string;
  hubSpot_Post_Subtitle: string;
  hubSpot_Post_Title: string;
  hubSpot_PrimaryTag: 'CAREER' | 'FINANCE' | 'HEALTH' | 'RELATIONS' | 'SOCIETY' | 'NONE';
  hubSpot_SecondaryTag: 'CAREER' | 'FINANCE' | 'HEALTH' | 'RELATIONS' | 'SOCIETY' | 'NONE';
  hubSpot_PostCollection: string;
  hubSpot_Url: string;
  isFavorited: boolean;
  isLiked: boolean;
  isUnlockRequired: boolean;
  minerCount: number;
  relationsRequirement: number;
  relationsReward: number;
  societyRequirement: number;
  societyReward: number;
};

export type TUserDataState = {
  journey?: '金黃稻浪' | '花海平原' | '蔚藍海岸' | '月夜雪地' | '晴光森林';
  character?: TCharacterName;
  memberId?: string;
  memberInfoDto?: {
    allowEDM?: boolean;
    baseNum?: number;
    birthday?: any | null;
    birthdayUpdatedAt?: any | null;
    careerNum?: number;
    communityNum?: number;
    email?: string;
    favoriteContentList?: any[];
    financeNum?: number;
    gender?: string;
    hasCheckedIn?: boolean;
    healthNum?: number;
    image?: string;
    isBirthdayEditable?: boolean;
    likeContentList?: any[];
    name?: string;
    nickName?: string;
    phone?: string;
    relationsNum?: number;
    tripId?: string;
    unlockContentList?: any[];
    unlockEventList?: any[];
  };
  token?: string;
  contents: TUserDataContent[];
};

export type TSceneViewSizeState = {
  height?: number;
  width?: number;
  coverPercent?: number;
  containPercent?: number;
  ratio?: number;
};

export type TCardState = {
  enabled?: boolean;
  navBarIcon?: { video: ReactNode; audio: ReactNode; article: ReactNode };
  data?: TUserDataContent;
};

export type TQuestionnaireOption = {
  headline: React.ReactNode;
  options?: { label: string; value: string }[];
  name?: string;
  confirmLabel?: string;
  type: 'Modal' | 'Recent';
};

export type TQuestionnaireState = {
  enabled?: boolean;
  has_triggered?: boolean;
  question?: TQuestionnaireOption[];
  onClose?: () => void;
};

export type TRecentState = {
  enabled?: boolean;
  title?: ReactNode;
  onClick?: () => void;
};

export type TArticleState = {
  enabled?: boolean;
  url?: string;
  onClose?: () => void;
};

export type TAlertState = {
  enabled?: boolean;
  message?: ReactNode;
  aliveDuration?: number;
  onClose?: () => void;
};

export type TTripList = {
  minerList: {
    minerId: string;
    name: string;
    order: number;
    image: string;
  }[];
  quizList: {
    quizId: string;
    name: string;
  }[];
  tripList: {
    trip: string;
    name: string;
  }[];
};

export interface IState {
  [ActionType.Page]: string;
  [ActionType.LoadingProcess]: TLoadingProcessState;
  [ActionType.Dataset]: TDatasetState;
  [ActionType.Sounds]: TSounds;
  [ActionType.Modal]: TModalState;
  [ActionType.UserData]: TUserDataState;
  [ActionType.SceneViewSize]: TSceneViewSizeState;
  [ActionType.Card]: TCardState;
  [ActionType.Questionnaire]: TQuestionnaireState;
  [ActionType.Recent]: TRecentState;
  [ActionType.Article]: TArticleState;
  [ActionType.Alert]: TAlertState;
  [ActionType.TripList]: TTripList;
}

export interface IAction {
  state: IState | Partial<IState[ActionType]>;
  type: ActionType;
}

export type TContext = [IState, Dispatch<IAction>];

export interface IReactProps {
  readonly children?: ReactNode;
}
