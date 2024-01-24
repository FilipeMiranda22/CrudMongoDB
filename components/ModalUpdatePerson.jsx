import {
  Button,
  Checkbox,
  Label,
  Modal,
  Select,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";

const ModalUpdatePerson = ({ handleClose, showModal, person }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [listHobbies, setListHobbies] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStates_Hobbies() {
      try {
        const responseStates = await fetch("http://localhost:3000/api/state");
        const responseHobbies = await fetch(
          "http://localhost:3000/api/hobbies"
        );

        if (!responseStates.ok || !responseHobbies) {
          throw new Error("Erro ao obter dados");
        }

        const dataStates = await responseStates.json();
        const dataHobbies = await responseHobbies.json();
        setStates(dataStates.state);
        setListHobbies(dataHobbies.hobbies);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchStates_Hobbies();
  }, []);

  useEffect(() => {
    async function fetchCities(stateId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/state/${stateId}`
        );

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

  useEffect(() => {
    // Atualiza os campos do formulário quando a pessoa é alterada
    if (person) {
      setName(person.name || "");
      setEmail(person.email || "");
      setSelectedState(
        states.find((state) => state.name === person.state) || null
      );
      setSelectedCity(person.city || "");
      setHobbies(person.hobbies);
    }
  }, [person, states]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);

      if (!name || !email || !selectedState || !selectedCity) {
        throw new Error("É obrigatório preencher todos os campos");
      }

      if (hobbies.length === 0) {
        alert("Selecione pelo menos um Hobby!");
        return;
      }

      const personSchema = {
        newName: name,
        newEmail: email,
        newState: selectedState ? selectedState.name : "",
        newCity: selectedCity,
        newHobbies: hobbies,
      };

      // Faz a requisição PUT para a API, já que estamos atualizando
      const url = `http://localhost:3000/api/people/${person._id}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personSchema),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar pessoa`);
      }

      // Limpa os campos após a operação bem-sucedida
      setLoading(false);
      handleClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Modal show={showModal} onClose={handleClose} position="center" size="md">
      <Modal.Header>Atualizar Cadastro</Modal.Header>
      <Modal.Body>
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
                  const selectedStateObject = states.find(
                    (state) => state.name === event.target.value
                  );

                  setSelectedState(selectedStateObject);
                }}
              >
                <option disabled value="">
                  Selecione um Estado
                </option>
                {states.map((state) => (
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
                value={selectedCity}
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
              {listHobbies.map((hobbie) => (
                <div key={hobbie._id} className="p-2 flex items-center gap-2">
                  <Checkbox
                    id={hobbie._id}
                    className="cursor-pointer"
                    checked={hobbies.includes(hobbie.hobbie)}
                    onChange={(event) => {
                      const hobby = hobbie.hobbie;

                      // Se o checkbox estiver marcado, adiciona o hobby ao array de hobbies
                      // Caso contrário, remove o hobby do array
                      setHobbies((prevHobbies) =>
                        event.target.checked
                          ? [...prevHobbies, hobby]
                          : prevHobbies.filter((id) => id !== hobby)
                      );
                    }}
                  />
                  <Label htmlFor={hobbie._id}>{hobbie.hobbie}</Label>
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
      </Modal.Body>
    </Modal>
  );
};

export default ModalUpdatePerson;
