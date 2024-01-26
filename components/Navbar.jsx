import { Button } from "flowbite-react";
import { FaPlus } from "react-icons/fa";

const Navbar = ({ handleShowModal }) => {
  return (
    <div className="flex w-auto md:w-[50vw] justify-between items-center m-auto bg-slate-200 p-5 mb-5 rounded-b-md">
      <span className="text-lg sm:text-2xl font-semibold mr-4">
        DataManager
      </span>
      <Button pill onClick={handleShowModal}>
        Adicionar
        <FaPlus className="text-slate-100 ml-2" />
      </Button>
    </div>
  );
};

export default Navbar;
