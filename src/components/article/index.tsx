import { Context } from '@/settings/constant';
import { ActionType, PostMessageList } from '@/settings/type';
import { memo, useContext, useEffect, useState } from 'react';
import Blockquote from '../blockquote';
import './index.less';

const Article = memo(() => {
  const [context, setContext] = useContext(Context);
  const { url } = context[ActionType.Article]!;
  const [height, setHeight] = useState(10000);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      switch (event.data?.type) {
        // 偵測 iframe 的高度變化，並更新子組件的狀態
        case PostMessageList['iframe-height-change']:
          setHeight(event.data.height);
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
          break;

        // 偵測 iframe 的video變化
        case PostMessageList['iframe-video-complete']:
          break;

        // 偵測 iframe 的audio變化
        case PostMessageList['iframe-audio-complete']:
          break;
      }
    });
  }, []);

  return (
    <div className='Article'>
      <Blockquote className='flex w-full justify-center' scroll>
        <div className='min-h-full w-full max-w-5xl py-0 md:py-10'>
          <iframe src={url} className='min-h-full w-full' height={height} />
        </div>
      </Blockquote>
    </div>
  );
});
export default Article;
