import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import config from "../../../../../utils/getToken";
import * as XLSX from "xlsx";

const StockMateriales = () => {
  const [materiales, setMateriales] = useState([]);

  const fetchMateriales = () => {
    const url = `${import.meta.env.VITE_URL_API}/material`;

    axios.get(url, config).then((res) => {
      setMateriales(res.data.materiales);
    });
  };

  useEffect(() => {
    fetchMateriales();
  }, []);

  const exportToExcel = () => {
    // Prepara los datos para el archivo Excel
    const data = materiales.map((material) => ({
      MATERIALES: material.descripcion, // Ajusta si necesitas otro valor
      "FAMILIA DE MATERIALES": material.ubicacion,
      "CODIGO DE GOTA": material.codigo,
    }));

    // Crea una nueva hoja de trabajo
    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: ["MATERIALES", "FAMILIA DE MATERIALES", "CODIGO DE GOTA"],
    });

    worksheet["!cols"] = [
      { wch: 30 }, // Ancho de la primera columna (MATERIALES)
      { wch: 100 }, // Ancho de la segunda columna (FAMILIA DE MATERIALES)
      { wch: 30 }, // Ancho de la tercera columna (CODIGO DE GOTA)
    ];

    // Crea un nuevo libro de trabajo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Materiales");

    // Exporta el libro de trabajo
    XLSX.writeFile(workbook, "materiales.xlsx");
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-3">
      <h2 className="font-semibold text-lg">Stock de Materiales</h2>
      <div className="flex items-end justify-between">
        <Button
          size="sm"
          color="success"
          onClick={exportToExcel}
          className="text-white"
        >
          EXPORTAR A EXCEL
        </Button>
      </div>
      <div className="w-full overflow-auto mt-2">
        <Table
          aria-label="Stock de Materiales"
          selectionMode="single"
          color="primary"
          isStriped
          classNames={{
            base: "min-w-full max-h-[80vh] overflow-hidden",
            wrapper: "p-0",
          }}
          radius="xs"
          isCompact={true}
          isHeaderSticky
        >
          <TableHeader>
            <TableColumn>MATERIALES</TableColumn>
            <TableColumn>FAMILIA DE MATERIALES</TableColumn>
            <TableColumn>CODIGO DE GOTA</TableColumn>
          </TableHeader>
          <TableBody>
            {materiales?.map((material) => (
              <TableRow key={material.id}>
                <TableCell className="text-xs ">
                  {material.descripcion}
                </TableCell>
                <TableCell className="text-xs ">{material.ubicacion}</TableCell>
                <TableCell className="text-xs ">{material.codigo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StockMateriales;
