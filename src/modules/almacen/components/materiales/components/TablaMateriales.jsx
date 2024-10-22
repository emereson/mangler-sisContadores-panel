import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import config from "../../../../../utils/getToken";

const TablaMateriales = ({ resetTable }) => {
  const [materiales, setMateriales] = useState([]);
  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/material`;
    axios.get(url, config).then((res) => setMateriales(res.data.materiales));
  }, [resetTable]);

  console.log(materiales);

  return (
    <div className="w-full overflow-hidden">
      <Table
        aria-label="Example static collection table"
        selectionMode="single"
        color="primary"
        isStriped
        classNames={{
          base: "min-w-full max-h-[70vh] overflow-hidden p-4 ",
          wrapper: "p-0",
        }}
        radius="xs"
        isCompact={true}
        isHeaderSticky
      >
        <TableHeader>
          <TableColumn>CODIGO</TableColumn>
          <TableColumn>DESCRIPCION</TableColumn>
          <TableColumn>CATEGORÌA</TableColumn>
          <TableColumn>ESTADO</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody>
          {materiales?.map((material) => (
            <TableRow
              key={material.id}
              onClick={() => setselectmaterial(material)}
            >
              <TableCell className="text-xs minw-[100px]">
                {material.codigo}{" "}
              </TableCell>

              <TableCell className="text-xs">{material?.descripcion}</TableCell>
              <TableCell className="text-xs">{material?.ubicacion}</TableCell>
              <TableCell className="text-xs ">{material?.status}</TableCell>
              <TableCell>
                <div className="relative flex items-center">
                  <Tooltip content="Editar">
                    <span
                      onClick={() => {}}
                      className="w-10 text-xl text-blue-700 cursor-pointer active:opacity-50"
                    >
                      <MdEdit />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Eliminar">
                    <span
                      onClick={() => {
                        //   setSelectedUser(user);
                        //   setSelectedModal("delete");
                        //   onOpen();
                      }}
                      className="text-xl text-danger cursor-pointer active:opacity-50"
                    >
                      <FaTrashAlt />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablaMateriales;
