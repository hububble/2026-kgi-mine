import { JourneyFakeData, JourneySceneDebug } from '@/pages/journey/config';
import { REST_PATH } from '@/settings/config';
import { faker } from '@faker-js/faker';
import { mergePath } from 'lesca-fetcher';
import { HttpResponse, http } from 'msw';

let time = 0;
export const handlers = [
  http.get(mergePath(REST_PATH.login), () => {
    return HttpResponse.json({
      isSuccess: true,
      account: faker.string.uuid(),
      credential: faker.string.nanoid(),
    });
  }),

  http.post(mergePath(REST_PATH.signIn), () => {
    return HttpResponse.json({
      isSuccess: true,
      result: {
        memberId: '',
        memberInfoDto: {
          name: faker.person.firstName(),
          nickname: faker.person.lastName(),
        },
        token: faker.string.nanoid(),
      },
    });
  }),

  http.get(mergePath(REST_PATH.start), () => {
    return HttpResponse.json({
      isSuccess: true,
      result: JourneyFakeData.filter((_, i) => i < JourneySceneDebug.useLocalData[time++ % JourneySceneDebug.useLocalData.length]),
    });
  }),

  http.post(mergePath(REST_PATH.skip), () => {
    return HttpResponse.json({
      isSuccess: true,
      result: true,
    });
  }),

  http.get(mergePath(REST_PATH.questions), () => {
    return HttpResponse.json({
      isSuccess: true,
      result: {
        tripList: [
          { trip: 'a8252ef4-c9de-48e9-b6fe-01ed9100d8b6', name: '晴光森林' },
          { trip: 'f5c3f287-066f-4652-a041-0e44812fcef5', name: '金黃稻浪' },
          { trip: '29916df2-61f7-461c-bfee-62be2724bdbc', name: '蔚藍海岸' },
          { trip: '8a4bfea1-e4bf-4b19-a83c-df7114c05b3a', name: '花海平原' },
          { trip: '9cb3acd4-17fe-4535-bbcd-ef6e33cb21c5', name: '月夜雪地' },
        ],
        quizList: [
          { quizId: '9f422166-b9bd-4860-a1a0-12e19580268c', name: '探索世界' },
          { quizId: '8a750008-8379-45fd-8a2f-292d8a633e9f', name: '身心平衡' },
          { quizId: '53174ecc-b0ab-4f5e-a80e-59f50c86d0dc', name: '健康生活' },
          { quizId: '98ab08cc-54a6-443a-b259-6619e823bcd0', name: '開拓人際' },
          { quizId: 'e1338939-ea6b-422b-94b6-cc1502065df3', name: '挑戰極限' },
          { quizId: '752fe753-5aa7-4456-b5b9-d405eafa8949', name: '深度投資' },
          { quizId: 'bd1249b7-a10c-4212-94a0-ea88161447d0', name: '財富自由' },
          { quizId: '5d957c3c-8ea4-49e6-bf7f-f73ac9cbe664', name: '特殊體驗' },
          { quizId: '3727b35a-6a9e-4c4b-86eb-fc92e7c299a3', name: '職涯進階' },
          { quizId: 'b1cf6277-1fc8-4f59-ab52-fd1e28b50ed9', name: '自我成長' },
        ],
        minerList: [
          { minerId: 'aeea6169-d040-4496-a3e9-3fa0240a896f', name: '小桃_正_灰底', image: 'character-peach.png', order: 1 },
          { minerId: 'f29335bc-a29a-4815-9cfb-f431fdbc4aec', name: '小綠_正_灰底', image: 'character-green.png', order: 2 },
          { minerId: 'b0fca377-8347-4d08-b137-466c6ed6f2f9', name: '小藍_正_灰底', image: 'character-blue.png', order: 3 },
          { minerId: '8febd1e2-f527-4677-bfae-154afbdbf805', name: '小橘_正_灰底', image: 'character-orange.png', order: 4 },
          { minerId: 'a1b2c3d4-e5f6-4g7h-8i9j-k0l1m2n3o4p5', name: '小灰_正_灰底', image: 'character-gray.png', order: 5 },
          { minerId: 'c3d4e5f6-a7b8-4h9i-8j0k-l1m2n3o4p5q6', name: '小黃_正_灰底', image: 'character-yellow.png', order: 6 },
        ],
      },
    });
  }),

  http.post(mergePath(REST_PATH.answer), () => {
    return HttpResponse.json({
      isSuccess: true,
      result: true,
    });
  }),

  http.get('/img/favicon.ico', () => {
    return new HttpResponse(null, { status: 204 });
  }),

  http.get('/api', () => {
    return new HttpResponse(null, {
      status: 404,
      statusText: 'Out Of Service',
    });
  }),
];
