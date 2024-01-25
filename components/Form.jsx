import { useFetchCities } from "@/hooks/useFetchCities";
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

import { api } from "@/utils/api";

const Form = ({ person, states, listHobbies, closeModal }) => {
  const [name, setName] = useState(person ? person.name : "");
  const [email, setEmail] = useState(person ? person.email : "");
  const [selectedState, setSelectedState] = useState(
    person
      ? states && states.find((state) => state.name === person.state)
      : null
  );
  const [selectedCity, setSelectedCity] = useState(person ? person.city : "");
  const [hobbies, setHobbies] = useState(person ? person.hobbies : "");
  const [loading, setLoading] = useState(false);

  const { cities, setCities } = useFetchCities(selectedState);

  console.log(selectedCity);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);

      if (!name || !email || !selectedState || !selectedCity) {
        setLoading(false);
        throw new Error("É obrigatório preencher todos os campos");
      }

      if (hobbies.length === 0) {
        alert("Selecione pelo menos um Hobby!");
        setLoading(false);
        return;
      }

      let url, method, personSchema;

      if (person) {
        personSchema = {
          newName: name,
          newEmail: email,
          newState: selectedState.name,
          newCity: selectedCity,
          newHobbies: hobbies,
        };

        url = `${api}/people/${person._id}`;
        method = "PUT";
      } else {
        personSchema = {
          name,
          email,
          state: selectedState.name,
          city: selectedCity,
          hobbies,
        };

        url = `${api}/people`;
        method = "POST";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personSchema),
      });

      if (!response.ok) {
        throw new Error(`Erro ao ${person ? "atualizar" : "criar"} pessoa`);
      }

      // Limpa os campos após a operação bem-sucedida
      if (!person) {
        setName("");
        setEmail("");
        setSelectedState(null);
        setCities(null);
        setSelectedCity("");
      }

      setLoading(false);
      closeModal();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="nome" value="Nome:" />
          </div>
          <TextInput
            id="nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email:" />
          </div>
          <TextInput
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="state" value="Estado:" />
          </div>
          <Select
            id="state"
            required
            value={selectedState ? selectedState.name : ""}
            onChange={(event) => {
              if (states) {
                const selectedStateObject = states.find(
                  (state) => state.name === event.target.value
                );
                setSelectedState(selectedStateObject);
                setSelectedCity("");
              }
            }}
          >
            <option disabled value="">
              Selecione um Estado
            </option>
            {states &&
              states.map((state) => (
                <option key={state._id} value={state.name}>
                  {state.name} - {state.us}
                </option>
              ))}
          </Select>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="city" value="Cidade:" />
          </div>
          <Select
            id="city"
            value={selectedCity ? selectedCity : ""}
            disabled={!cities}
            required
            onChange={(event) => {
              setSelectedCity(event.target.value);
            }}
          >
            <option disabled value="">
              Selecione uma Cidade
            </option>
            {cities &&
              cities.map((city) => (
                <option key={city._id} value={city.nome}>
                  {city.nome}
                </option>
              ))}
          </Select>
        </div>
        <div>
          <Label className="mb-1 block" value="Hobbies:" />
          {listHobbies &&
            listHobbies.map((hobby) => (
              <div key={hobby._id} className="p-2 flex items-center gap-2">
                <Checkbox
                  id={hobby._id}
                  className="cursor-pointer"
                  checked={hobbies.includes(hobby.hobby)}
                  onChange={(event) => {
                    const hobbyName = hobby.hobby;

                    // Se o checkbox estiver marcado, adiciona o hobby ao array de hobbies
                    // Caso contrário, remove o hobby do array
                    setHobbies((prevHobbies) =>
                      event.target.checked
                        ? [...prevHobbies, hobbyName]
                        : prevHobbies.filter((id) => id !== hobbyName)
                    );
                  }}
                />
                <Label htmlFor={hobby._id}>{hobby.hobby}</Label>
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Button className="w-100 flex-1" type="submit" disabled={loading}>
          {person ? "Atualizar" : "Adicionar"}
        </Button>
      </div>
    </form>
  );
};

export default Form;
