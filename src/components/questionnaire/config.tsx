import { createContext, Dispatch, SetStateAction } from 'react';

export type TQuestionnaireState = { pilotId: string; topicId: string };
export type TQuestionnaireContext = [TQuestionnaireState, Dispatch<SetStateAction<TQuestionnaireState>>];

export const QuestionnaireState: TQuestionnaireState = { pilotId: '', topicId: '' };
export const QuestionnaireContext = createContext<TQuestionnaireContext>([QuestionnaireState, () => {}]);

export const TranslateKeyToTitle = {
  pilotDtoList: (
    <>
      你最想跟哪一位導航員
      <br />
      共同探索下一段豐盛旅程？（可複選）
    </>
  ),
  nextTopicDtoList: (
    <>
      最想深入挖掘的主題？
      <br />
      （可複選）
    </>
  ),
};
