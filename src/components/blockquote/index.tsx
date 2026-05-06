import { IReactProps } from '@/settings/type';
import { memo, useEffect, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';
import Click from 'lesca-click';

const Blockquote = memo(
  ({ children, className, scroll }: IReactProps & { className?: string; scroll?: boolean }) => {
    const id = useId();

    useEffect(() => {
      if (scroll) Click.addPreventExcept(`#${id}`);
    }, [id]);

    return (
      <article id={id} className='Article'>
        <div
          className={twMerge(className ? className : 'max-w-3xl', scroll && 'overflow-y-scroll')}
        >
          {children}
        </div>
      </article>
    );
  },
);
export default Blockquote;
