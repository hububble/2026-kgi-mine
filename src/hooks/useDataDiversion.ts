import { TUserDataState } from '@/settings/type';
import { useEffect, useState } from 'react';

const useDataDiversion = () => {
  const [state, setState] = useState({ index: 0, scene: '', data: [] });

  useEffect(() => {}, [state]);

  const updateStep = ({ step, scene }: { step?: number; scene?: TUserDataState['journey'] }) => {
    setState((S) => ({
      ...S,
      index: step === undefined ? S.index + 1 : step,
      scene: !scene ? S.scene : scene,
    }));
  };

  return [state, updateStep] as const;
};
export default useDataDiversion;
