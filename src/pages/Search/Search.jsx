import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";
import api from "../../services/api";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getSearchResult = async () => {
      try {
        const response = await api.get(`/api/products/search?query=${query}`);

        setSearchResults(response);
      } catch (error) {
        console.error("Error al buscar productos:", error);
        setSearchResults([]);
      }
    };

    getSearchResult();
  }, [query]);

  return (
    <div>
      <ProductList products={searchResults} title="Resultado" />
    </div>
  );
};

export default Search;
