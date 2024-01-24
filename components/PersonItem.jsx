"use client";
import { useEffect, useState } from "react";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import ModalAddPerson from "./ModalAddPerson";
import { Button } from "flowbite-react";
import ModalDeletePerson from "./ModalDeletePerson";
import ModalUpdatePerson from "./ModalUpdatePerson";
const PersonItem = ({ showModalAdd, handleCloseModalAdd }) => {
  const [people, setPeople] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleShowModalUpdate = (person) => {
    setSelectedPerson(person);
    setShowModalUpdate(true);
  };

  const handleShowModalDelete = (person) => {
    setSelectedPerson(person);
    setShowModalDelete(true);
  };

  const handleCloseModalUpdate = () => {
    setShowModalUpdate(false);
  };

  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };

  useEffect(() => {
    async function fetchPeople() {
      try {
        const response = await fetch("http://localhost:3000/api/people");

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

  const handleDelete = async (personId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/people?id=${personId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir pessoa");
      }

      // Atualiza a lista de pessoas após a exclusão bem-sucedida
      const updatedPeople = people.filter((person) => person._id !== personId);
      setPeople(updatedPeople);
      setShowModalDelete(false);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!people) {
    return <p className="text-slate-100">Carregando...</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {people && people.length === 0 && (
          <div className="m-auto bg-slate-100 p-5">
            <p>Não há pessoas cadastradas!</p>
          </div>
        )}
        {people &&
          people.map((person) => (
            <div
              key={person._id}
              className="flex w-[50vw] justify-between items-center p-5 bg-slate-100 rounded-md shadow-sm shadow-slate-800"
            >
              <div className="flex flex-col w-1/2">
                <span>
                  <strong>Nome:</strong> {person.name}
                </span>
                <span>
                  <strong>Email:</strong> {person.email}
                </span>
              </div>
              <div className="flex flex-col w-1/2">
                <span>
                  <strong>Cidade/Estado:</strong> {person.city} - (
                  {person.state})
                </span>
                <span>
                  <strong>Hobbies:</strong> {person.hobbies.join(", ")}
                </span>
              </div>
              <div className="flex flex-col justify-between ml-6 h-14">
                <FaUserEdit
                  className="size-6 cursor-pointer hover:scale-110 transition-all text-blue-900"
                  onClick={() => handleShowModalUpdate(person)}
                  title="Editar"
                />
                <FaTrash
                  className="text-red-600 cursor-pointer hover:scale-110 transition-all size-5"
                  onClick={() => handleShowModalDelete(person)}
                  title="Excluir"
                />
              </div>
            </div>
          ))}
      </div>
      <ModalAddPerson
        handleClose={handleCloseModalAdd}
        showModal={showModalAdd}
      />
      <ModalUpdatePerson
        showModal={showModalUpdate}
        handleClose={handleCloseModalUpdate}
        person={selectedPerson}
      />
      <ModalDeletePerson
        person={selectedPerson && selectedPerson.name}
        showModal={showModalDelete}
        handleClose={handleCloseModalDelete}
        handleDelete={() => handleDelete(selectedPerson && selectedPerson._id)}
        loadingDelete={loading}
      />
    </>
  );
};

export default PersonItem;
