import apiClient from "@/services/api-client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

export interface FetchDataResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(resource: string, params: any, deps?: any) => {
      const [data, setData] = useState<T[]>([]);
      const [count, setCount] = useState(0);
      const [error, setError] = useState("");
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true);
        setError(""); // reset any previous error or else the app will never be able to recover from one

        apiClient
          .get<FetchDataResponse<T>>(resource, { signal: controller.signal, params: params })
          .then((res) => {
            setData(res.data.results);
            setCount(res.data.count);
            setIsLoading(false);
          })
          .catch((err) => {             
            if (err instanceof CanceledError) 
            {
                // don't display error in case we cancel a request calling controller.abort
                return;
            }
            setError(err.message);
            setIsLoading(false); // note: we don't call this in case of the canceled error, would mess up the effect
            // also, finally block doesn't work well in strict mode
        });
        
        // cleanup function to be called when unmounting the component.
        // strict mode causes double-render quickly, instead of forcing two network calls
        // we simply raise the abort signal.  in the case of the first request that is part of the first render, it will effectively abort it
        // in the case of the second request, it won't cause any issues, as abort will be caused way after the call has been
        // issued and data return, so no harm is caused.
        return () => controller.abort();
      }, deps);

      return { data, count, error, isLoading};
}

export default useData;