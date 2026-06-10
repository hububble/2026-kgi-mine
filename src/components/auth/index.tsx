import { memo, useContext, useEffect } from 'react';
import Storage from 'lesca-local-storage';
import { SESSION_KEY } from './config';
import { ActionType, IReactProps } from '@/settings/type';
import { Context } from '@/settings/constant';
import Fetcher from 'lesca-fetcher';
import QueryString from 'lesca-url-parameters';

Storage.setStorageType('session');

const Auth = memo(({ children }: IReactProps) => {
  const [, setContext] = useContext(Context);
  useEffect(() => {
    const auth = Storage.get(SESSION_KEY);
    const queryToken = QueryString.get('token');

    if (auth) {
      const { token } = auth.data;
      if (token) {
        setContext({ type: ActionType.UserData, state: { token } });
        Fetcher.setJWT(token);
        console.log('sessionToken', token);
      }
    } else if (queryToken) {
      setContext({ type: ActionType.UserData, state: { token: queryToken } });
      Fetcher.setJWT(queryToken);
      console.log('queryToken', queryToken);
    }
  }, []);
  return <>{children}</>;
});
export default Auth;
