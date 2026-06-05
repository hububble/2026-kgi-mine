import { IReactProps } from '@/settings/type';
import { memo, useEffect, useId, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';
import Click from 'lesca-click';

type TBlockquoteProps = IReactProps & {
  className?: string;
  scroll?: boolean;
  onScrollBottom?: () => void;
};

const Blockquote = memo(({ children, className, scroll, onScrollBottom }: TBlockquoteProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const [isScrollBottom, setIsScrollBottom] = useState(false);

  useEffect(() => {
    if (scroll) Click.addPreventExcept(`#${id}`);
  }, [id]);

  useEffect(() => {
    if (!scroll) return;

    const onScroll = (e: Event) => {
      if (isScrollBottom) return;
      const target = e.target as HTMLElement;
      const isScrolledToBottom =
        Math.abs(target.scrollHeight - target.clientHeight - target.scrollTop) < 50;
      setIsScrollBottom(isScrolledToBottom);
      if (isScrolledToBottom) onScrollBottom?.();
    };

    ref.current?.addEventListener('scroll', onScroll);
    return () => ref.current?.removeEventListener('scroll', onScroll);
  }, [scroll, onScrollBottom, isScrollBottom]);

  return (
    <article id={id} className='Blockquote'>
      <div
        ref={ref}
        className={twMerge(className ? className : 'max-w-3xl', scroll && 'overflow-y-scroll')}
      >
        {children}
      </div>
    </article>
  );
});
export default Blockquote;
