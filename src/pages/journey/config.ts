import { TUserDataContent } from '@/settings/type';
import { faker } from '@faker-js/faker';
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
  staticLoop: number;
  loop: number;
  baseLoop: number;
  loadDataTimes: number;
};

export type TJourneyContext = [TJourneyState, Dispatch<SetStateAction<TJourneyState>>];

export const JourneyState: TJourneyState = {
  step: JourneyStepType.unset,
  scene: JourneySceneType.晴光森林,
  staticLoop: -1,
  loop: -1,
  baseLoop: 0,
  loadDataTimes: 0,
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
    { name: 'goldenRiceField-roadSign', path: 'scene-goldenRiceField-roadSign.png', top: 58, left: 57, dissociation: 'back' },
    { name: 'goldenRiceField-item-1', path: 'scene-goldenRiceField-item-1.png', top: 40, left: 73, dissociation: 'back' },
    { name: 'goldenRiceField-item-2', path: 'scene-goldenRiceField-item-2.png', top: 40.1, left: 35, dissociation: 'back' },
    { name: 'goldenRiceField-item-3', path: 'scene-goldenRiceField-item-3.png', top: 61, left: 8, dissociation: 'back' },
    { name: 'goldenRiceField-item-4', path: 'scene-goldenRiceField-item-4.png', top: 63, left: 16.2, dissociation: 'back' },
    { name: 'goldenRiceField-item-5', path: 'scene-goldenRiceField-item-5.png', top: 66, left: 26, dissociation: 'front' },
    { name: 'goldenRiceField-item-6', path: 'scene-goldenRiceField-item-6.png', top: 39.5, left: 43.7, dissociation: 'back' },
    { name: 'goldenRiceField-item-7', path: 'scene-goldenRiceField-item-7.png', top: 55.5, left: 79.8, dissociation: 'back' },
  ],
  [JourneySceneType.花海平原]: [
    { name: 'flowerSeaPlain-roadSign', path: 'scene-flowerSeaPlain-roadSign.png', top: 58.4, left: 53.9, dissociation: 'back' },
    { name: 'flowerSeaPlain-item-1', path: 'scene-flowerSeaPlain-item-1.png', top: 44.2, left: 45.6, dissociation: 'back' },
    { name: 'flowerSeaPlain-item-2', path: 'scene-flowerSeaPlain-item-2.png', top: 49.9, left: 77.6, dissociation: 'back' },
    { name: 'flowerSeaPlain-item-3', path: 'scene-flowerSeaPlain-item-3.png', top: 46.2, left: 17.3, dissociation: 'back' },
    { name: 'flowerSeaPlain-item-4', path: 'scene-flowerSeaPlain-item-4.png', top: 39.9, left: 72.5, dissociation: 'back' },
    { name: 'flowerSeaPlain-item-5', path: 'scene-flowerSeaPlain-item-5.png', top: 48.9, left: 30.4, dissociation: 'back' },
    { name: 'flowerSeaPlain-item-6', path: 'scene-flowerSeaPlain-item-6.png', top: 43.2, left: 68.2, dissociation: 'back' },
    { name: 'flowerSeaPlain-item-7', path: 'scene-flowerSeaPlain-item-7.png', top: 36.8, left: 39.1, dissociation: 'back' },
  ],
  [JourneySceneType.蔚藍海岸]: [
    { name: 'azureCoast-roadSign', path: 'scene-azureCoast-roadSign.png', top: 59, left: 55.8, dissociation: 'back' },
    { name: 'azureCoast-item-1', path: 'scene-azureCoast-item-1.png', top: 62.5, left: 65, dissociation: 'back' },
    { name: 'azureCoast-item-2', path: 'scene-azureCoast-item-2.png', top: 25.4, left: 27.3, dissociation: 'back' },
    { name: 'azureCoast-item-3', path: 'scene-azureCoast-item-3.png', top: 29.8, left: 62, dissociation: 'back' },
    { name: 'azureCoast-item-4', path: 'scene-azureCoast-item-4.png', top: 28.6, left: 76.8, dissociation: 'back' },
    { name: 'azureCoast-item-5', path: 'scene-azureCoast-item-5.png', top: 26, left: 13.7, dissociation: 'back' },
    { name: 'azureCoast-item-6', path: 'scene-azureCoast-item-6.png', top: 25.4, left: 1.6, dissociation: 'back' },
    { name: 'azureCoast-item-7', path: 'scene-azureCoast-item-7.png', top: 71, left: 13, dissociation: 'front' },
  ],
  [JourneySceneType.月夜雪地]: [
    { name: 'moonlitSnowfield-roadSign', path: 'scene-moonlitSnowfield-roadSign.png', top: 53, left: 54.1, dissociation: 'back' },
    { name: 'moonlitSnowfield-item-2', path: 'scene-moonlitSnowfield-item-2.png', top: 38.5, left: 33.8, dissociation: 'back' },
    { name: 'moonlitSnowfield-item-3', path: 'scene-moonlitSnowfield-item-3.png', top: 30, left: 17.4, dissociation: 'back' },
    { name: 'moonlitSnowfield-item-4', path: 'scene-moonlitSnowfield-item-4.png', top: 32, left: 58.6, dissociation: 'back' },
    { name: 'moonlitSnowfield-item-5', path: 'scene-moonlitSnowfield-item-5.png', top: 40.6, left: 73, dissociation: 'back' },
    { name: 'moonlitSnowfield-item-6', path: 'scene-moonlitSnowfield-item-6.png', top: 54.4, left: 9.1, dissociation: 'back' },
    { name: 'moonlitSnowfield-item-7', path: 'scene-moonlitSnowfield-item-7.png', top: 60, left: 69, dissociation: 'back' },
  ],
  [JourneySceneType.晴光森林]: [
    { name: 'lushForest-roadSign', path: 'scene-lushForest-roadSign.png', top: 59.2, left: 49, dissociation: 'back' },
    { name: 'lushForest-item-1', path: 'scene-lushForest-item-1.png', top: 36.9, left: 22.9, dissociation: 'back' },
    { name: 'lushForest-item-2', path: 'scene-lushForest-item-2.png', top: 65.1, left: 7.1, dissociation: 'front' },
    { name: 'lushForest-item-3', path: 'scene-lushForest-item-3.png', top: 49.3, left: 77.2, dissociation: 'back' },
    { name: 'lushForest-item-4', path: 'scene-lushForest-item-4.png', top: 0, left: 71, dissociation: 'back' },
    { name: 'lushForest-item-5', path: 'scene-lushForest-item-5.png', top: 1.4, left: 43.2, dissociation: 'back' },
    { name: 'lushForest-item-6', path: 'scene-lushForest-item-6.png', top: 2, left: 17.6, dissociation: 'front' },
    { name: 'lushForest-item-7', path: 'scene-lushForest-item-7.png', top: 31, left: 48.8, dissociation: 'back' },
  ],
};

export const JourneyStaticItemsList = {
  [JourneySceneType.金黃稻浪]: [],
  [JourneySceneType.花海平原]: [],
  [JourneySceneType.蔚藍海岸]: [
    { name: 'scene-azureCoast-view-wave-1', path: 'scene-azureCoast-view-wave-1.png', top: 53, left: 0.2, dissociation: 'back' },
    { name: 'scene-azureCoast-view-wave-2', path: 'scene-azureCoast-view-wave-2.png', top: 47.8, left: 49.7, dissociation: 'back' },
    { name: 'scene-azureCoast-view-wave-3', path: 'scene-azureCoast-view-wave-3.png', top: 42, left: 61.9, dissociation: 'back' },
    { name: 'scene-azureCoast-view-wave-4', path: 'scene-azureCoast-view-wave-4.png', top: 39.4, left: 78.2, dissociation: 'back' },
    { name: 'scene-azureCoast-view-wave-5', path: 'scene-azureCoast-view-wave-5.png', top: 43.9, left: 20.8, dissociation: 'back' },
    { name: 'scene-azureCoast-view-wave-6', path: 'scene-azureCoast-view-wave-6.png', top: 39.9, left: 14.4, dissociation: 'back' },
    { name: 'scene-azureCoast-view-wave-7', path: 'scene-azureCoast-view-wave-7.png', top: 42.4, left: 1.1, dissociation: 'back' },
  ],
  [JourneySceneType.月夜雪地]: [],
  [JourneySceneType.晴光森林]: [],
};

export const JourneySceneSetting = {
  itemsCenterThreshold: 230,
  offset: 100,
  walkFadeInDistance: 100,
  walkFadeInDuration: 8000,
  shouldReloadWhenWindowResized: true,
};

type JourneySceneDebugType = {
  enabled: boolean;
  count: number;
};

export const JourneySceneDebug: JourneySceneDebugType = {
  enabled: QueryString.get('debug') === '1' || false,
  count: 7,
};

const createJourneyFakeItem = (): TUserDataContent => ({
  baseRequirement: faker.number.int({ min: 0, max: 100 }),
  baseReward: faker.number.int({ min: 1, max: 50 }),
  contentCategory: faker.helpers.arrayElement(['Video', 'Audio', 'Article']),
  careerRequirement: faker.number.int({ min: 0, max: 100 }),
  careerReward: faker.number.int({ min: 1, max: 50 }),
  contentId: faker.number.int({ min: 1, max: 999999 }),
  financeRequirement: faker.number.int({ min: 0, max: 100 }),
  financeReward: faker.number.int({ min: 1, max: 50 }),
  healthRequirement: faker.number.int({ min: 0, max: 100 }),
  healthReward: faker.number.int({ min: 1, max: 50 }),
  hubSpot_AuthorAvatar: faker.image.avatar(),
  hubSpot_AuthorBio: faker.person.bio(),
  hubSpot_AuthorDisplayName: faker.person.firstName(),
  hubSpot_AuthorFullName: faker.person.fullName(),
  hubSpot_AuthorId: faker.string.uuid(),
  hubSpot_AuthorName: faker.person.fullName(),
  hubSpot_FeaturedImage: faker.image.urlPicsumPhotos(),
  hubSpot_HtmlTitle: faker.lorem.sentence({ min: 3, max: 8 }),
  hubSpot_Id: faker.string.uuid(),
  hubSpot_Name: faker.lorem.words({ min: 2, max: 5 }),
  hubSpot_PostBody: faker.lorem.paragraphs({ min: 2, max: 5 }),
  hubSpot_Post_Subtitle: faker.lorem.sentence({ min: 5, max: 10 }),
  hubSpot_Post_Title: faker.lorem.sentence({ min: 3, max: 8 }),
  hubSpot_PrimaryTag: faker.helpers.arrayElement(['CAREER', 'FINANCE', 'HEALTH', 'RELATIONS', 'SOCIETY'] as const),
  hubSpot_SecondaryTag: faker.helpers.arrayElement(['CAREER', 'FINANCE', 'HEALTH', 'RELATIONS', 'SOCIETY', 'NONE'] as const),
  hubSpot_PostCollection: faker.lorem.words({ min: 1, max: 3 }),
  hubSpot_Url: faker.internet.url(),
  isFavorited: faker.datatype.boolean(),
  isLiked: faker.datatype.boolean(),
  isUnlockRequired: faker.datatype.boolean(),
  minerCount: faker.number.int({ min: 1, max: 10 }),
  relationsRequirement: faker.number.int({ min: 0, max: 100 }),
  relationsReward: faker.number.int({ min: 1, max: 50 }),
  societyRequirement: faker.number.int({ min: 0, max: 100 }),
  societyReward: faker.number.int({ min: 1, max: 50 }),
});

export const JourneyFakeData: TUserDataContent[] = faker.helpers.multiple(createJourneyFakeItem, { count: 10 });
