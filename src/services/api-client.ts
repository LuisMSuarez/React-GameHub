import axios from 'axios';

export interface FetchDataResponse<T> {
    count: number;
    next: string | null;
    results: T[];
    isLastPage: boolean;
}

const axiosInstance =  axios.create({
    /* uncomment to invoke rawg api directly from the client 
    baseURL: "https://api.rawg.io/api", */
    /* uncomment to invoke local api service from the client
     baseURL: "https://localhost:7285/v1", */
     /* production url */
    baseURL: "https://localhost:7285/v1",
    /*
    uncomment if using rawg api directly
    params: {
        key: import.meta.env.VITE_RAWG_API_KEY
    }
    */
})

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