import TweenerProvider from '@/components/tweenProvider';
import useURI from '@/hooks/useURI';
import { faker } from '@faker-js/faker';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { JourneyContext, JourneyStepType } from '../config';
import { UserDataURIList } from './config';
import './index.less';

const TweenNumber = memo(({ number }: { number: number }) => {
  const [style, setStyle] = useTween({ top: 0 });

  useEffect(() => {
    setStyle({ top: number }, { duration: 5000, delay: 600 });
  }, [number]);

  return <span>{Math.floor(Number(style.top))}</span>;
});

const Icon = memo(() => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [offsetIndex, setOffsetIndex] = useState(0);

  const [style, setStyle] = useTween({ backgroundPositionY: '0%' });

  useEffect(() => {
    setStyle(
      { backgroundPositionY: `${offsetIndex * 25}%` },
      {
        duration: 500,
        easing: Bezier.inOutBack,
      },
    );
  }, [offsetIndex]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setOffsetIndex((S) => S + 1);
    }, 1000);
    // return () => {
    //   if (intervalRef.current) clearInterval(intervalRef.current);
    // };
  }, []);

  return <div className='ico' style={style} />;
});

const UserData = memo(() => {
  const [state] = useContext(JourneyContext);
  const [, setURI] = useURI();

  useEffect(() => {
    UserDataURIList.forEach((uri) => setURI(uri));
    setURI({ path: 'userData-flap-patterns.svg', name: 'userData-flap-patterns' });
  }, []);

  const currentRandomScene = useMemo(() => {
    return UserDataURIList.map(() => Math.floor(Math.random() * 100));
  }, []);

  const firstName = useMemo(() => faker.person.firstName(), []);

  return (
    <div className='UserData'>
      <TweenerProvider
        initialStyle={{ opacity: 0, y: 50 }}
        tweenTo={{ opacity: 1, y: 0 }}
        options={{ duration: 600 }}
        shouldFadeIn={state.step === JourneyStepType.fadeIn}
      >
        <div>
          <div>{firstName}</div>
          <div>
            <Icon />
          </div>
          <div>探索中</div>
        </div>
        <div>
          {UserDataURIList.map((uri, index) => {
            return (
              <div key={uri.name}>
                <div className={uri.name} />
                <TweenNumber number={currentRandomScene[index]} />
              </div>
            );
          })}
        </div>
      </TweenerProvider>
    </div>
  );
});
export default UserData;
