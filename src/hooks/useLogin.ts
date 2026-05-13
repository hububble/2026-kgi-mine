import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { faker } from '@faker-js/faker';
import Storage from 'lesca-local-storage';
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
    const token = Storage.get('token');
    if (token) {
      response = { isSuccess: true, result: [{ token }] };
    } else {
      // TODO: 這裡的登入邏輯需要根據實際情況修改，以下僅為示例
      Storage.set('token', { token: faker.string.ulid() });
      response = { isSuccess: false, result: [{ token: Storage.get('token') }] };
      // window.location.href = `${window.location.origin}${window.location.pathname}?status=login-success`;
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
