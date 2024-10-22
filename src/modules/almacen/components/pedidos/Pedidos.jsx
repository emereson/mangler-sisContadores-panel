import { Button, Input, useDisclosure } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import PreviewPedidos from "./components/PreviewPedidos";
import TablaPedidos from "./components/TablaPedidos";
import axios from "axios";
import config from "../../../../utils/getToken";
import ConfirmarPedidoModal from "./components/ConfirmarPedidoModal";
import AnularPedidoModal from "./components/AnularPedidoModal";

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Mes de 0-11, por eso sumamos 1
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const Pedidos = ({ userData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [fecha, setFecha] = useState(getTodayDate());
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [selectModal, setSelectModal] = useState(null);

  const fetchPedidos = () => {
    const url = `${import.meta.env.VITE_URL_API}/pedido?fecha=${fecha}`;

    axios.get(url, config).then((res) => {
      setPedidos(res.data.pedidos);
    });

    setPedidoSeleccionado(null);
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div className="w-full  h-full p-4 flex">
      <div className="w-1/2 pr-4  h-full flex flex-col ">
        <section className="flex flex-col gap-2 ">
          <h2 className="font-semibold text-lg">Filtro de pedidos</h2>
          <div className="flex justify-between items-start">
            <div className="flex  gap-4 items-end">
              <Input
                className="w-40"
                classNames={{
                  inputWrapper: ["border-neutral-600"],
                }}
                defaultValue={fecha}
                onChange={(e) => setFecha(e.target.value)}
                type="date"
                variant="bordered"
                label="Fecha"
                labelPlacement="outside"
                id="fecha"
                size="sm"
              />
              <Button color="warning" size="sm" onClick={fetchPedidos}>
                Actualizar
              </Button>
            </div>
            <div className="w-24 h-20 shadow-zinc-500 shadow-md rounded-xl border-zinc-400 border-2  text-black flex flex-col items-center justify-center mt-[-20px]">
              <h2 className="text-sm font-semibold">N pedidos</h2>
              <span className="text-sm font-semibold text-red-500">
                {pedidos.length}
              </span>
            </div>
          </div>
        </section>
        {userData.userData.role !== "Capataz" &&
          pedidoSeleccionado &&
          pedidoSeleccionado?.estado !== "despachado" &&
          pedidoSeleccionado?.estado !== "anulado" && (
            <div className="w-full flex justify-between mt-4">
              <Button
                size="sm"
                color="danger"
                onClick={() => {
                  setSelectModal("anular"), onOpen();
                }}
              >
                Anular Pedido
              </Button>
              <Button
                size="sm"
                color="success"
                onClick={() => {
                  setSelectModal("confirmar"), onOpen();
                }}
              >
                Confirmar Pedido
              </Button>
            </div>
          )}
        <TablaPedidos
          pedidos={pedidos}
          setPedidoSeleccionado={setPedidoSeleccionado}
        />
      </div>
      <PreviewPedidos pedidoSeleccionado={pedidoSeleccionado} />
      {selectModal === "confirmar" && (
        <ConfirmarPedidoModal
          pedidoSeleccionado={pedidoSeleccionado}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          fetchPedidos={fetchPedidos}
        />
      )}
      {selectModal === "anular" && (
        <AnularPedidoModal
          pedidoSeleccionado={pedidoSeleccionado}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          fetchPedidos={fetchPedidos}
        />
      )}
    </div>
  );
};

export default Pedidos;
