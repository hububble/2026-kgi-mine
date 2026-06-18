import { memo, useContext, useEffect, useMemo, useState } from 'react';
import './index.less';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { useDebounce } from 'use-debounce';
import Button from '../button';

const QuestionsByAPI = memo(() => {
  const [context, setContext] = useContext(Context);
  const { question = [], onClose } = context[ActionType.Questionnaire]!;

  const [index, setIndex] = useState(0);
  const [debouncedIndex] = useDebounce(index, 1000);
  const currentQuestion = useMemo(() => question[debouncedIndex], [debouncedIndex, question]);

  useEffect(() => {
    if (currentQuestion.type === 'Modal') {
      setContext({
        type: ActionType.Modal,
        state: {
          enabled: true,
          body: (
            <div className='flex w-full flex-col gap-8'>
              <div className='w-full leading-6'>{currentQuestion.headline}</div>
              {currentQuestion.options && (
                <div className='flex w-full flex-col gap-5'>
                  {currentQuestion.options?.map((option) => (
                    <Button
                      key={option.label}
                      className='w-full'
                      onClick={() => {
                        setContext({ type: ActionType.Modal, state: { enabled: false } });
                        if (index < question.length - 1) {
                          setIndex((S) => S + 1);
                        } else {
                          onClose?.();
                          setContext({ type: ActionType.Questionnaire, state: { enabled: false } });
                          // TODO: 根據選擇的項目，更新旅程場景
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

  return <div className=''></div>;
});
export default QuestionsByAPI;
