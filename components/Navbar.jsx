import { Button } from "flowbite-react";

const Navbar = ({ handleShowModal }) => {
  return (
    <div className="flex justify-between items-center w-[50vw] bg-slate-100 p-5 mb-5 rounded-b-md">
      <span>DataManager</span>
      <Button pill onClick={handleShowModal}>
        Adicionar
      </Button>
    </div>
  );
};

export default Navbar;
