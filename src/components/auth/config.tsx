export const SESSION_KEY = 'mine_auth_token';

import { createContext, Dispatch, SetStateAction } from 'react';

export type TAuthState = {
  token?: string;
  isLogin: boolean;
  memberId?: string;
  memberInfoDto?: {
    allowEDM?: boolean;
    baseNum?: number;
    birthday?: any | null;
    birthdayUpdatedAt?: any | null;
    careerNum?: number;
    communityNum?: number;
    email?: string;
    favoriteContentList?: any[];
    financeNum?: number;
    gender?: string;
    hasCheckedIn?: boolean;
    healthNum?: number;
    image?: string;
    isBirthdayEditable?: boolean;
    likeContentList?: any[];
    name?: string;
    nickName?: string;
    phone?: string;
    relationsNum?: number;
    tripId?: string;
    unlockContentList?: any[];
    unlockEventList?: any[];
  };
};
export type TAuthContext = [TAuthState, Dispatch<SetStateAction<TAuthState>>];

export const AuthState: TAuthState = { isLogin: false };
export const UNSET_AUTH_CONTEXT = Symbol('UNSET_AUTH_CONTEXT');
export const AuthContext = createContext<TAuthContext | typeof UNSET_AUTH_CONTEXT>(UNSET_AUTH_CONTEXT);
