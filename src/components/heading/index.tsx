import { IReactProps } from '@/settings/type';
import { memo, type CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';

const Heading = () => {};

type H1Props = IReactProps & { className?: string; clampLines?: number };
const H1 = memo(({ className, children, clampLines }: H1Props) => {
  const lineCount = clampLines;
  const clampStyle: CSSProperties | undefined = lineCount
    ? {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lineCount,
      }
    : undefined;

  return (
    <h1
      className={twMerge(
        `font-noto-sans-tc text-3xl tracking-wide`,
        lineCount ? `overflow-hidden text-ellipsis` : '',
        className,
      )}
      style={clampStyle}
    >
      {children}
    </h1>
  );
});

type H2Props = IReactProps & { className?: string; clampLines?: number };
const H2 = memo(({ className, children, clampLines }: H2Props) => {
  const lineCount = clampLines;
  const clampStyle: CSSProperties | undefined = lineCount
    ? {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lineCount,
      }
    : undefined;

  return (
    <h2
      className={twMerge(
        `font-noto-sans-tc text-2xl tracking-wide`,
        lineCount ? `overflow-hidden text-ellipsis` : '',
        className,
      )}
      style={clampStyle}
    >
      {children}
    </h2>
  );
});

type H3Props = IReactProps & { className?: string; icon?: React.ReactNode; clampLines?: number };
const H3 = memo(({ className, children, icon, clampLines }: H3Props) => {
  const lineCount = clampLines;
  const clampStyle: CSSProperties | undefined = lineCount
    ? {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lineCount,
      }
    : undefined;

  return (
    <h3
      className={twMerge(
        `font-noto-sans-tc flex flex-row items-center gap-2 text-xl tracking-wide`,
        lineCount ? `overflow-hidden text-ellipsis` : '',
        className,
      )}
      style={clampStyle}
    >
      {icon}
      {children}
    </h3>
  );
});

type H4Props = IReactProps & { className?: string; icon?: React.ReactNode; clampLines?: number };
const H4 = memo(({ className, children, icon, clampLines }: H4Props) => {
  const lineCount = clampLines;
  const clampStyle: CSSProperties | undefined = lineCount
    ? {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lineCount,
      }
    : undefined;

  return (
    <h4
      className={twMerge(
        `font-noto-sans-tc flex flex-row items-center gap-2 text-xl font-light tracking-wide`,
        lineCount ? `overflow-hidden text-ellipsis` : '',
        className,
      )}
      style={clampStyle}
    >
      {icon}
      {children}
    </h4>
  );
});

type H5Props = IReactProps & { className?: string; icon?: React.ReactNode; clampLines?: number };
const H5 = memo(({ className, children, icon, clampLines }: H5Props) => {
  const lineCount = clampLines;
  const clampStyle: CSSProperties | undefined = lineCount
    ? {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lineCount,
      }
    : undefined;

  return (
    <h5
      className={twMerge(
        `font-noto-sans-tc flex flex-row items-center gap-2 text-lg font-light tracking-wide`,
        lineCount ? `overflow-hidden text-ellipsis` : '',
        className,
      )}
      style={clampStyle}
    >
      {icon}
      {children}
    </h5>
  );
});

Heading.H1 = H1;
Heading.H2 = H2;
Heading.H3 = H3;
Heading.H4 = H4;
Heading.H5 = H5;

export default Heading;
