import { useEffect, useState } from "react";
import { api } from "@/utils/api";

export const useFetchPeople = (showModalAdd, showModalUpdate) => {
  const [people, setPeople] = useState(null);

  useEffect(() => {
    async function fetchPeople() {
      try {
        const response = await fetch(`${api}/people`);

        if (!response.ok) {
          throw new Error("Erro ao obter dados das pessoas");
        }

        const data = await response.json();
        setPeople(data.people);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchPeople();
  }, [showModalAdd, showModalUpdate]);

  return { people, setPeople };
};
