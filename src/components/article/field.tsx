import { IReactProps } from '@/settings/type';
import { memo, ReactNode } from 'react';

type TFieldProps = IReactProps & {
  icon?: ReactNode;
};

const Field = memo(({ children, icon }: TFieldProps) => (
  <div className='field'>
    <div className='w-auto'>{icon}</div>
    <div className='bg-font-white-light h-6 w-px' />
    <div className='text-font-white-light flex-1 text-sm'>{children}</div>
  </div>
));
export default Field;
