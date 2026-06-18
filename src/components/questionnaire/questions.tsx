import { memo, useContext, useEffect, useMemo, useState } from 'react';
import './index.less';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { useDebounce } from 'use-debounce';
import Button from '../button';
import { QuestionnaireContext } from './config';

const QuestionsByAPI = memo(() => {
  const [context, setContext] = useContext(Context);
  const { question = [], onClose } = context[ActionType.Questionnaire]!;

  const [, setState] = useContext(QuestionnaireContext);

  const [index, setIndex] = useState(0);
  const [debouncedIndex] = useDebounce(index, 1000);
  const currentQuestion = useMemo(() => question[debouncedIndex], [debouncedIndex, question]);

  useEffect(() => {
    console.log(question);
  }, [question]);

  useEffect(() => {
    if (currentQuestion.type === 'Modal') {
      setContext({
        type: ActionType.Modal,
        state: {
          enabled: true,
          body: (
            <div className='flex w-full flex-col gap-8'>
              <div className='w-full leading-8'>{currentQuestion.headline}</div>
              {currentQuestion.options && (
                <div className='flex w-full flex-col gap-5'>
                  {currentQuestion.options?.map((option) => (
                    <Button
                      key={option.label}
                      className='w-full'
                      onClick={() => {
                        // 關掉視窗、儲存資料，然後檢查是不是有下一題；如果沒有的話就關掉問券
                        setContext({ type: ActionType.Modal, state: { enabled: false } });
                        if (currentQuestion.name) {
                          setState((S) => ({ ...S, [currentQuestion.name!]: option.value }));
                        }
                        if (index < question.length - 1) {
                          setIndex((S) => S + 1);
                        } else {
                          onClose?.();
                          setContext({ type: ActionType.Questionnaire, state: { enabled: false } });
                        }
                      }}
                    >
                      <Button.Outline className='font-bold'>{option.label}</Button.Outline>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ),
          label: currentQuestion.confirmLabel ? [currentQuestion.confirmLabel] : undefined,
          onConfirm: (label) => {
            if (label === currentQuestion.confirmLabel) {
              setContext({ type: ActionType.Modal, state: { enabled: false } });
              if (index < question.length - 1) {
                setIndex((S) => S + 1);
              } else {
                onClose?.();
                setContext({ type: ActionType.Questionnaire, state: { enabled: false } });
              }
            }
          },
        },
      });
    }
  }, [currentQuestion]);

  return <></>;
});
export default QuestionsByAPI;
