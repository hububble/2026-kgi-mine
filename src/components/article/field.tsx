import { IReactProps } from '@/settings/type';
import { memo, ReactNode, useEffect } from 'react';

type TFieldProps = IReactProps & {
  icon?: ReactNode;
};

const Field = memo(({ children, icon }: TFieldProps) => {
  useEffect(() => {}, []);
  return (
    <div className='field'>
      <div className='w-auto'>{icon}</div>
      <div className='bg-font-white-light h-6 w-px' />
      <div className='text-font-white-light flex-1 text-sm'>{children}</div>
    </div>
  );
});
export default Field;
