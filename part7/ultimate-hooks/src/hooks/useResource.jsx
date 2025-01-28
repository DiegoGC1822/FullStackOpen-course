import { useState, useEffect } from "react";
import axios from "axios";

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        setResources(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource);
      setResources((prevResources) => [...prevResources, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const service = {
    create,
  };

  return [resources, service];
};
