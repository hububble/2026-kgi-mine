import { REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import { useContext, useState } from 'react';

type ResponseType = {
  isSuccess: boolean;
  result?: boolean;
};

const useClean = (props?: { backgroundAppProcess?: boolean }) => {
  const { backgroundAppProcess = false } = props || {};

  const [, setContext] = useContext(Context);
  const [state, setState] = useState<ResponseType>();
  const fetch = async () => {
    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    }

    let response;
    try {
      response = await Fetcher.get(REST_PATH.clean);
    } catch {
      response = {
        isSuccess: false,
        result: false,
      };
    }

    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
    }

    setState(response as ResponseType);
  };

  return [state, fetch] as const;
};
export default useClean;
