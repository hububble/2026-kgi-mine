import Blockquote from '@/components/blockquote';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Click from 'lesca-click';
import { memo, useContext, useEffect, useState } from 'react';

const IframeDemo = memo(() => {
  const [, setContext] = useContext(Context);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    Click.addPreventExcept(`#S`);

    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });

    window.addEventListener('message', (event) => {
      if (event.data?.type === 'iframe-height-changed') {
        setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        setHeight(event.data.height);
      }
    });
  }, []);
  return (
    <div id='S' className='S absolute h-screen w-full'>
      <Blockquote scroll className='w-full'>
        <iframe src='/iframeContent.html' className='w-full' style={{ height: `${height}px` }} />
      </Blockquote>
    </div>
  );
});
export default IframeDemo;
