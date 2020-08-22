import React, { useState, useEffect } from "react";
import { API_KEY, CONTEXT_KEY } from "../keys";

function useGoogleSearch(searchTerm) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getSearchResults = async () => {
      fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${searchTerm}`
      )
        .then((res) => res.json())
        .then((result) => setData(result));
    };

    getSearchResults()
    
  }, [searchTerm]);

  return {
      data
  };
}

export default useGoogleSearch;
