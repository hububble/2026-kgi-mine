import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext } from 'react';
import Button from '../button';

const NavBar = memo(() => {
  const [context, setContext] = useContext(Context);
  const { onClose } = context[ActionType.Article]!;

  return (
    <div className='navBar'>
      <Button
        className='flex h-7 w-7 items-center justify-center'
        onClick={() => {
          onClose?.();
          setContext({ type: ActionType.Article, state: { enabled: false } });
        }}
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M1 19L19 1M1 1L19 19' stroke='#fff' strokeWidth='2' strokeLinecap='round' />
        </svg>
      </Button>
    </div>
  );
});
export default NavBar;
