import { SESSION_KEY } from '@/components/auth/config';
import { REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import Storage from 'lesca-local-storage';
import { useContext, useState } from 'react';

type ResponseType = {
  isSuccess: boolean;
  result: {
    memberId: string;
    memberInfoDto: any;
    token: string;
  };
};

export type SignInParams = {
  credential: string;
  email: string;
};

Storage.setStorageType('session');

const useSignIn = (props?: { backgroundAppProcess?: boolean }) => {
  const { backgroundAppProcess = false } = props || {};

  const [context, setContext] = useContext(Context);
  const { token } = context[ActionType.UserData]!;

  const [state, setState] = useState<ResponseType>();
  const fetch = async (params: SignInParams) => {
    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    }

    let response: ResponseType | undefined;
    if (token) {
      response = { isSuccess: true, result: { memberId: '', memberInfoDto: {}, token } };
    } else {
      try {
        response = (await Fetcher.post(REST_PATH.signIn, params)) as ResponseType;
        if (response) {
          if (response?.isSuccess) {
            const { token } = response.result;
            Storage.set(SESSION_KEY, { token });
          }
        }
      } catch {
        response = { isSuccess: false, result: { memberId: '', memberInfoDto: [], token: '' } };
      }
    }

    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
    }

    setState(response as ResponseType);
  };

  return [state, fetch] as const;
};
export default useSignIn;
