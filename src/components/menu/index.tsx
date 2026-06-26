import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { shareURL } from '@/utils';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import Blockquote from '../blockquote';
import Button from '../button';
import Contain from '../contain';
import TweenerProvider from '../tweenProvider';
import './index.less';
import useClean from '@/hooks/useClean';

const needClean = true;

const Menu = memo(() => {
  const [context, setContext] = useContext(Context);
  const sounds = context[ActionType.Sounds]!;

  const [muteActive, setMuteActive] = useState(false);

  const [response, clean] = useClean();

  useEffect(() => {
    if (muteActive) sounds?.track?.mute();
    else sounds?.track?.unmute();
  }, [muteActive]);

  useEffect(() => {
    if (response) {
      if (response.isSuccess) {
        setContext({
          type: ActionType.Modal,
          state: {
            enabled: true,
            title: '',
            body: '清除成功，要重新整理頁面嗎？',
            label: ['確定', '取消'],
            onConfirm(label) {
              if (label === '確定') {
                window.location.reload();
              }
            },
          },
        });
      }
    }
  }, [response]);

  return (
    <div className='Menu'>
      <Blockquote className='flex max-w-7xl flex-row items-center justify-end'>
        <Contain className='p-0 md:p-3.5'>
          <div className='pointer-events-auto m-1 flex flex-row items-center justify-center gap-1'>
            <Button
              onClick={() => {
                if (needClean) {
                  clean();
                } else {
                  shareURL({
                    onError: () => {
                      setContext({
                        type: ActionType.Modal,
                        state: {
                          enabled: true,
                          body: '分享失敗，請使用支援 Web Share API 的瀏覽器或裝置再試一次！',
                          label: ['確定'],
                        },
                      });
                    },
                  });
                }
              }}
            >
              <Button.Menu type='share' />
            </Button>
            <TweenerProvider
              initialStyle={{ y: -100 }}
              tweenTo={{ y: 0 }}
              options={{ duration: 500, easing: Bezier.outBack }}
              shouldFadeIn={sounds?.track ? true : false}
            >
              <Button
                onClick={() => {
                  setMuteActive((S) => !S);
                }}
              >
                <Button.Menu type='mute' menu={muteActive} />
              </Button>
            </TweenerProvider>
          </div>
        </Contain>
      </Blockquote>
    </div>
  );
});
export default Menu;
