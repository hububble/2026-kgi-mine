import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Storage from 'lesca-local-storage';
import QueryString from 'lesca-url-parameters';
import { useContext, useEffect, useState } from 'react';

Storage.setStorageType('session');

type ResponseType = { isSuccess: boolean; result: any };

const developmentType: 'query' | 'session' = 'query';

const useLogin = (props?: { auto?: boolean; backgroundAppProcess?: boolean }) => {
  const { auto = false, backgroundAppProcess = false } = props || {};

  const [, setContext] = useContext(Context);
  const [state, setState] = useState<ResponseType>();
  const fetch = async () => {
    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    }

    // TODO: token 優先從 query 參數取得，若沒有則從 sessionStorage 取得，最後發布後一率由 sessionStorage 取得
    const token = developmentType === 'query' ? QueryString.get('token') : Storage.get('token');

    let response;
    if (token === false) {
      response = { isSuccess: false, result: 'token not found' };
    } else if (typeof token === 'string') {
      response = { isSuccess: true, result: token };
    } else if (typeof token === 'object' && token !== null && 'data' in token) {
      response = { isSuccess: true, result: token.data.token };
    }

    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
    }

    setState(response as ResponseType);
  };

  useEffect(() => {
    if (auto) fetch();
  }, []);

  return [state, fetch] as const;
};
export default useLogin;
