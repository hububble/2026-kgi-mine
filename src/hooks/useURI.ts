import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { useContext, useEffect, useState } from 'react';

const useURI = (props?: { path: string; name: string }) => {
  const [state, setState] = useState<string>();

  const [context] = useContext(Context);
  const { baseUri } = context[ActionType.Dataset]!.dataset;

  const fetch = ({ path, name }: { path: string; name: string }) => {
    const currentProps = { ...props, path, name };
    if (!path || !name) return;

    const fullPath = `${baseUri}${path}`;
    document.documentElement.style.setProperty(`--${currentProps.name}`, `url("${fullPath}")`);
    setState(fullPath);
  };

  useEffect(() => {
    if (props) fetch(props);
  }, []);

  return [state, fetch] as const;
};
export default useURI;
