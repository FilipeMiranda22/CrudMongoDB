import { api } from "@/utils/api";
import { useEffect, useState } from "react";

export const useFetchStates = () => {
  const [states, setStates] = useState(null);

  useEffect(() => {
    async function fetchStates() {
      try {
        const responseStates = await fetch(`${api}/state`);

        if (!responseStates.ok) {
          throw new Error("Erro ao obter dados");
        }

        const dataStates = await responseStates.json();

        setStates(dataStates.state);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchStates();
  }, []);

  return { states };
};
