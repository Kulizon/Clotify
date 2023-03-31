import { useState, useEffect } from "react";

const useFetch = (url, options) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState();

  useEffect(() => {
    if (!url) return { result, isLoading, error };

    const fetchData = async () => {
      setError(null);
      setIsLoading(true);
      setResult();

      try {
        const response = await fetch(url, { ...options });
        const result = await response.json();

        setResult(result);

        if (result.code === 200) {
          setResult(result);
        } else {
          setError(result.message);
        }

        setIsLoading(false);
      } catch (e) {
        setError(e);
        console.log(e);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]); // eslint-disable-line react-hooks/exhaustive-deps

  return { result, isLoading, error };
};

export default useFetch;
