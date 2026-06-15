import { useEffect, useState } from 'react';
import useLike from './useLike';
import useUnlike from './useUnlike';

type TUseLikeSwitcher = {
  isLiked: boolean;
  contentId: number;
};

const useLikeSwitcher = ({ isLiked, contentId }: TUseLikeSwitcher) => {
  const [likeResponse, setLike] = useLike({ backgroundAppProcess: false });
  const [unlikeResponse, setUnlike] = useUnlike({ backgroundAppProcess: false });

  const [like, setLiked] = useState({ isLiked, contentId, isFirst: true });

  const [state, setState] = useState<{
    isSuccess: boolean;
    result: { contentId: number; hubSpot_Id: string; isFirst: boolean } | boolean;
  }>();

  const fetch = () => {
    setLiked((S) => ({ ...S, isLiked: !S.isLiked }));
  };

  useEffect(() => {
    if (like.isFirst) {
      setLiked((S) => ({ ...S, isFirst: false }));
      return;
    }

    if (like) {
      if (like.isLiked) {
        setLike({ contentId: like.contentId });
      } else {
        setUnlike({ contentId: like.contentId });
      }
    }
  }, [like.isLiked]);

  useEffect(() => {
    if (likeResponse) {
      if (likeResponse?.isSuccess) {
        setState({ isSuccess: likeResponse.isSuccess, result: likeResponse.result });
      } else setState({ isSuccess: false, result: false });
    }
  }, [likeResponse]);

  useEffect(() => {
    if (unlikeResponse) {
      if (unlikeResponse?.isSuccess) {
        setState({ isSuccess: unlikeResponse.isSuccess, result: unlikeResponse.result });
      } else setState({ isSuccess: false, result: false });
    }
  }, [unlikeResponse]);

  return [state, fetch] as const;
};
export default useLikeSwitcher;
