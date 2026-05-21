import { createContext, Dispatch, SetStateAction } from 'react';

export enum DemoPageType {
  landing = '/landing',
  iframe = '/iframe',
}

export enum DemoStepType {
  unset,
}
export type TDemoState = { step: DemoStepType; page: DemoPageType };
export type TDemoContext = [TDemoState, Dispatch<SetStateAction<TDemoState>>];

export const DemoState = { step: DemoStepType.unset, page: DemoPageType.landing };
export const DemoContext = createContext<TDemoContext>([DemoState, () => {}]);
