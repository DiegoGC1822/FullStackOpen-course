import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = <T>(requestFn: () => Promise<T>, deps: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await requestFn();
        setData(result);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e.response.data === "string") {
            const message = e.response.data.replace(
              "Something went wrong. Error: ",
              ""
            );
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, deps);

  return { data, loading, error, setData };
};

export default useAxios;
