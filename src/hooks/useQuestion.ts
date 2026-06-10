import { REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import { useContext, useEffect, useState } from 'react';

export type ResponseType = {
  isSuccess: boolean;
  result: {
    tripList: { trip: string; name: string }[];
    quizList: { quizId: string; name: string }[];
    minerList: { minerId: string; name: string; image: string; order: number }[];
  };
};

const useQuestion = (props?: { auto?: boolean; backgroundAppProcess?: boolean }) => {
  const { auto = false, backgroundAppProcess = false } = props || {};

  const [, setContext] = useContext(Context);
  const [state, setState] = useState<ResponseType>();
  const fetch = async () => {
    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    }

    let response;
    try {
      response = await Fetcher.get(REST_PATH.questions);
    } catch {
      response = { isSuccess: false, result: { tripList: [], quizList: [], minerList: [] } };
    }

    console.log(response);

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
