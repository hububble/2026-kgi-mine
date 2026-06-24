import useURI from '@/hooks/useURI';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps, LoadingProcessType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { LoadingProcessIconList } from './config';
import './index.less';

const Background = () => (
  <div className='bg-bg-gray-light absolute top-0 h-full w-full opacity-95' />
);

const Text = ({ children }: IReactProps) => (
  <span className='text-textColor relative'>{children}</span>
);

const LoadingSvg = ({ className, type }: { className: string; type?: string }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <OnloadProvider onload={() => setLoaded(true)}>
      <div
        className={twMerge(
          className,
          'mask-contain mask-center',
          'h-16 w-16',
          type || LoadingProcessType.Spin,
          loaded && 'bg-primary-blue',
        )}
      />
    </OnloadProvider>
  );
};

const LoadingProcess = memo(() => {
  const [context] = useContext(Context);
  const data = context[ActionType.LoadingProcess];

  useURI({
    path: LoadingProcessIconList[data?.type || LoadingProcessType.SpinningBubbles],
    name: 'loading-icon',
  });

  return (
    <div className='LoadingProcess fixed top-0 z-50 flex h-full w-full flex-col items-center justify-center space-y-3'>
      <Background />
      <LoadingSvg className='relative' type={data?.type} />
      {data?.body && <Text>{data.body}</Text>}
    </div>
  );
});
export default LoadingProcess;
