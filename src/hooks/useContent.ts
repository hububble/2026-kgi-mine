import { REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType, TUserDataContent } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import { useContext, useEffect, useState } from 'react';

type ResponseType = {
  isSuccess: boolean;
  result: TUserDataContent[];
};

const useContent = (props?: { auto?: boolean; backgroundAppProcess?: boolean }) => {
  const { auto = false, backgroundAppProcess = false } = props || {};

  const [, setContext] = useContext(Context);
  const [state, setState] = useState<ResponseType>();
  const fetch = async () => {
    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    }

    let response;
    try {
      // TODO : 這裡是模擬資料，之後要改成實際的 API
      // response = {
      //   isSuccess: true,
      //   result: JourneyFakeData.filter((_, i) => i < 10) as TUserDataContent[],
      // };
      // response = { isSuccess: true, result: [] };
      response = await Fetcher.get(REST_PATH.start);
    } catch {
      response = { isSuccess: false, result: [] as TUserDataContent[] };
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
export default useContent;
