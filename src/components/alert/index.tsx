import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useCallback, useContext, useEffect } from 'react';
import Blockquote from '../blockquote';
import Button from '../button';
import Contain from '../contain';
import './index.less';
import useTween, { Bezier } from 'lesca-use-tween';

const CloseButton = memo(() => {
  const [context, setContext] = useContext(Context);
  const { onClose, aliveDuration } = context[ActionType.Alert]!;

  const [style, setStyle] = useTween({ opacity: 0, scale: 0, rotate: 360 });
  useEffect(() => {
    setStyle(
      { opacity: 1, scale: 1, rotate: 0 },
      { delay: 1000, duration: 500, easing: Bezier.outBack },
    );
  }, []);

  const onClick = useCallback(() => {
    onClose?.();
    setContext({ type: ActionType.Alert, state: { enabled: false } });
  }, [onClose, setContext]);

  useEffect(() => {
    if (!aliveDuration) return;

    if (aliveDuration > 0) {
      const timer = setTimeout(() => onClick(), aliveDuration);
      return () => clearTimeout(timer);
    }
  }, [aliveDuration, onClick]);

  return (
    <div className='absolute -top-1 -left-3' style={style}>
      <Button className='h-6 w-6' clickOnce onClick={onClick}>
        <Button.AlertClose />
      </Button>
    </div>
  );
});

const Alert = memo(() => {
  const [context] = useContext(Context);
  const { message } = context[ActionType.Alert]!;

  return (
    <div className='Alert'>
      <Blockquote className='flex max-w-7xl flex-row items-center justify-end'>
        <Contain className='p-0 md:p-3.5'>
          <div className='mt-10'>
            <div className='py-5'>
              <div className='content animate-fadeInPx'>
                <CloseButton />
                {message}
              </div>
            </div>
          </div>
        </Contain>
      </Blockquote>
    </div>
  );
});
export default Alert;
