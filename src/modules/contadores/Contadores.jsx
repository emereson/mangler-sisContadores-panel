import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import NuevoPedido from "./components/nuevoPedido/NuevoPedido";
import SolicitudMateriales from "./components/solicitudMateriales/SolicitudMateriales";
import SolicitudContadores from "./components/solicitudContadores/SolicitudContadores";
import SolicitudClacs from "./components/solicitudClacs/SolicitudClacs";
import { MdAssignmentReturn } from "react-icons/md";
import Devolucion from "./components/devolucion/Devolucion";
import SolicitudDevoluciones from "./components/solicitudDevoluciones/SolicitudDevoluciones";

const Contadores = ({ userData }) => {
  const [selectComponent, setSelectComponent] = useState("pedidos");
  return (
    <div className="min-h-[100vh] w-full ">
      <section className="w-screen bg-zinc-50 p-4 h-[70px] flex  shadow-lg items-center">
        <h1 className="text-2xl font-bold">Contadores</h1>
        <div className=" w-full flex items-center justify-center gap-4">
          <Button
            className={`flex items-center gap-4 p-4 hover:bg-red-500 bg-black text-white h-10 ${
              selectComponent === "pedidos" ? "bg-red-500" : ""
            }`}
            onClick={() => setSelectComponent("pedidos")}
            endContent={<FaClipboardList className="text-2xl" />}
          >
            <p className="text-sm">Pedido</p>
          </Button>
          <Button
            className={`flex items-center gap-4 p-4 hover:bg-red-500 bg-black text-white h-10 ${
              selectComponent === "devolucion" ? "bg-red-500" : ""
            }`}
            onClick={() => setSelectComponent("devolucion")}
            endContent={<MdAssignmentReturn className="text-2xl" />}
          >
            <p className="text-sm">Devolución</p>
          </Button>
          <Button
            className={`flex items-center gap-4 p-4 hover:bg-red-500 bg-black text-white h-10 ${
              selectComponent === "solicitud_materiales" ? "bg-red-500" : ""
            }`}
            onClick={() => setSelectComponent("solicitud_materiales")}
            endContent={<FaClipboardList className="text-2xl" />}
          >
            <p className="text-sm">Sol. Materiales</p>
          </Button>
          <Button
            className={`flex items-center gap-4 p-4 hover:bg-red-500 bg-black text-white h-10 ${
              selectComponent === "solicitud_contadores" ? "bg-red-500" : ""
            }`}
            onClick={() => setSelectComponent("solicitud_contadores")}
            endContent={<FaClipboardList className="text-2xl" />}
          >
            <p className="text-sm">Sol. Contadores</p>
          </Button>
          <Button
            className={`flex items-center gap-4 p-4 hover:bg-red-500 bg-black text-white h-10 ${
              selectComponent === "solicitud_clacs" ? "bg-red-500" : ""
            }`}
            onClick={() => setSelectComponent("solicitud_clacs")}
            endContent={<FaClipboardList className="text-2xl" />}
          >
            <p className="text-sm">Sol. Clacs</p>
          </Button>
          <Button
            className={`flex items-center gap-4 p-4 hover:bg-red-500 bg-black text-white h-10 ${
              selectComponent === "solicitud_devoluciones" ? "bg-red-500" : ""
            }`}
            onClick={() => setSelectComponent("solicitud_devoluciones")}
            endContent={<FaClipboardList className="text-2xl" />}
          >
            <p className="text-sm">Sol. Devoluciones</p>
          </Button>
        </div>
      </section>
      {selectComponent === "pedidos" && <NuevoPedido userData={userData} />}
      {selectComponent === "devolucion" && <Devolucion userData={userData} />}

      {selectComponent === "solicitud_materiales" && (
        <SolicitudMateriales userData={userData} />
      )}
      {selectComponent === "solicitud_contadores" && (
        <SolicitudContadores userData={userData} />
      )}
      {selectComponent === "solicitud_clacs" && (
        <SolicitudClacs userData={userData} />
      )}
      {selectComponent === "solicitud_devoluciones" && (
        <SolicitudDevoluciones userData={userData} />
      )}
    </div>
  );
};

export default Contadores;
