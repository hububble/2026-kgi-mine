import useGetNextTrip from '@/hooks/useGetNextTrip';
import { QuestionnaireIntroData } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext, useEffect } from 'react';
import { TranslateKeyToTitle } from './config';
import './index.less';
import QuestionsByAPI from './questions';

const Questionnaire = memo(() => {
  const [context, setContext] = useContext(Context);
  const { question = [] } = context[ActionType.Questionnaire]!;
  const [response] = useGetNextTrip({ auto: true });

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
        setContext({
          type: ActionType.Questionnaire,
          state: {
            question: [
              ...QuestionnaireIntroData,
              ...sorted.map(([key, value]) => ({
                headline: value.headline,
                type: 'Modal' as const,
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
      }
    }
  }, [response]);

  return <>{response?.isSuccess && question.length > 0 && <QuestionsByAPI />}</>;
});
export default Questionnaire;
