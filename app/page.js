"use client";
import PersonItem from "@/components/PersonItem";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Home() {
  const [showModalAdd, setShowModalAdd] = useState(false);

  const handleOpenModal = () => {
    setShowModalAdd(true);
  };

  const handleCloseModal = () => {
    setShowModalAdd(false);
  };

  return (
    <div className="App">
      <Navbar handleShowModal={handleOpenModal} />
      <PersonItem
        showModalAdd={showModalAdd}
        handleCloseModalAdd={handleCloseModal}
      />
    </div>
  );
}
