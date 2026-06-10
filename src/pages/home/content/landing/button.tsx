import Button from '@/components/button';
import Sounds from '@/components/sounds';
import TweenerProvider from '@/components/tweenProvider';
import useSignIn, { SignInParams } from '@/hooks/useSignIn';
import useStart from '@/hooks/useStart';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import { HomeContext, HomeStepType } from '../../config';
import Fetcher from 'lesca-fetcher';

const LoginButton = memo(({ signIn }: { signIn: (params: SignInParams) => Promise<void> }) => {
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
          signIn({ credential: 'Ab123456789', email: 'test@test.com' });
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
          state: { enabled: true, body: response.result, message: '發生錯誤' },
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
  const [, setContext] = useContext(Context);
  const [response, signIn] = useSignIn();

  useEffect(() => {
    if (response) {
      Fetcher.setJWT(response.result.token);
      setContext({
        type: ActionType.UserData,
        state: {
          memberId: response.result.memberId,
          memberInfoDto: response.result.memberInfoDto,
          token: response.result.token,
        },
      });
    }
  }, [response]);

  return (
    <div className='my-5 flex w-full flex-col items-center justify-center gap-5 md:flex-row'>
      {response?.isSuccess ? <StartButton /> : <LoginButton signIn={signIn} />}
    </div>
  );
});
export default Buttons;
