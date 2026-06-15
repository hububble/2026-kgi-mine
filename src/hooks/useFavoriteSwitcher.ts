import { useEffect, useState } from 'react';
import useFavorite from './useFavorite';
import useUnfavorite from './useUnfavourite';

type TUseFavoriteSwitcher = {
  isFavorited: boolean;
  contentId: number;
};

const useFavoriteSwitcher = ({ isFavorited, contentId }: TUseFavoriteSwitcher) => {
  const [favoriteResponse, setFavorite] = useFavorite({ backgroundAppProcess: false });
  const [unfavoriteResponse, setUnfavorite] = useUnfavorite({ backgroundAppProcess: false });

  const [favorited, setFavorited] = useState({ isFavorited, contentId, isFirst: true });

  const [state, setState] = useState<{
    isSuccess: boolean;
    result: { contentId: number; hubSpot_Id: string; isFirst: boolean } | boolean;
  }>();

  const fetch = () => {
    setFavorited((S) => ({ ...S, isFavorited: !S.isFavorited }));
  };

  useEffect(() => {
    if (favorited.isFirst) {
      setFavorited((S) => ({ ...S, isFirst: false }));
      return;
    }

    if (favorited) {
      if (favorited.isFavorited) {
        setFavorite({ contentId: favorited.contentId });
      } else {
        setUnfavorite({ contentId: favorited.contentId });
      }
    }
  }, [favorited.isFavorited]);

  useEffect(() => {
    if (favoriteResponse) {
      if (favoriteResponse?.isSuccess) {
        setState({ isSuccess: favoriteResponse.isSuccess, result: favoriteResponse.result });
      } else setState({ isSuccess: false, result: false });
    }
  }, [favoriteResponse]);

  useEffect(() => {
    if (unfavoriteResponse) {
      if (unfavoriteResponse?.isSuccess) {
        setState({ isSuccess: unfavoriteResponse.isSuccess, result: unfavoriteResponse.result });
      } else setState({ isSuccess: false, result: false });
    }
  }, [unfavoriteResponse]);

  return [state, fetch] as const;
};
export default useFavoriteSwitcher;
