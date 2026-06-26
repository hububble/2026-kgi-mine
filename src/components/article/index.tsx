import { Context } from '@/settings/constant';
import { ActionType, PostMessageList } from '@/settings/type';
import { memo, useContext, useEffect, useState } from 'react';
import Blockquote from '../blockquote';
import Button from '../button';
import './index.less';

const Article = memo(() => {
  const [context, setContext] = useContext(Context);
  const { url, onClose } = context[ActionType.Article]!;
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
      switch (event.data?.type) {
        // 偵測 iframe 的高度變化，並更新子組件的狀態
        case PostMessageList['iframe-height-change']:
          setHeight(event.data.height);
          break;

        // 偵測 iframe 的video變化
        case PostMessageList['iframe-video-complete']:
          break;

        // 偵測 iframe 的audio變化
        case PostMessageList['iframe-audio-complete']:
          break;
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className='Article'>
      <Blockquote className='flex w-full justify-center' scroll>
        <div className='relative min-h-full w-full max-w-5xl py-0 md:py-10'>
          <iframe
            src={
              'https://243367301.hs-sites-na2.com/test-blog/%E5%BC%B7%E5%8C%96%E6%99%82%E9%96%93%E7%9A%84%E8%A4%87%E5%88%A9%E7%B4%80%E5%BE%8B'
            }
            className='min-h-full w-full'
            height={height}
          />
          <div className='absolute top-5 left-5 h-10 w-10 md:top-14'>
            <Button
              className='h-10 w-10'
              onClick={() => {
                setContext({ type: ActionType.Article, state: { enabled: false } });
                onClose?.();
              }}
            >
              <Button.AlertClose />
            </Button>
          </div>
        </div>
      </Blockquote>
    </div>
  );
});
export default Article;
