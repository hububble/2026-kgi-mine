import { TQuestionnaireOption } from './type';

export const PAGE = {
  home: 'home',
  journey: 'journey',
  login: 'login',
};

export const REST_PATH = {
  signIn: 'member/sign-in',
  login: 'admin/login',
  content: 'immersion/content',
  questions: 'immersion/miner',
  answer: 'immersion/miner',
  favorite: 'content/favorite',
  unfavorite: 'content/unfavorite',
  like: 'content/like',
  unlike: 'content/unlike',
  nextTrip: 'immersion/next-trip',
  activeTrip: 'immersion/active-trip',
  skip: 'content/skip',
  clean: 'test/clean',
};

export const CharacterURIList = {
  小桃_正_灰底: { name: 'character-peach', path: 'character-peach.png' },
  小綠_正_灰底: { name: 'character-green', path: 'character-green.png' },
  小藍_正_灰底: { name: 'character-blue', path: 'character-blue.png' },
  小橘_正_灰底: { name: 'character-orange', path: 'character-orange.png' },
  小灰_正_灰底: { name: 'character-gray', path: 'character-gray.png' },
  小黃_正_灰底: { name: 'character-yellow', path: 'character-yellow.png' },
};

export const SceneSize = {
  width: 3840,
  height: 1080,
};

export const SceneDepth = {
  back: 0.01,
  middle: 0.08,
  front: 0.6,
};

export const PATTERN_URI_PROPERTIES = [
  { path: 'pattern-icon-career.png', name: 'pattern-icon-career' },
  { path: 'pattern-icon-finance.png', name: 'pattern-icon-finance' },
  { path: 'pattern-icon-health.png', name: 'pattern-icon-health' },
  { path: 'pattern-icon-relations.png', name: 'pattern-icon-relations' },
  { path: 'pattern-icon-society.png', name: 'pattern-icon-society' },
];

export const QuestionnaireIntroData: TQuestionnaireOption[] = [
  {
    headline: (
      <>
        太厲害了！
        <br />
        成功解鎖許願新路線的權限
      </>
    ),
    confirmLabel: '許願新路線',
    type: 'Modal',
  },
];
