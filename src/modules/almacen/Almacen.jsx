import { Button, useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import { FaClipboardList, FaTools, FaWpforms } from "react-icons/fa";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import Pedidos from "./components/pedidos/Pedidos";
import ModalMateriales from "./components/materiales/ModalMateriales";
import StockMateriales from "./components/pedidos/components/StockMateriales";

const Almacen = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectComponent, setSelectComponent] = useState("pedidos");

  return (
    <div className="min-h-[100vh] w-full ">
      <section className="w-screen bg-zinc-50 p-4 h-[70px] flex  shadow-lg items-center">
        <h1 className="text-2xl font-bold">Almacen</h1>
        <div className=" w-full flex items-center justify-center gap-4">
          <Button
            className="flex items-center gap-4 p-4 hover:bg-red-500 bg-black text-white h-10"
            onClick={() => setSelectComponent("pedidos")}
            endContent={<FaClipboardList className="text-2xl" />}
          >
            <p className="text-sm">Pedidos</p>
          </Button>
          <Button
            className="flex items-center gap-4 p-4 hover:bg-red-500 bg-black text-white h-10"
            onClick={() => setSelectComponent("stock")}
            endContent={<FaClipboardList className="text-2xl" />}
          >
            <p className="text-sm">Stock Materiales</p>
          </Button>
          <Button
            className="flex items-center gap-4 p-4 hover:bg-red-500 bg-black text-white h-10"
            onClick={onOpen}
            endContent={<FaTools className="text-xl" />}
          >
            <p className="text-sm">Agregar Material</p>
          </Button>
        </div>
      </section>
      {selectComponent === "pedidos" && <Pedidos />}
      {selectComponent === "stock" && <StockMateriales />}

      <ModalMateriales onOpenChange={onOpenChange} isOpen={isOpen} />
    </div>
  );
};

export default Almacen;
