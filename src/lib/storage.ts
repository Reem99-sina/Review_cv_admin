// src/lib/storage.ts

import type { AuthToken, User } from "../types/user";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function saveToken(token: AuthToken | string) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export function loadToken(): AuthToken | string | null {
  const value = localStorage.getItem(TOKEN_KEY);
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export function saveUser(user: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function loadUser(): User | null {
  const value = localStorage.getItem(USER_KEY);
  return value ? JSON.parse(value) : null;
}

export function clearAuthStorage() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export const getFileUrl = (url: string) => {
  if (!url) return "#";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${process.env.NEXT_PUBLIC_URL}${url}`;
};