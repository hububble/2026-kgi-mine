import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Click from 'lesca-click';
import { memo, useContext, useEffect, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../button';
import './index.less';

const Modal = memo(() => {
  const id = useId();
  const [context, setContext] = useContext(Context);
  const { body, title, label, onConfirm, onClose } = context[ActionType.Modal]!;

  useEffect(() => {
    Click.add(`#${id}`, () => {
      setContext({ type: ActionType.Modal, state: { enabled: false } });
      onClose?.();
    });

    return () => {
      Click.remove(`#${id}`);
    };
  }, [id]);

  return (
    <div className='Modal'>
      <div id={id} className='bg' />
      <div className='ctx'>
        <div className='dialog animate-fadeInPy'>
          {title && <div className='title'>{title}</div>}
          <div className='body'>{body}</div>
          {label && (
            <div className='footer'>
              {label?.map((item, index) => (
                <Button
                  key={index}
                  className={twMerge(label.length === 1 ? 'w-full' : 'w-1/2')}
                  onClick={() => {
                    setContext({ type: ActionType.Modal, state: { enabled: false } });
                    if (item) onConfirm?.(item);
                  }}
                  clickOnce={false}
                >
                  {index === 0 ? (
                    <Button.Regular size='w-full'>{item}</Button.Regular>
                  ) : (
                    <Button.Outline size='w-full'>{item}</Button.Outline>
                  )}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
export default Modal;
