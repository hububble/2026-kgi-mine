import { REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import { useContext, useState } from 'react';

export type ResponseType = {
  isSuccess: boolean;
  result: boolean;
};

const useAnswer = (props?: { backgroundAppProcess?: boolean }) => {
  const { backgroundAppProcess = false } = props || {};

  const [, setContext] = useContext(Context);
  const [state, setState] = useState<ResponseType>();
  const fetch = async (data: { tripId: string; quizList: string[]; minerId: string }) => {
    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    }

    let response;
    try {
      response = await Fetcher.post(REST_PATH.answer, data);
    } catch {
      response = { isSuccess: false, result: { tripList: [], quizList: [], minerList: [] } };
    }

    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
    }

    setState(response as ResponseType);
  };

  return [state, fetch] as const;
};
export default useAnswer;
