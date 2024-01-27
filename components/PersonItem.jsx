"use client";
import { useState } from "react";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import ModalAddPerson from "./ModalAddPerson";
import ModalDeletePerson from "./ModalDeletePerson";
import ModalUpdatePerson from "./ModalUpdatePerson";
import { useFetchPeople } from "@/hooks/useFetchPeople";
import { useFetchStates } from "@/hooks/useFetchStates";
import { useFetchHobbies } from "@/hooks/useFetchHobbies";
import { api } from "@/utils/api";

const PersonItem = ({ showModalAdd, handleCloseModalAdd }) => {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [loading, setLoading] = useState(false);

  const { people, setPeople } = useFetchPeople(showModalAdd, showModalUpdate);
  const { states } = useFetchStates();
  const { hobbies: listHobbies } = useFetchHobbies();

  const handleShowModalUpdate = (person) => {
    setSelectedPerson(person);
    setShowModalUpdate(true);
  };

  const handleShowModalDelete = (person) => {
    setSelectedPerson(person);
    setShowModalDelete(true);
  };

  const handleCloseModalUpdate = () => {
    setSelectedPerson(null);
    setShowModalUpdate(false);
  };

  const handleCloseModalDelete = () => {
    setSelectedPerson(null);
    setShowModalDelete(false);
  };

  const handleDelete = async (personId) => {
    try {
      setLoading(true);
      const response = await fetch(`${api}/people?id=${personId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir pessoa");
      }

      const updatedPeople =
        people && people.filter((person) => person._id !== personId);
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
      <div className="flex flex-col mb-32 gap-2 p-5 bg-black bg-opacity-25">
        {people && people.length === 0 && (
          <div className="m-auto bg-slate-100 p-5">
            <p>Não há pessoas cadastradas!</p>
          </div>
        )}
        {people &&
          people.map((person) => (
            <div
              key={person._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-slate-200 rounded-sm shadow-sm shadow-slate-800"
            >
              <div className="flex flex-col w-11/12 sm:w-1/2">
                <span className="sm:w-full">
                  <strong>Nome:</strong> {person.name}
                </span>
                <span>
                  <strong>Email:</strong> {person.email}
                </span>
              </div>
              <div className="flex flex-col w-11/12 sm:w-1/2 sm:ml-4">
                <span>
                  <strong>Cidade/Estado:</strong> {person.city} - (
                  {person.state})
                </span>
                <span>
                  <strong>Hobbies:</strong> {person.hobbies.join(", ")}
                </span>
              </div>
              <div className="flex flex-col flex-initial ml-auto mt-4 justify-between sm:ml-6 sm:mt-0 h-14">
                <FaUserEdit
                  className="size-6 cursor-pointer hover:scale-110 transition-all text-cyan-800"
                  onClick={() => handleShowModalUpdate(person)}
                  title="Editar"
                />
                <FaTrash
                  className="text-red-700 cursor-pointer hover:scale-110 transition-all size-5"
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
        states={states}
        listHobbies={listHobbies}
      />
      <ModalUpdatePerson
        showModal={showModalUpdate}
        handleClose={handleCloseModalUpdate}
        person={selectedPerson}
        states={states}
        listHobbies={listHobbies}
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
