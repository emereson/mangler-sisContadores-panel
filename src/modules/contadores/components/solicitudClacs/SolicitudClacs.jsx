import React, { useEffect, useState } from "react";
import getTodayDate from "../../../../hooks/getTodayDate";
import axios from "axios";
import { Button, Input } from "@nextui-org/react";
import config from "../../../../utils/getToken";
import * as XLSX from "xlsx";
import formatDate from "../../../../hooks/FormatDate";
import TablaSolicitudClacs from "./components/TablaSolicitudClacs";

const SolicitudClacs = ({ userData }) => {
  const [fechaInicio, setfechaInicio] = useState(getTodayDate());
  const [fechaFinal, setfechaFinal] = useState(getTodayDate());
  const [pedidos, setPedidos] = useState();

  const fetchPedidos = () => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/pedido?fecha_inicio=${fechaInicio}&fecha_final=${fechaFinal}`;

    axios.get(url, config).then((res) => {
      setPedidos(res.data.pedidos);
    });
  };

  console.log(pedidos);

  useEffect(() => {
    fetchPedidos();
  }, []);
  const exportToExcel = () => {
    // Prepara los datos para el archivo Excel
    const data = pedidos?.flatMap((pedido) =>
      pedido.clacs.map((clac) => ({
        ACTIVIDAD: "A", // Ajusta si necesitas otro valor
        FECHA: formatDate(pedido?.fecha),
        NUM_PEDIDO: pedido.id,
        MOTIVO: "SALIDA POR CONSUMO", // Ajusta si necesitas otro valor
        NUM_VALE: pedido.num_vale || "0",
        BASE: "MADRID", // Ajusta si necesitas otro valor
        OPE_CODIGO: pedido.user.codigo,
        OPE_NOMBRE: `${pedido.user.nombre} ${pedido.user.apellidos}`,
        SERIE: clac.codigo,
      }))
    );

    // Crea una nueva hoja de trabajo
    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: [
        "ACTIVIDAD",
        "FECHA",
        "NUM_PEDIDO",
        "MOTIVO",
        "NUM_VALE",
        "BASE",
        "OPE_CODIGO",
        "OPE_NOMBRE",
        "SERIE",
      ],
    });

    // Crea un nuevo libro de trabajo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clacs");

    // Exporta el libro de trabajo
    XLSX.writeFile(workbook, "clacs.xlsx");
  };

  return (
    <div className="w-full  h-full p-4 flex flex-col gap-3">
      <h2 className="font-semibold text-lg">Solicitud Clacs</h2>
      <div className="flex  items-end justify-between">
        <div className="flex gap-4 items-end">
          <Input
            classNames={{
              inputWrapper: ["border-neutral-500  bg-white"],
            }}
            isRequired
            type="date"
            label="Fecha de inicio"
            id="fecha_inicio"
            labelPlacement="outside"
            variant="bordered"
            size="sm"
            className="max-w-48"
            value={fechaInicio}
            onChange={(e) => setfechaInicio(e.target.value)}
          />
          <Input
            classNames={{
              inputWrapper: ["border-neutral-500  bg-white"],
            }}
            isRequired
            type="date"
            label="Fecha final"
            labelPlacement="outside"
            id="fecha_final"
            variant="bordered"
            size="sm"
            className="max-w-48"
            value={fechaFinal}
            onChange={(e) => setfechaFinal(e.target.value)}
          />
          <Button size="sm" color="primary" onClick={fetchPedidos}>
            Actualizar
          </Button>
        </div>

        <Button
          size="sm"
          color="success"
          onClick={exportToExcel}
          className="text-white"
        >
          EXEL
        </Button>
      </div>
      <TablaSolicitudClacs pedidos={pedidos} />
    </div>
  );
};

export default SolicitudClacs;
