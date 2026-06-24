import useGetNextTrip from '@/hooks/useGetNextTrip';
import { QuestionnaireIntroData } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext, useEffect, useState } from 'react';
import { QuestionnaireContext, QuestionnaireState, TranslateKeyToTitle } from './config';
import './index.less';
import QuestionsByAPI from './questions';
import { JourneyContext, JourneyStepType } from '@/pages/journey/config';

const Questionnaire = memo(() => {
  const [context, setContext] = useContext(Context);
  const { question = [] } = context[ActionType.Questionnaire]!;
  const [response] = useGetNextTrip({ auto: true });
  const [, setState] = useContext(JourneyContext);

  const value = useState(QuestionnaireState);

  useEffect(() => {
    if (response) {
      if (response.isSuccess) {
        const sorted = Object.entries(response.result)
          .sort((a, b) => a[1].order - b[1].order)
          .map(([key, value]) => {
            const { item } = value;
            item.sort((a, b) => a.order - b.order);
            const headline = TranslateKeyToTitle[key as keyof typeof TranslateKeyToTitle];
            return [key, { ...value, item, headline }] as const;
          });
        console.log(`一共有${sorted.length}題問券`);

        setContext({
          type: ActionType.Questionnaire,
          state: {
            question: [
              ...QuestionnaireIntroData,
              ...sorted.map(([key, value]) => ({
                headline: value.headline,
                type: 'Modal' as const,
                name: key === 'pilotDtoList' ? 'pilotId' : 'topicId',
                options: value.item.map((item) => {
                  return {
                    label: item.name,
                    value: key === 'pilotDtoList' ? item.pilotId : item.nextTopicId,
                  };
                }),
              })),
            ],
          },
        });
      } else {
        console.log('沒有問券，繼續旅程');
        setState((S) => ({ ...S, step: JourneyStepType.resume }));
      }
    }
  }, [response]);

  return (
    <QuestionnaireContext.Provider value={value}>
      {response?.isSuccess && question.length > 0 && <QuestionsByAPI />}
    </QuestionnaireContext.Provider>
  );
});
export default Questionnaire;
