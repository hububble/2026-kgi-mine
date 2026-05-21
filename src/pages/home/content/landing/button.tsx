import Button from '@/components/button';
import Sounds from '@/components/sounds';
import TweenerProvider from '@/components/tweenProvider';
import useLogin from '@/hooks/useLogin';
import useStart from '@/hooks/useStart';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { Bezier } from 'lesca-use-tween';
import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { HomeContext, HomeStepType } from '../../config';

const LoginButton = memo(({ onLogin }: { onLogin: () => void }) => {
  const [, setContext] = useContext(Context);
  const [{ step }] = useContext(HomeContext);
  const [onButtonFadeIn, setOnButtonFadeIn] = useState(false);
  const [response, getLogin] = useLogin({ auto: true });

  useEffect(() => {
    if (response?.isSuccess) onLogin();
  }, [response]);

  return (
    <TweenerProvider
      initialStyle={{ y: 50, opacity: 0 }}
      tweenTo={{ y: 0, opacity: 1 }}
      shouldFadeIn={step === HomeStepType.landingFadeIn}
      options={{
        duration: 1200,
        easing: Bezier.outQuart,
        onEnd: () => setOnButtonFadeIn(true),
      }}
      shouldFadeOut={step === HomeStepType.landingFadeOut}
      fadeOutStyle={{ opacity: 0, y: 50 }}
      optionsFadeOut={{ duration: 800 }}
    >
      <Button
        clickOnce
        onClick={() => {
          setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
          getLogin();
        }}
        disabled={!onButtonFadeIn}
      >
        <Button.Outline>登入／註冊會員</Button.Outline>
      </Button>
    </TweenerProvider>
  );
});

const StartButton = memo(() => {
  const [, setContext] = useContext(Context);
  const [onButtonFadeIn, setOnButtonFadeIn] = useState(false);
  const [{ step }, setState] = useContext(HomeContext);
  const [response, getStart] = useStart();

  useEffect(() => {
    if (response) {
      if (response.isSuccess) setState((S) => ({ ...S, step: HomeStepType.landingFadeOut }));
      else {
        setContext({
          type: ActionType.Modal,
          state: { enabled: true, body: response.result, title: '發生錯誤' },
        });
      }
    }
  }, [response]);

  return (
    <TweenerProvider
      initialStyle={{ y: 50, opacity: 0 }}
      tweenTo={{ y: 0, opacity: 1 }}
      shouldFadeIn={true}
      options={{
        duration: 1200,
        easing: Bezier.outQuart,
        onEnd: () => setOnButtonFadeIn(true),
      }}
      shouldFadeOut={step === HomeStepType.landingFadeOut}
      fadeOutStyle={{ opacity: 0, y: 50 }}
      optionsFadeOut={{ duration: 800 }}
    >
      <Button
        clickOnce
        onClick={() => {
          const sounds = new Sounds({
            onload: () => {
              sounds.play('bgm', 1, false);
              getStart();
            },
          });
          setContext({ type: ActionType.Sounds, state: { track: sounds } });
        }}
        disabled={!onButtonFadeIn}
      >
        <Button.Regular>開始探索</Button.Regular>
      </Button>
    </TweenerProvider>
  );
});

const Buttons = memo(() => {
  const [isLogin, setIsLogin] = useState(false);

  const onLogin = useCallback(() => {
    setIsLogin(true);
  }, []);

  return (
    <div className='my-5 flex w-full flex-col items-center justify-center gap-5 md:flex-row'>
      {isLogin ? <StartButton /> : <LoginButton onLogin={onLogin} />}
    </div>
  );
});
export default Buttons;
