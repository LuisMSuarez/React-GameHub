import axios from 'axios';

export interface FetchDataResponse<T> {
    count: number;
    results: T[];
}

export default axios.create({
    /* uncomment to invoke rawg api directly from the client 
    baseURL: "https://api.rawg.io/api", */
    /* uncomment to invoke local api service from the client
     baseURL: "https://localhost:7285/v1", */
     /* production url */
    baseURL: "https://gamers-hub-api.azurewebsites.net/v1",
    /*
    uncomment if using rawg api directly
    params: {
        key: import.meta.env.VITE_RAWG_API_KEY
    }
    */
})