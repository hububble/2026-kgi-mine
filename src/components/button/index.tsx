import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import Click from 'lesca-click';
import { useContext, useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Marker from './marker';
import Menu from './menu';
import NavBar from './navBar';
import Outline from './outline';
import Regular from './regular';
import SliderArrow from './sliderArray';
import Card from './card';
import Soft from './soft';
import AlertClose from './alertClose';

type TRegularProps = IReactProps & {
  active?: boolean;
  className?: string;
  clickOnce?: boolean;
  dataset?: Record<string, string>;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
  onClick?: (dataset?: Record<string, string>) => void;
};

const Button = (props: TRegularProps) => {
  const [context] = useContext(Context);
  const sounds = context[ActionType.Sounds];

  const { children, className, style, clickOnce, onClick, active, dataset, disabled } = props;

  const id = useId();
  const [isPress, setIsPress] = useState(false);

  useEffect(() => {
    Click.add(`#${id}`, () => {
      sounds?.track?.play('click');
      onClick?.(dataset);
      if (clickOnce) Click.remove(`#${id}`);
      setIsPress(true);
    });

    const handleTouchEnd = () => {
      setIsPress(false);
    };

    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      Click.remove(`#${id}`);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [sounds]);

  return (
    <div
      id={id}
      className={twMerge(
        className,
        active ? 'button-active' : 'button-hover',
        'Button',
        isPress && 'Button-active',
        'cursor-pointer **:pointer-events-none',
        (disabled || (clickOnce && isPress)) && 'pointer-events-none **:grayscale-50',
      )}
      style={style}
    >
      {children}
    </div>
  );
};

Button.Regular = Regular;
Button.NavBar = NavBar;
Button.Outline = Outline;
Button.SliderArray = SliderArrow;
Button.Marker = Marker;
Button.Menu = Menu;
Button.Card = Card;
Button.Soft = Soft;
Button.AlertClose = AlertClose;

export default Button;
