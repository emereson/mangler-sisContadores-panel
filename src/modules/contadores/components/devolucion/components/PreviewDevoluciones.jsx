import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import config from "../../../../../utils/getToken";
import formatDate from "../../../../../hooks/FormatDate";
import { MdDeleteForever } from "react-icons/md";
import AnularPedidoModal from "../../../../almacen/components/pedidos/components/AnularPedidoModal";

const PreviewDevoluciones = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [pedidos, setPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  // Función para obtener los pedidos
  const fetchPedidos = () => {
    const url = `${import.meta.env.VITE_URL_API}/pedido/devolucion`;

    axios.get(url, config).then((res) => {
      setPedidos(res.data.pedidos);
    });
  };

  // Cargar los pedidos al montar el componente
  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div className="min-w-[60%] overflow-hidden">
      {/* Botón para actualizar la lista */}
      <Button className="ml-4" color="warning" size="sm" onClick={fetchPedidos}>
        Actualizar Lista
      </Button>

      <Table
        aria-label="Example static collection table"
        selectionMode="single"
        color="primary"
        isStriped
        classNames={{
          base: "min-w-full max-h-[80] overflow-hidden p-4 ",
          wrapper: "p-0",
        }}
        radius="xs"
        isCompact={true}
        isHeaderSticky
      >
        <TableHeader>
          <TableColumn>FECHA</TableColumn>
          <TableColumn>PEDIDO</TableColumn>
          <TableColumn>ACTIVIDAD</TableColumn>
          <TableColumn>OPERARIO</TableColumn>
          <TableColumn>ESTADO</TableColumn>
          <TableColumn className="text-center">
            ANULAR <br /> PEDIDO
          </TableColumn>
        </TableHeader>
        <TableBody>
          {pedidos?.map((pedido) => (
            <TableRow key={pedido?.id}>
              <TableCell className="text-xs ">
                {formatDate(pedido?.fecha)}
              </TableCell>
              <TableCell className="text-xs">{pedido?.id}</TableCell>
              <TableCell className="text-xs ">{pedido?.actividad}</TableCell>
              <TableCell className="text-xs">
                {pedido?.user?.nombre} {pedido?.user?.apellidos}
              </TableCell>
              <TableCell
                className={`text-xs ${
                  pedido?.estado === "pendiente"
                    ? "text-orange-500"
                    : pedido?.estado === "anulado"
                    ? "text-red-500"
                    : "text-green-500"
                } `}
              >
                {pedido?.estado}
              </TableCell>
              <TableCell>
                <Tooltip content="Anular Pedido">
                  <span
                    onClick={() => {
                      setPedidoSeleccionado(pedido);
                      onOpen();
                    }}
                    className="w-10 text-xl text-red-500 cursor-pointer active:opacity-50 "
                  >
                    <MdDeleteForever className="m-auto" />
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AnularPedidoModal
        pedidoSeleccionado={pedidoSeleccionado}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        fetchPedidos={fetchPedidos}
      />
    </div>
  );
};

export default PreviewDevoluciones;
