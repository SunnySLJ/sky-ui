import { readStorage, removeStorage, writeStorage } from '@/lib/utils/storage';

export const USER_KEY = 'timarsky_user';

export type User = {
  username: string;
  credits: number;
  avatar: string;
  loginTime: number;
};

export const DEFAULT_USER: User = {
  username: '97541111',
  credits: 50,
  avatar: '/images/avatar.png',
  loginTime: 0,
};

export function getCurrentUser() {
  return readStorage<User>(USER_KEY);
}

export function loginMock(payload: Partial<User> & { username?: string }) {
  const user: User = {
    username: payload.username || DEFAULT_USER.username,
    credits: payload.credits || DEFAULT_USER.credits,
    avatar: DEFAULT_USER.avatar,
    loginTime: Date.now(),
  };
  writeStorage(USER_KEY, user);
  return user;
}

export function registerMock(payload: { username: string }) {
  return loginMock({ username: payload.username, credits: 50 });
}

export function logoutMock() {
  removeStorage(USER_KEY);
}
