import React, { useEffect, useState } from "react";
import "./styles.css";

export const App = () => {
  const [data, setData] = useState([]);
  const LIMIT = 10;
  const SKIP = 10;
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    const data = await fetch(
      `https://dummyjson.com/products?limit=${LIMIT}&skip=${(page - 1) * SKIP}`
    );
    const products = await data.json();

    console.log(products);

    setData(products);
  };
  const totalPages = Math.floor(data.total / LIMIT);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="app">
      <div className="products">
        {data.products &&
          data.products.map((product) => {
            return (
              <div className="product__card" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <h2>{product.title}</h2>
              </div>
            );
          })}
      </div>
      <div className="pagination">
        <span
          className={`left ${page === 1 && "disabled"}`}
          onClick={() => setPage(page - 1)}
        >
          ⬅️
        </span>
        {totalPages &&
          new Array(totalPages).fill("").map((_, idx) => {
            return (
              <span
                key={idx}
                className={`${page === idx + 1 && "selected"}`}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </span>
            );
          })}
        <span
          className={`right ${page === totalPages && "disabled"}`}
          onClick={() => setPage(page + 1)}
        >
          ➡️
        </span>
      </div>
    </div>
  );
};
