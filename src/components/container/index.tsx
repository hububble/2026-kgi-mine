import useURI from '@/hooks/useURI';
import { SceneSize } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import { getViewPxRatio } from '@/utils';
import { memo, useContext, useEffect, useRef } from 'react';
import Div100vh from 'react-div-100vh';
import Menu from '../menu';
import NavBar from '../navBar';
import './index.less';

const Container = memo(({ children }: IReactProps) => {
  const [context, setContext] = useContext(Context);
  const sceneImageSize = context[ActionType.SceneViewSize];
  const ref = useRef<HTMLDivElement>(null);
  useURI({ path: 'scene-bg.jpg', name: 'scene-bg' });
  useURI({ path: 'scene-bg-m.jpg', name: 'scene-bg-m' });

  useEffect(() => {
    const resize = () => {
      if (ref.current) {
        const { height } = ref.current.getBoundingClientRect();

        const width = (height * SceneSize.width) / SceneSize.height;
        const coverPercent = ((window.innerWidth + width) / window.innerWidth) * 100;
        const containPercent = (width / (width - window.innerWidth)) * 100;
        const ratio = getViewPxRatio({ width });

        document.documentElement.style.setProperty(`--current-view-width`, `${width}px`);

        setContext({
          type: ActionType.SceneViewSize,
          state: { height, width, coverPercent, containPercent, ratio },
        });
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <Div100vh className='Container'>
      <div className='bg' />
      <div className='ctx'>
        <div>
          <div ref={ref} className='content'>
            {sceneImageSize && sceneImageSize.width && children}
            <Menu />
          </div>
        </div>
      </div>
    </Div100vh>
  );
});
export default Container;
