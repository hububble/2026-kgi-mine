import { useAuth } from '@/components/auth';
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

  const [, setContext] = useContext(Context);
  const [{ token }] = useAuth();

  const [state, setState] = useState<ResponseType>();

  const fetch = async () => {
    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    }

    if (!token) {
      if (!backgroundAppProcess) {
        setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
      }
      return;
    }

    let response;
    try {
      response = await Fetcher.get(REST_PATH.questions);
    } catch {
      response = { isSuccess: false, result: { tripList: [], quizList: [], minerList: [] } };
    }

    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
    }

    const nextState = response as ResponseType;
    setState(nextState);
    return nextState;
  };

  useEffect(() => {
    if (auto) fetch();
  }, []);

  return [state, fetch] as const;
};
export default useQuestion;
