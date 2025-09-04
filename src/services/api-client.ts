import axios from 'axios';

export interface FetchDataResponse<T> {
    count: number;
    next: string | null;
    results: T[];
    isLastPage: boolean;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  ...(import.meta.env.VITE_RAWG_API_KEY && {
    params: { key: import.meta.env.VITE_RAWG_API_KEY }
  })
});

class APIClient<T> {
    resourcePath: string;

    constructor(resourcePath: string) 
    {
        this.resourcePath = resourcePath;
    }

    get(params: any) : Promise<T>
    {
        return axiosInstance
            .get<T>(this.resourcePath, {
                params: params
              })
            .then((res) => res.data);
    }
}

export default APIClient;