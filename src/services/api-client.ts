import axios from "axios";

export interface FetchDataResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
  isLastPage: boolean;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  ...(import.meta.env.VITE_RAWG_API_KEY && {
    params: { key: import.meta.env.VITE_RAWG_API_KEY },
  }),
});

class APIClient<TRequest, TResponse> {
  resourcePath: string;

  constructor(resourcePath: string) {
    this.resourcePath = resourcePath;
  }

  get(
    params: Record<string, string | number | unknown>,
    headers: Record<string, string>
  ): Promise<TResponse> {
    return axiosInstance
      .get<TResponse>(this.resourcePath, {
        params,
        headers,
      })
      .then((res) => res.data);
  }

  post(request: TRequest): Promise<TResponse> {
    return axiosInstance
      .post<TResponse>(this.resourcePath, request)
      .then((res) => res.data);
  }
}

export default APIClient;
