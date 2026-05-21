import { memo, useMemo, useState } from 'react';
import { DemoContext, DemoPageType, DemoState } from './config';
import Landing from './landing';
import Iframe from './iframe';

const Demo = memo(() => {
  const value = useState(DemoState);

  const page = useMemo(() => {
    switch (value[0].page) {
      default:
      case DemoPageType.landing:
        return <Landing />;
      case DemoPageType.iframe:
        return <Iframe />;
    }
  }, [value[0].page]);

  return (
    <DemoContext.Provider value={value}>
      <div className='flex h-full w-full flex-col items-center justify-center'>{page}</div>
    </DemoContext.Provider>
  );
});
export default Demo;
