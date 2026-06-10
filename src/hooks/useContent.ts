import { REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import { useContext, useEffect, useState } from 'react';

type ResponseType = {
  isSuccess: boolean;
  result: {
    baseRequirement: number;
    baseReward: number;
    careerRequirement: number;
    careerReward: number;
    contentId: number;
    financeRequirement: number;
    financeReward: number;
    healthRequirement: number;
    healthReward: number;
    hubSpot_AuthorAvatar: string;
    hubSpot_AuthorBio: string;
    hubSpot_AuthorDisplayName: string;
    hubSpot_AuthorFullName: string;
    hubSpot_AuthorId: string;
    hubSpot_AuthorName: string;
    hubSpot_FeaturedImage: string;
    hubSpot_HtmlTitle: string;
    hubSpot_Id: string;
    hubSpot_Name: string;
    hubSpot_PostBody: string;
    hubSpot_Post_Subtitle: string;
    hubSpot_Post_Title: string;
    hubSpot_PrimaryTag: string;
    hubSpot_SecondaryTag: string;
    hubSpot_Url: string;
    isFavorited: boolean;
    isLiked: boolean;
    isUnlockRequired: boolean;
    minerCount: number;
    relationsRequirement: number;
    relationsReward: number;
    societyRequirement: number;
    societyReward: number;
  };
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
      response = await Fetcher.get(REST_PATH.start);
    } catch (error) {
      response = { isSuccess: false, result: String(error) };
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
export default useContent;
