import { api } from "@/utils/api";
import { useEffect, useState } from "react";

export const useFetchHobbies = () => {
  const [hobbies, setHobbies] = useState(null);

  useEffect(() => {
    async function fetchHobbies() {
      try {
        const responseHobbies = await fetch(`${api}/hobbies`);

        if (!responseHobbies) {
          throw new Error("Erro ao obter dados");
        }

        const dataHobbies = await responseHobbies.json();
        setHobbies(dataHobbies.hobbies);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchHobbies();
  }, []);

  return { hobbies };
};
