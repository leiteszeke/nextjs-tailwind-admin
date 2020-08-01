export type MyObject = {
  [key: string]: any;
};

export type RequestConfig = {
  public?: boolean;
  prefix?: boolean | string;
  token?: string;
};

export type RequestMethod = "POST" | "PUT" | "GET" | "DELETE";

export type RequestOptions = {
  method: RequestMethod;
  body?: MyObject | string;
  headers: {
    [key: string]: string;
  };
};

export type RequestResponse<T> = {
  error: boolean;
  data: T;
  message: string;
  meta?: ResponseMeta;
};

export type ResponseMeta = {
  perPage: number;
  currentPage: number;
  lastPage: number;
  from: number;
  to: number;
  total: number;
};

export type Permission = {};

export type Resource<T> = {
  data: T;
  error: boolean;
  message: string;
  meta?: MetaPagination;
};

export type EmptyObject = [];

export type LaravelPagination<T> = {
  current_page: number;
  data: T;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
};

export type MetaPagination = {
  currentPage: number;
  from: number;
  lastPage: number;
  perPage: number;
  to: number;
  total: number;
};

export type Stadium = {};
