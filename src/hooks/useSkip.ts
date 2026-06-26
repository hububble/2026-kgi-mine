import { REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import Storage from 'lesca-local-storage';
import { useContext, useState } from 'react';

type ResponseType = {
  isSuccess: boolean;
  result?: boolean;
  message?: string;
};

export type skipParmas = {
  contentId: number;
};

Storage.setStorageType('session');

const useSkip = (props?: { backgroundAppProcess?: boolean }) => {
  const { backgroundAppProcess = false } = props || {};

  const [, setContext] = useContext(Context);

  const [state, setState] = useState<ResponseType>();
  const fetch = async (params: skipParmas) => {
    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    }

    let response;
    try {
      response = await Fetcher.post(REST_PATH.skip, params);
    } catch {
      response = {
        isSuccess: false,
        message: '伺服器連線異常，請稍後再試',
      };
    }

    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
    }

    setState(response as ResponseType);
  };

  return [state, fetch] as const;
};
export default useSkip;
