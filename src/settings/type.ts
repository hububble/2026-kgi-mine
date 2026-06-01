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
  | 'character-blue'
  | 'character-green'
  | 'character-orange'
  | 'character-yellow'
  | 'character-peach'
  | 'character-gray';

export enum PostMessageList {
  'iframe-height-change' = 'iframe-height-change',
  'iframe-video-complete' = 'iframe-video-complete',
  'iframe-audio-complete' = 'iframe-audio-complete',
  'iframe-first-addBookmark' = 'iframe-first-addBookmark',
  'iframe-first-addFavorite' = 'iframe-first-addFavorite',
}

export type TUserDataState = {
  journey?: '金黃稻浪' | '花海平原' | '蔚藍海岸' | '月夜雪地' | '晴光森林';
  character?: TCharacterName;
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
  cardURI?: { path: string; name: string }[];
  headline?: ReactNode;
  navigator?: string;
  navBarIcon?: ReactNode;
  mines?: { type: 'career' | 'finance' | 'health' | 'relations' | 'society'; count: number }[];
  topic?: string;
};

export type TQuestionnaireOption = {
  headline: React.ReactNode;
  options?: { label: string; value: string }[];
  confirmLabel?: string;
  type: 'Modal' | 'Recent';
};

export type TQuestionnaireState = {
  enabled?: boolean;
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
  type?: 'article' | 'video' | 'audio';
  onClose?: () => void;
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
}

export interface IAction {
  state: IState | Partial<IState[ActionType]>;
  type: ActionType;
}

export type TContext = [IState, Dispatch<IAction>];

export interface IReactProps {
  readonly children?: ReactNode;
}
