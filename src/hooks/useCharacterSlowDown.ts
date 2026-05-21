import { MINER_SPRITE_FRAME_COUNT, MINER_SPRITE_STOP_FRAME } from '@/components/miner/config';
import useTween, { Bezier } from 'lesca-use-tween';
import { useState } from 'react';

export type CharacterFrame = {
  step: number;
  stepShouldGo: number;
  duration: number;
} | null;

const useCharacterSlowDown = () => {
  const [state, setState] = useState<CharacterFrame>(null);
  const [, setFrame] = useTween({ top: 0 });

  const fetch = (frame: number) => {
    const maxFrame = MINER_SPRITE_FRAME_COUNT - frame + MINER_SPRITE_STOP_FRAME;
    const stepShouldGo =
      MINER_SPRITE_FRAME_COUNT +
      (frame < MINER_SPRITE_STOP_FRAME ? MINER_SPRITE_STOP_FRAME - frame : maxFrame);

    const duration = (stepShouldGo / MINER_SPRITE_FRAME_COUNT) * 1400;

    setFrame(
      { top: frame },
      {
        duration: 1,
        onEnd: () => {
          setFrame(
            { top: frame + stepShouldGo },
            {
              easing: Bezier.outQuad,
              duration,
              onUpdate: ({ top }: { top: number }) => {
                setState({
                  step: Math.floor(top) % MINER_SPRITE_FRAME_COUNT,
                  stepShouldGo,
                  duration,
                });
              },
              onEnd: ({ top }: { top: number }) => {
                setState({
                  step: Math.floor(top) % MINER_SPRITE_FRAME_COUNT,
                  stepShouldGo,
                  duration,
                });
                requestAnimationFrame(() => {
                  setState(null);
                });
              },
            },
          );
        },
      },
    );
  };

  return [state, fetch] as const;
};
export default useCharacterSlowDown;
