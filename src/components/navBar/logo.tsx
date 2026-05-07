import useURI from '@/hooks/useURI';
import { memo, useEffect } from 'react';
import './logo.less';

const NavbarLogo = memo(() => {
  const [, setURI] = useURI();

  useEffect(() => {
    setURI({ path: 'navbar-logo.svg', name: 'navbar-logo' });
    setURI({ path: 'navbar-logo-m.svg', name: 'navbar-logo-m' });
  }, []);

  return <div className='navbar-logo' />;
});
export default NavbarLogo;
