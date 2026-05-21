import { memo } from 'react';
import Button from '../button';
import './menu.less';
import useMedia, { MediaType } from '@/hooks/useMedia';

const Menu = memo(() => {
  const [device] = useMedia();
  return (
    <div className='menu'>
      <Button>
        <Button.NavBar type='burger' />
      </Button>
      <Button>
        <Button.NavBar type='user' />
      </Button>
      <Button>
        <Button.NavBar type='eyes' />
      </Button>
      {device >= MediaType.SM && (
        <Button>
          <Button.NavBar type='navigate' />
        </Button>
      )}
      <Button>
        <Button.NavBar type='search' />
      </Button>
    </div>
  );
});
export default Menu;
