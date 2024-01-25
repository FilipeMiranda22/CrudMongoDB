import { api } from "@/utils/api";
import { useEffect, useState } from "react";

export const useFetchCities = (selectedState) => {
  const [cities, setCities] = useState(null);

  useEffect(() => {
    async function fetchCities(stateId) {
      try {
        const response = await fetch(`${api}/state/${stateId}`);

        if (!response.ok) {
          throw new Error("Erro ao obter dados das cidades");
        }

        const data = await response.json();
        setCities(data.cities);
      } catch (error) {
        console.error(error.message);
      }
    }

    if (selectedState) {
      fetchCities(selectedState._id);
    }
  }, [selectedState]);

  return { cities, setCities };
};
