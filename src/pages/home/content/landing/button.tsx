import Button from '@/components/button';
import Sounds from '@/components/sounds';
import TweenerProvider from '@/components/tweenProvider';
import useLogin from '@/hooks/useLogin';
import useStart from '@/hooks/useStart';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { faker } from '@faker-js/faker';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import { HomeContext, HomeStepType } from '../../config';

const LoginButton = memo(({ getLogin }: { getLogin: () => Promise<void> }) => {
  const [{ step }] = useContext(HomeContext);
  const [onButtonFadeIn, setOnButtonFadeIn] = useState(false);

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
          // TODO: 這裡的 token 生成方式只是為了模擬登入流程，實際應用中應該使用安全的認證方法。
          window.location.href = `${window.location.origin}${window.location.pathname}?token=${faker.string.ulid()}`;
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
  const [response, getLogin] = useLogin({ auto: true });

  return (
    <div className='my-5 flex w-full flex-col items-center justify-center gap-5 md:flex-row'>
      {response?.isSuccess ? <StartButton /> : <LoginButton getLogin={getLogin} />}
    </div>
  );
});
export default Buttons;
