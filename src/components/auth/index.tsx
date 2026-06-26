import { IReactProps } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import Storage from 'lesca-local-storage';
import { memo, useContext, useEffect, useState } from 'react';
import { AuthContext, AuthState, SESSION_KEY, UNSET_AUTH_CONTEXT } from './config';

Storage.setStorageType('session');

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === UNSET_AUTH_CONTEXT) {
    throw new Error('useAuth must be used within <Auth>');
  }
  return context;
};

const Auth = memo(({ children }: IReactProps) => {
  const value = useState(AuthState);

  useEffect(() => {
    if (value[0].token) {
      Fetcher.setJWT(value[0].token);
    }
  }, [value[0].token]);

  useEffect(() => {
    const auth = Storage.get(SESSION_KEY);
    if (!auth) {
      // 如果没有session
      console.log(`[AUTH]:未取得token，需要登入`);
    } else {
      // 如果有session
      const { token } = auth.data;
      if (token) {
        value[1]({ token, isLogin: true });
        Fetcher.setJWT(token);
        console.log(`[AUTH]:已取得token`);
      }
    }
  }, []);

  return <AuthContext.Provider {...{ value }}>{children}</AuthContext.Provider>;
});
export default Auth;
