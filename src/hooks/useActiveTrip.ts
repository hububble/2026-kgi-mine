import { REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import { useContext, useState } from 'react';
import useQuestion from './useQuestion';
import { JourneySceneType } from '@/pages/journey/config';

type ResponseType = {
  isSuccess: boolean;
  result?: boolean;
  message?: string;
};

const useActiveTrip = (props?: { backgroundAppProcess?: boolean }) => {
  const { backgroundAppProcess = false } = props || {};

  const [context, setContext] = useContext(Context);
  const { tripList } = context[ActionType.TripList]!;
  const [, getQuestion] = useQuestion({ backgroundAppProcess: true });

  const [state, setState] = useState<ResponseType>();

  const fetch = async (params: { trip: JourneySceneType }) => {
    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    }

    let currentTripList = tripList || [];

    if (currentTripList.length === 0) {
      const response = await getQuestion();
      setContext({
        type: ActionType.TripList,
        state: { ...(response?.result || { minerList: [], quizList: [], tripList: [] }) },
      });
      currentTripList = response?.result?.tripList || [];
    }

    const [tripName] = Object.entries(JourneySceneType).filter(([, value]) => {
      if (value === params.trip) {
        return true;
      }
    });

    const [{ trip }] = currentTripList.filter((trip) => trip.name === tripName[0]);
    let response;
    try {
      response = await Fetcher.post(REST_PATH.activeTrip, { tripId: trip });
    } catch {
      response = {
        isSuccess: false,
        result: false as ResponseType['result'],
      };
    }

    if (!backgroundAppProcess) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
    }

    setState(response as ResponseType);
    return response as ResponseType;
  };

  return [state, fetch] as const;
};
export default useActiveTrip;
