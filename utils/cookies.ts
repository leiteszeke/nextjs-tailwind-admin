import cookie from "js-cookie";
import { decode } from "js-base64";

export const setCookie = (key: string, value: any) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: "/",
    });
  }
};

export const removeCookie = (key: string) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key: string, req: any) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key: string) => cookie.get(key);

export const getCookieFromServer = (key: string, req: any) => {
  if (!req?.headers?.cookie) {
    return undefined;
  }

  const rawCookie = req.headers.cookie
    .split(";")
    .find((c: string) => c.trim().startsWith(`${key}=`));

  if (!rawCookie) {
    return undefined;
  }

  return rawCookie.split("=")[1];
};

export const getToken = (ctx) => {
  const cookie = getCookie("mas1ManagementAdmin", ctx.req);
  const data = decode(cookie);
  const { token } = JSON.parse(data);
  return token;
};
