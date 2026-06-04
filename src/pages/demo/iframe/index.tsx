import { memo, useContext, useEffect, useState } from 'react';
import Blockquote from '@/components/blockquote';
import { Context } from '@/settings/constant';
import { ActionType, PostMessageList } from '@/settings/type';

const Iframe = memo(() => {
  const [, setContext] = useContext(Context);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      switch (event.data?.type) {
        // 偵測 iframe 的高度變化，並更新子組件的狀態
        case PostMessageList['iframe-height-change']:
          setHeight(event.data.height);
          // 提醒更新子組件的狀態，顯示新的高度，發佈後會移除
          setContext({
            type: ActionType.Modal,
            state: {
              enabled: true,
              message: 'Iframe 改變高度',
              body: `iframe height changed to ${event.data.height}px`,
              label: ['GOT IT'],
            },
          });
          break;

        // 偵測 iframe 的video變化
        case PostMessageList['iframe-video-complete']:
          setContext({
            type: ActionType.Modal,
            state: {
              enabled: true,
              message: 'Iframe Video 狀態',
              body: `video status changed to ${event.data.status}，將會更新礦石狀態`,
              label: ['GOT IT'],
            },
          });
          break;

        // 偵測 iframe 的audio變化
        case PostMessageList['iframe-audio-complete']:
          setContext({
            type: ActionType.Modal,
            state: {
              enabled: true,
              message: 'Iframe Audio 狀態',
              body: `audio status changed to ${event.data.status}，將會更新礦石狀態`,
              label: ['GOT IT'],
            },
          });
          break;
      }
    });
  }, []);

  return (
    <div className='h-screen w-full'>
      <Blockquote
        scroll
        className='flex w-full justify-center'
        onScrollBottom={() => {
          // 發佈後會移除
          setContext({
            type: ActionType.Modal,
            state: {
              enabled: true,
              message: 'scroll to bottom',
              body: `You have scrolled to the bottom of the Blockquote component.`,
              label: ['GOT IT'],
            },
          });
        }}
      >
        <div className='w-160'>
          <iframe
            className='h-full w-full'
            src='/iframeContent.html'
            // add CSP: 只允許來自同一來源的腳本與信任網站嵌入執行，並且禁止任何插件（如 Flash）被加載,以增強安全性
            content-security-policy="script-src 'self' https://uatservice.kgifund.com.tw/; object-src 'none';"
            style={{ height: `${height}px` }}
          />
        </div>
      </Blockquote>
    </div>
  );
});
export default Iframe;
