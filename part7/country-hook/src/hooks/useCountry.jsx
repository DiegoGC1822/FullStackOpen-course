import axios from "axios";
import { useEffect, useState } from "react";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      if (!name) return;
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
        );
        setCountry({ found: true, data: response.data });
      } catch (e) {
        setCountry({ found: false });
      }
    };

    fetchCountry();
  }, [name]);

  return country;
};
