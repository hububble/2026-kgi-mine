import { REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import { useContext, useState } from 'react';

type ResponseType = {
  isSuccess: boolean;
  result: { contentId: number; hubSpot_Id: string; isFirst: boolean };
};

const useFavorite = (props?: { backgroundAppProcess?: boolean }) => {
  const { backgroundAppProcess = false } = props || {};

  const [, setContext] = useContext(Context);
  const [state, setState] = useState<ResponseType>();
  const fetch = async (params: { contentId: string }) => {
    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    }

    let response;
    try {
      response = await Fetcher.post(REST_PATH.favorite, params);
    } catch {
      response = {
        isSuccess: false,
        result: { contentId: 0, hubSpot_Id: '', isFirst: false } as ResponseType['result'],
      };
    }

    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
    }

    setState(response as ResponseType);
  };

  return [state, fetch] as const;
};
export default useFavorite;
