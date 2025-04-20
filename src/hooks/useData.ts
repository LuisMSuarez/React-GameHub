import apiClient from "@/services/api-client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface FetchDataResponse<T> {
  count: number;
  results: T[];
}

interface Props {
  resource: string;
  params?: any;
}

const useData = <T>({resource, params}: Props) => {
      const [data, setData] = useState<T[]>([]);
      const [error, setError] = useState("");
      const [isLoading, setIsLoading] = useState(false);

      useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true);

        apiClient
          .get<FetchDataResponse<T>>(resource, { signal: controller.signal, params: params === null ? {} : params})
          .then((res) => {
            setData(res.data.results); 
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
        });
        
        // cleanup function to be called when unmounting the component.
        // strict mode causes double-render quickly, instead of forcing two network calls
        // we simply raise the abort signal.  in the case of the first request that is part of the first render, it will effectively abort it
        // in the case of the second request, it won't cause any issues, as abort will be caused way after the call has been
        // issued and data return, so no harm is caused.
        return () => controller.abort();
      }, [resource, params]);

      return { data, error, isLoading};
}

export default useData;