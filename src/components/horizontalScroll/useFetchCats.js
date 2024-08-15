// useFetchCats.js
import { useState, useEffect } from "react";

const useFetchCats = (page, limit) => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCats = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.freeapi.app/api/v1/public/cats?page=${page}&limit=${limit}`
        );
        const data = await response.json();
        setCats((prevCats) => [...prevCats, ...data.data.data] || data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, [page, limit]);

  return { cats, loading, error };
};

export default useFetchCats;
