import { useEffect, useState, useRef, useCallback } from "react";
import useFetch from "../../hooks/useFetch.js";
import "./style.scss";
import { Link } from "react-router-dom";
import codeImage from "../../assets/codeImage.svg";

const CatListing = () => {
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(1);

  const { resData, loading, error } = useFetch(
    `https://api.freeapi.app/api/v1/public/cats?page=${page}&limit=4`
  );
  useEffect(() => {
    if (resData) {
      setCats((prevCats) => [...prevCats, ...(resData?.data?.data || [])]);
    }
  }, [resData]);

  const observer = useRef();
  const lastCatRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const temperament = (temp) => {
    return temp.split(" ").map((data, index) => {
        return <span className="pils" key={ index}>{data}</span>;
    });
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="cats-container">
      <header>
        <h3>Cats around us</h3>
        <Link to="https://chaicode.com/" className="chaiCode" target="_blank">
          <img src={codeImage} />
        </Link>
      </header>
      <div className="card-wrapper">
        {cats &&
          cats?.map((cat, index) => {
            return (
              <div
                className="card"
                key={cat.id}
                ref={index === cats.length - 1 ? lastCatRef : null}
              >
                <img src={cat.image} alt="Kurilian Cat" />
                <div className="card-content">
                  <h2 className="card-title">{cat.name}</h2>
                  <p className="card-text">
                    {cat.description.substring(0, 80)}...
                  </p>
                  <p className="card-text">
                    <strong>Origin:</strong> {cat.origin}
                  </p>
                  <p className="card-text temperament">
                    <strong>Temperament:</strong> {temperament(cat.temperament)}
                  </p>
                  <p className="card-text">
                    <strong>Life Span:</strong> {cat.life_span} years
                  </p>
                </div>
                <div className="card-footer">
                  <Link to="https://www.wikipedia.org/">Learn More</Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CatListing;
