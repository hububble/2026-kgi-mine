export const SESSION_KEY = 'mine_auth_token';

import { createContext, Dispatch, SetStateAction } from 'react';

export type TAuthState = { token?: string; isLogin: boolean };
export type TAuthContext = [TAuthState, Dispatch<SetStateAction<TAuthState>>];

export const AuthState: TAuthState = { isLogin: false };
export const UNSET_AUTH_CONTEXT = Symbol('UNSET_AUTH_CONTEXT');
export const AuthContext = createContext<TAuthContext | typeof UNSET_AUTH_CONTEXT>(UNSET_AUTH_CONTEXT);
