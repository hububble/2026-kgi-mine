import { REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType, TTripList } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import { useContext, useEffect, useState } from 'react';

export type ResponseType = {
  isSuccess: boolean;
  result: TTripList;
};

const useQuestion = (props?: { auto?: boolean; backgroundAppProcess?: boolean }) => {
  const { auto = false, backgroundAppProcess = false } = props || {};

  const [context, setContext] = useContext(Context);
  const { token } = context[ActionType.UserData]!;

  const [state, setState] = useState<ResponseType>();

  const fetch = async () => {
    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    }

    if (!token) return;

    let response;
    try {
      response = await Fetcher.get(REST_PATH.questions);
    } catch {
      response = { isSuccess: false, result: { tripList: [], quizList: [], minerList: [] } };
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
export default useQuestion;
