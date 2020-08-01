// Utils
import { getSession, removeSession } from "#helpers/session";
// Services
import {
  MyObject,
  RequestConfig,
  RequestOptions,
  RequestMethod,
  RequestResponse,
  Resource,
  LaravelPagination,
  MetaPagination,
} from "#types";

const getToken = () => {
  const session: MyObject | null = getSession();

  if (session === null) {
    return null;
  }

  return session?.token;
};

const objectToQueryString = (obj: MyObject) =>
  Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");

const request = async (
  initialUrl: string,
  params?: MyObject,
  method: RequestMethod = "GET",
  config: RequestConfig = {}
) => {
  const prefix = typeof config.prefix !== "undefined" ? config.prefix : true;
  const randomNumber = Math.floor(Math.random() * 100);
  let url = `${prefix ? process.env.API_URL : ""}${initialUrl}`;
  const options: RequestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (!config.public) {
    const token = config.token || (await getToken());
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (params) {
    if (method === "GET") {
      url += `?${objectToQueryString(params)}`;
    } else {
      options.body = JSON.stringify(params);
    }
  }

  let response: Response;
  const debug = false && !!process.env.IS_DEBUG;

  if (debug) {
    console.debug(`Debugging Request ${randomNumber}`, url, options);
  }

  try {
    response = await fetch(url, options as RequestInit);
    const errorStatus: Array<number> = [400, 401, 404, 500];

    if (errorStatus.indexOf(response.status) >= 0) {
      const errorResponse = await response.json();

      if (response.status === 401 && !config.public) {
        // removeSession();

        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register" &&
          window.location.pathname !== "/"
        ) {
          // window.location.href = '/login';
        }
      }

      return Promise.reject(errorResponse);
    }

    const result = await response.json();

    if (debug) {
      console.debug(`Debugging Response ${randomNumber}`, result);
    }

    return Promise.resolve(result);
  } catch (e) {
    if (debug) {
      console.debug(`Debugging Response Error ${randomNumber}`, e);
    }

    return Promise.reject(e);
  }
};

async function get<T>(
  url: string,
  params?: MyObject,
  options?: RequestConfig
): Promise<Resource<T>> {
  const response = await request(url, params, "GET", options);

  try {
    return handleSuccess(response);
  } catch (e) {
    return handleError(e);
  }
}

async function post<T>(
  url: string,
  params?: MyObject,
  options?: RequestConfig
): Promise<Resource<T>> {
  const response = await request(url, params, "POST", options);

  try {
    return handleSuccess(response);
  } catch (e) {
    return handleError(e);
  }
}

async function put<T>(
  url: string,
  params?: MyObject,
  options?: RequestConfig
): Promise<Resource<T>> {
  const response = await request(url, params, "PUT", options);

  try {
    return handleSuccess(response);
  } catch (e) {
    return handleError(e);
  }
}

async function _delete<T>(
  url: string,
  params?: MyObject,
  options?: RequestConfig
): Promise<Resource<T>> {
  const response = await request(url, params, "DELETE", options);

  try {
    return handleSuccess(response);
  } catch (e) {
    return handleError<T>(e);
  }
}

export const client = {
  get,
  post,
  put,
  delete: _delete,
};

export const basicClient = client;

function handleSuccess<T>(res: RequestResponse<T>): Resource<T> {
  return res as Resource<T>;
}

function handleError<T>(err: RequestResponse<T>): Resource<T> {
  if (err?.message?.includes("Network request failed")) {
    return {
      error: true,
      data: {} as T,
      message: "request_failed",
    };
  }

  return err;
}

export function fetcher<T>(url: string): Promise<T> {
  return fetch(url).then((res) => res.json());
}

export function responseToMeta<T>(data: LaravelPagination<T>): MetaPagination {
  return {
    currentPage: data.current_page,
    from: data.from,
    lastPage: data.last_page,
    perPage: data.per_page,
    to: data.to,
    total: data.total,
  };
}
