import useCharacterSlowDown, { CharacterFrame } from '@/hooks/useCharacterSlowDown';
import useURI from '@/hooks/useURI';
import EnterFrame from 'lesca-enterframe';
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { MINER_SIZE, MINER_SPRITE_FRAME_COUNT } from './config';
import './index.less';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { CharacterURIList } from '@/settings/config';

type MinerProps = {
  height?: string;
  className?: string;
  autoplay?: boolean;
  onShowDown?: (frame: CharacterFrame) => void;
};

const Miner = forwardRef(({ height, className, autoplay, onShowDown }: MinerProps, ref) => {
  const [context] = useContext(Context);
  const { character } = context[ActionType.UserData]!;

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [spriteName, setSpriteName] = useState(0);
  const [frame, setFrame] = useCharacterSlowDown();
  const targetWidth = useRef(0);

  const [, setURI] = useURI();

  useEffect(() => {
    const dat =
      CharacterURIList[character as keyof typeof CharacterURIList] ||
      CharacterURIList['小藍_正_灰底'];

    if (dat) setURI({ path: `${dat.name}-sprite-sheet.png`, name: 'minerSprite' });
  }, [character]);

  useEffect(() => {
    if (frame) setSpriteName(frame.step);
  }, [frame]);

  useEffect(() => {
    if (frame) {
      onShowDown?.(frame);
    }
  }, [frame?.duration]);

  const slowDown = useCallback(() => {
    setFrame(spriteName);
    return frame;
  }, [spriteName, setFrame]);

  const getFrame = useCallback(() => {
    return frame;
  }, [frame]);

  useImperativeHandle(ref, () => ({
    play() {
      EnterFrame.play();
    },
    stop() {
      EnterFrame.stop();
    },
    slowDown() {
      slowDown();
    },
    getFrame() {
      return getFrame();
    },
    getTargetWidth() {
      return targetWidth.current;
    },
  }));

  useEffect(() => {
    if (containerRef.current) {
      const resize = () => {
        const { height } = containerRef.current!.getBoundingClientRect();
        const ratio = MINER_SIZE.width / MINER_SIZE.height;
        const currentWidth = height * ratio;
        const scale = currentWidth / MINER_SIZE.width;
        targetWidth.current = currentWidth;
        setScale(scale);
      };
      resize();
      window.addEventListener('resize', resize);

      EnterFrame.addStatic(() => {
        setSpriteName((prev) => (prev + 1) % MINER_SPRITE_FRAME_COUNT);
      });

      if (autoplay) {
        EnterFrame.play();
      }
      return () => {
        window.removeEventListener('resize', resize);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className={`Miner ${className}`} style={{ height }}>
      <div
        className={`sprite sprite-MINER_WALK_${String(spriteName).padStart(5, '0')}`}
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  );
});
export default Miner;
