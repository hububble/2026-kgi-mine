import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

const Heading = () => {};

const H1 = memo(({ className, children }: IReactProps & { className?: string }) => {
  return (
    <h1 className={twMerge(`font-noto-sans-tc text-3xl tracking-wide`, className)}>{children}</h1>
  );
});

const H2 = memo(({ className, children }: IReactProps & { className?: string }) => {
  return (
    <h2 className={twMerge(`font-noto-sans-tc text-2xl tracking-wide`, className)}>{children}</h2>
  );
});

const H3 = memo(
  ({ className, children, icon }: IReactProps & { className?: string; icon?: React.ReactNode }) => {
    return (
      <h3
        className={twMerge(
          `font-noto-sans-tc flex flex-row items-center gap-2 text-xl tracking-wide`,
          className,
        )}
      >
        {icon}
        {children}
      </h3>
    );
  },
);

const H4 = memo(
  ({ className, children, icon }: IReactProps & { className?: string; icon?: React.ReactNode }) => {
    return (
      <h4
        className={twMerge(
          `font-noto-sans-tc flex flex-row items-center gap-2 text-xl font-light tracking-wide`,
          className,
        )}
      >
        {icon}
        {children}
      </h4>
    );
  },
);

const H5 = memo(
  ({ className, children, icon }: IReactProps & { className?: string; icon?: React.ReactNode }) => {
    return (
      <h5
        className={twMerge(
          `font-noto-sans-tc flex flex-row items-center gap-2 text-lg font-light tracking-wide`,
          className,
        )}
      >
        {icon}
        {children}
      </h5>
    );
  },
);

Heading.H1 = H1;
Heading.H2 = H2;
Heading.H3 = H3;
Heading.H4 = H4;
Heading.H5 = H5;

export default Heading;
