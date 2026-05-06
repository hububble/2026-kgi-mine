import { REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import { useContext, useEffect, useState } from 'react';

type ResponseType = { isSuccess: boolean; result: any[] };

const useLogin = (props?: { auto?: boolean; backgroundAppProcess?: boolean }) => {
  const { auto = false, backgroundAppProcess = false } = props || {};

  const [, setContext] = useContext(Context);
  const [state, setState] = useState<ResponseType>();
  const fetch = async () => {
    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    }

    let response;
    try {
      response = await Fetcher.get(REST_PATH.login);
    } catch {
      response = { isSuccess: false, result: [] };
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
