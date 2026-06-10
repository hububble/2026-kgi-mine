import { ResponseType } from '@/hooks/useQuestion';
import { createContext, Dispatch, SetStateAction } from 'react';

export enum HomeStepType {
  unset,
  landingFadeIn,
  landingLogin,
  landingFadeOut,
  decadeFadeIn,
  decadeFadeOut,
  journeyFadeIn,
  journeyFadeOut,
  characterFadeIn,
  characterFadeOut,
}

export enum HomePageType {
  landing = 'landing',
  decade = 'decade',
  journey = 'journey',
  character = 'character',
}

export type THomeState = {
  step: HomeStepType;
  page: HomePageType;
  result?: ResponseType['result'];
  decadeData?: ResponseType['result']['quizList'];
  journeyData?: ResponseType['result']['tripList'];
  characterData?: ResponseType['result']['minerList'][number];
};
export type THomeContext = [THomeState, Dispatch<SetStateAction<THomeState>>];

export const HomeState: THomeState = { step: HomeStepType.unset, page: HomePageType.landing };
export const HomeContext = createContext<THomeContext>([HomeState, () => {}]);
