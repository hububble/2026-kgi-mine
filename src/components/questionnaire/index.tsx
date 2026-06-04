import { QuestionnaireDemoData } from '@/settings/config';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import './index.less';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Button from '../button';
import { useDebounce } from 'use-debounce';

const Questionnaire = memo(() => {
  const [context, setContext] = useContext(Context);
  const { question = QuestionnaireDemoData, onClose } = context[ActionType.Questionnaire]!;

  const [index, setIndex] = useState(0);
  const [debouncedIndex] = useDebounce(index, 300);
  const currentQuestion = useMemo(() => question[debouncedIndex], [debouncedIndex, question]);
  const [active, setActive] = useState<boolean[]>([]);

  useEffect(() => {
    setActive(currentQuestion.options?.map(() => false) || []);
  }, [currentQuestion]);

  useEffect(() => {
    if (currentQuestion.type === 'Modal') {
      setContext({
        type: ActionType.Modal,
        state: {
          enabled: true,
          body: (
            <div className='flex w-full flex-col gap-8'>
              <div className='w-full'>{currentQuestion.headline}</div>
              {currentQuestion.options && (
                <div className='flex w-full flex-col gap-3'>
                  {currentQuestion.options?.map((option, optionIndex) => (
                    <Button
                      key={option.label}
                      className='w-full'
                      active={active[optionIndex]}
                      onClick={() => {
                        setActive((S) => S.map((val, i) => (i === optionIndex ? !val : val)));
                      }}
                    >
                      <Button.Outline className='font-bold'>{option.label}</Button.Outline>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ),
          label: [currentQuestion.confirmLabel || '確認'],
          onConfirm: (label) => {
            if (label === currentQuestion.confirmLabel) {
              setContext({ type: ActionType.Modal, state: { enabled: false } });
              if (index < QuestionnaireDemoData.length - 1) {
                setIndex((S) => S + 1);
              } else {
                onClose?.();
                setContext({ type: ActionType.Questionnaire, state: { enabled: false } });
              }
            }
          },
        },
      });
    } else {
      setContext({ type: ActionType.Modal, state: { enabled: false } });
      setContext({
        type: ActionType.Recent,
        state: {
          enabled: true,
          message: currentQuestion.headline,
          onClick: () => {
            setContext({ type: ActionType.Recent, state: { enabled: false } });
            if (index < QuestionnaireDemoData.length - 1) {
              setIndex((S) => S + 1);
            }
          },
        },
      });
    }
  }, [currentQuestion, active]);

  return <></>;
});
export default Questionnaire;
