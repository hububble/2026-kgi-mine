import useQuestion from '@/hooks/useQuestion';
import { memo, useContext, useEffect, useMemo } from 'react';
import { HomeContext, HomePageType, HomeStepType } from '../config';
import 選擇你的Miner角色 from './character';
import 你想要的下一個十年是 from './decade';
import 你想要哪一場理想旅程呢 from './journey';
import 歡迎踏上豐盛之旅 from './landing';

const Content = memo(() => {
  const [state] = useContext(HomeContext);
  const [questionResponse, getQuestions] = useQuestion({ auto: false, backgroundAppProcess: true });

  useEffect(() => {
    if (state.step === HomeStepType.landingLogin) {
      getQuestions();
    }
  }, [state.step]);

  const page = useMemo(() => {
    switch (state.page) {
      default:
      case HomePageType.landing:
        return <歡迎踏上豐盛之旅 />;

      case HomePageType.decade:
        return <你想要的下一個十年是 data={questionResponse?.result.quizList} />;

      case HomePageType.journey:
        return <你想要哪一場理想旅程呢 data={questionResponse?.result.tripList} />;

      case HomePageType.character:
        return <選擇你的Miner角色 data={questionResponse?.result.minerList} />;
    }
  }, [state.page, questionResponse]);

  return (
    <div className='text-font-white-light flex h-full w-full flex-col items-center justify-center overflow-hidden select-none'>
      {page}
    </div>
  );
});
export default Content;
