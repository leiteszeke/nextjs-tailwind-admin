// Dependencies
import { User } from "#types";
import Cookie from "js-cookie";

const SESSION_KEY = "mas1ManagementAdmin";

export const setSession = (user: User | Partial<User>) =>
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));

export const removeSession = () => {
  localStorage.removeItem(SESSION_KEY);
  Cookie.remove(SESSION_KEY);
};

export const getSession = () => {
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return null;
  return JSON.parse(session);
};

export const updateSession = (data: User | Partial<User>) => {
  const session = getSession();
  const newSession = { ...session, ...data };
  setSession(newSession);
  return newSession;
};

export const isLogged = () => getSession();
