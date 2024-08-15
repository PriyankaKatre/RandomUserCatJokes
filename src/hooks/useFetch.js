import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [resData, setResData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        const result = await response.json();
        setResData(result);
        //setResData((prevCats) => [...prevCats, ...result.data.data] || result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { resData, loading, error };
};

export default useFetch;
