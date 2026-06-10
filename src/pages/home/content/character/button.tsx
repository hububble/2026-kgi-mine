import Button from '@/components/button';
import TweenerProvider from '@/components/tweenProvider';
import { PAGE } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext } from 'react';
import { HomeContext, HomeStepType } from '../../config';

const SelectButton = memo(({ onClick }: { onClick: () => void }) => {
  const [context, setContext] = useContext(Context);
  const sounds = context[ActionType.Sounds]!;
  const [state] = useContext(HomeContext);
  return (
    <TweenerProvider
      initialStyle={{ opacity: 0, y: 50 }}
      tweenTo={{ opacity: 1, y: 0 }}
      options={{ duration: 600, delay: 800 }}
      shouldFadeIn={state.step === HomeStepType.characterFadeIn}
      shouldFadeOut={state.step === HomeStepType.characterFadeOut}
      fadeOutStyle={{ opacity: 0 }}
      optionsFadeOut={{
        duration: 600,
        onEnd: () => {
          setTimeout(() => {
            sounds.track?.stop('bgm');
            setContext({ type: ActionType.Page, state: PAGE.journey });
          }, 2000);
        },
      }}
    >
      <div className='flex w-full justify-center'>
        <Button onClick={onClick} key={JSON.stringify(state.characterData)}>
          <Button.Regular>選擇角色</Button.Regular>
        </Button>
      </div>
    </TweenerProvider>
  );
});

export default SelectButton;
