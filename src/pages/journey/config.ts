import QueryString from 'lesca-url-parameters';
import { createContext, Dispatch, SetStateAction } from 'react';

export enum JourneySceneType {
  金黃稻浪 = 'goldenRiceField',
  花海平原 = 'flowerSeaPlain',
  蔚藍海岸 = 'azureCoast',
  月夜雪地 = 'moonlitSnowfield',
  晴光森林 = 'lushForest',
}

export enum JourneyStepType {
  unset,
  fadeIn,
  loop,
  fadeOut,
  resume,
}

export enum JourneyDialogType {
  wish,
  navigator,
  subject,
}

export type TJourneyState = {
  step: JourneyStepType;
  scene: JourneySceneType;
  loop: number;
  selectedItem?: string;
  dialog: { enabled: boolean; type: JourneyDialogType };
  view: { direction: 'left' | 'right' | 'unset'; index: number };
};

export type TJourneyContext = [TJourneyState, Dispatch<SetStateAction<TJourneyState>>];

export const JourneyState: TJourneyState = {
  step: JourneyStepType.unset,
  scene: JourneySceneType.晴光森林,
  loop: -1,
  dialog: { enabled: false, type: JourneyDialogType.wish },
  view: { direction: 'unset', index: -1 },
};

export const JourneyContext = createContext<TJourneyContext>([JourneyState, () => {}]);

export const JourneySceneList = {
  [JourneySceneType.金黃稻浪]: [
    { path: 'scene-goldenRiceField-view-back.jpg', name: 'scene-backView' },
    { path: 'scene-goldenRiceField-view-middle.png', name: 'scene-middleView' },
    { path: 'scene-goldenRiceField-view-front.png', name: 'scene-frontView' },
  ],
  [JourneySceneType.花海平原]: [
    { path: 'scene-flowerSeaPlain-view-back.jpg', name: 'scene-backView' },
    { path: 'scene-flowerSeaPlain-view-middle.png', name: 'scene-middleView' },
    { path: 'scene-flowerSeaPlain-view-front.png', name: 'scene-frontView' },
  ],
  [JourneySceneType.蔚藍海岸]: [
    { path: 'scene-azureCoast-view-back.jpg', name: 'scene-backView' },
    { path: 'scene-azureCoast-view-middle.png', name: 'scene-middleView' },
    { path: 'scene-azureCoast-view-front.png', name: 'scene-frontView' },
  ],
  [JourneySceneType.月夜雪地]: [
    { path: 'scene-moonlitSnowfield-view-back.jpg', name: 'scene-backView' },
    { path: 'scene-moonlitSnowfield-view-middle.png', name: 'scene-middleView' },
    { path: 'scene-moonlitSnowfield-view-front.png', name: 'scene-frontView' },
  ],
  [JourneySceneType.晴光森林]: [
    { path: 'scene-lushForest-view-back.jpg', name: 'scene-backView' },
    { path: 'scene-lushForest-view-middle.png', name: 'scene-middleView' },
    { path: 'scene-lushForest-view-front.png', name: 'scene-frontView' },
  ],
};

export const JourneyItemsList = {
  [JourneySceneType.金黃稻浪]: [
    { name: 'goldenRiceField-roadSign', path: 'scene-goldenRiceField-roadSign.png', top: 6, left: 56, dissociation: 'back' },
    { name: 'goldenRiceField-item-1', path: 'scene-goldenRiceField-item-1.png', top: -9.8, left: 72, dissociation: 'back' },
    { name: 'goldenRiceField-item-2', path: 'scene-goldenRiceField-item-2.png', top: -8.2, left: 34.2, dissociation: 'back' },
    { name: 'goldenRiceField-item-3', path: 'scene-goldenRiceField-item-3.png', top: 11, left: 7, dissociation: 'back' },
    { name: 'goldenRiceField-item-4', path: 'scene-goldenRiceField-item-4.png', top: 12, left: 15.2, dissociation: 'back' },
    { name: 'goldenRiceField-item-5', path: 'scene-goldenRiceField-item-5.png', top: 16, left: 25, dissociation: 'front' },
    { name: 'goldenRiceField-item-6', path: 'scene-goldenRiceField-item-6.png', top: -8.9, left: 43.3, dissociation: 'back' },
    { name: 'goldenRiceField-item-7', path: 'scene-goldenRiceField-item-7.png', top: 6.4, left: 78.8, dissociation: 'back' },
  ],
  [JourneySceneType.花海平原]: [
    { name: 'flowerSeaPlain-roadSign', path: 'scene-flowerSeaPlain-roadSign.png', top: 7.6, left: 53.9, dissociation: 'back' },
    { name: 'flowerSeaPlain-item-1', path: 'scene-flowerSeaPlain-item-1.png', top: -5.1, left: 45.6, dissociation: 'back' },
    { name: 'flowerSeaPlain-item-2', path: 'scene-flowerSeaPlain-item-2.png', top: -0.1, left: 77.6, dissociation: 'back' },
    { name: 'flowerSeaPlain-item-3', path: 'scene-flowerSeaPlain-item-3.png', top: -3.8, left: 17.3, dissociation: 'back' },
    { name: 'flowerSeaPlain-item-4', path: 'scene-flowerSeaPlain-item-4.png', top: -9.1, left: 72.5, dissociation: 'back' },
    { name: 'flowerSeaPlain-item-5', path: 'scene-flowerSeaPlain-item-5.png', top: -1.4, left: 30.4, dissociation: 'back' },
    { name: 'flowerSeaPlain-item-6', path: 'scene-flowerSeaPlain-item-6.png', top: -6.8, left: 68.2, dissociation: 'back' },
    { name: 'flowerSeaPlain-item-7', path: 'scene-flowerSeaPlain-item-7.png', top: -12.3, left: 39.1, dissociation: 'back' },
  ],
  [JourneySceneType.蔚藍海岸]: [
    { name: 'azureCoast-roadSign', path: 'scene-azureCoast-roadSign.png', top: 9, left: 55.8, dissociation: 'back' },
    { name: 'azureCoast-item-1', path: 'scene-azureCoast-item-1.png', top: 12.1, left: 65, dissociation: 'back' },
    { name: 'azureCoast-item-2', path: 'scene-azureCoast-item-2.png', top: -20.6, left: 27.3, dissociation: 'back' },
    { name: 'azureCoast-item-3', path: 'scene-azureCoast-item-3.png', top: -18.1, left: 62, dissociation: 'back' },
    { name: 'azureCoast-item-4', path: 'scene-azureCoast-item-4.png', top: -19, left: 76.8, dissociation: 'back' },
    { name: 'azureCoast-item-5', path: 'scene-azureCoast-item-5.png', top: -21.1, left: 14.6, dissociation: 'back' },
    { name: 'azureCoast-item-6', path: 'scene-azureCoast-item-6.png', top: -21.3, left: 2, dissociation: 'back' },
    // { name: 'azureCoast-item-7', path: 'scene-azureCoast-item-7.png', top: 4, left: 550 , dissociation: 'back'},
  ],
  [JourneySceneType.月夜雪地]: [
    { name: 'moonlitSnowfield-roadSign', path: 'scene-moonlitSnowfield-roadSign.png', top: 3.7, left: 55.1, dissociation: 'back' },
    // { name: 'moonlitSnowfield-item-1', path: 'scene-moonlitSnowfield-item-1.png', top: -40, left: 1930 , dissociation: 'back'},
    { name: 'moonlitSnowfield-item-2', path: 'scene-moonlitSnowfield-item-2.png', top: -7.5, left: 33.8, dissociation: 'back' },
    { name: 'moonlitSnowfield-item-3', path: 'scene-moonlitSnowfield-item-3.png', top: -18, left: 17.4, dissociation: 'back' },
    { name: 'moonlitSnowfield-item-4', path: 'scene-moonlitSnowfield-item-4.png', top: -17.2, left: 58.6, dissociation: 'back' },
    { name: 'moonlitSnowfield-item-5', path: 'scene-moonlitSnowfield-item-5.png', top: -7.9, left: 73.1, dissociation: 'back' },
    { name: 'moonlitSnowfield-item-6', path: 'scene-moonlitSnowfield-item-6.png', top: 2.5, left: 8.4, dissociation: 'back' },
    { name: 'moonlitSnowfield-item-7', path: 'scene-moonlitSnowfield-item-7.png', top: 9, left: 69, dissociation: 'back' },
  ],
  [JourneySceneType.晴光森林]: [
    { name: 'lushForest-roadSign', path: 'scene-lushForest-roadSign.png', top: 7.4, left: 49, dissociation: 'back' },
    { name: 'lushForest-item-1', path: 'scene-lushForest-item-1.png', top: -11.1, left: 22.3, dissociation: 'back' },
    { name: 'lushForest-item-2', path: 'scene-lushForest-item-2.png', top: 14.2, left: 7.1, dissociation: 'back' },
    { name: 'lushForest-item-3', path: 'scene-lushForest-item-3.png', top: -0.1, left: 77.5, dissociation: 'back' },
    { name: 'lushForest-item-4', path: 'scene-lushForest-item-4.png', top: -46, left: 71, dissociation: 'back' },
    { name: 'lushForest-item-5', path: 'scene-lushForest-item-5.png', top: -43.5, left: 42.5, dissociation: 'back' },
    { name: 'lushForest-item-6', path: 'scene-lushForest-item-6.png', top: -39, left: 17, dissociation: 'front' },
    { name: 'lushForest-item-7', path: 'scene-lushForest-item-7.png', top: -16.8, left: 49, dissociation: 'back' },
  ],
};

export const JourneyStaticItemsList = {
  [JourneySceneType.金黃稻浪]: [],
  [JourneySceneType.花海平原]: [],
  [JourneySceneType.蔚藍海岸]: [
    { name: 'scene-azureCoast-view-wave-1', path: 'scene-azureCoast-view-wave-1.png', top: 0, left: 0.2, dissociation: 'back' },
    { name: 'scene-azureCoast-view-wave-2', path: 'scene-azureCoast-view-wave-2.png', top: -2.2, left: 49.7, dissociation: 'back' },
    { name: 'scene-azureCoast-view-wave-3', path: 'scene-azureCoast-view-wave-3.png', top: -8, left: 61.9, dissociation: 'back' },
    { name: 'scene-azureCoast-view-wave-4', path: 'scene-azureCoast-view-wave-4.png', top: -10.6, left: 78.2, dissociation: 'back' },
    { name: 'scene-azureCoast-view-wave-5', path: 'scene-azureCoast-view-wave-5.png', top: -6.5, left: 20.8, dissociation: 'back' },
    { name: 'scene-azureCoast-view-wave-6', path: 'scene-azureCoast-view-wave-6.png', top: -10.1, left: 14.4, dissociation: 'back' },
    { name: 'scene-azureCoast-view-wave-7', path: 'scene-azureCoast-view-wave-7.png', top: -7.6, left: 1.1, dissociation: 'back' },
  ],
  [JourneySceneType.月夜雪地]: [],
  [JourneySceneType.晴光森林]: [],
};

export const JourneySceneSetting = {
  itemsCenterThreshold: 200,
  offset: 100,
  walkFadeInDistance: 300,
  // offset: 14,
  shouldReloadWhenWindowResized: false,
};

type JourneySceneDebugType = {
  enabled: boolean;
  count: number | 'max';
};

export const JourneySceneDebug: JourneySceneDebugType = {
  enabled: true,
  count: QueryString.get('count') === 'max' ? 'max' : Number(QueryString.get('count')) || 1,
};
