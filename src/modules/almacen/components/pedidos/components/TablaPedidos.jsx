import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import formatDate from "../../../../../hooks/FormatDate";

const TablaPedidos = ({ pedidos, setPedidoSeleccionado }) => {
  return (
    <div className="w-full overflow-auto mt-2">
      <Table
        aria-label="Example static collection table"
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
          <TableColumn>FECHA</TableColumn>
          <TableColumn>PEDIDO</TableColumn>
          <TableColumn>ACTIVIDAD</TableColumn>
          <TableColumn>CODIGO</TableColumn>
          <TableColumn>OPERARIO</TableColumn>
          <TableColumn>ESTADO</TableColumn>
          <TableColumn>NUME_VALE</TableColumn>
        </TableHeader>
        <TableBody>
          {pedidos?.map((pedido) => (
            <TableRow
              key={pedido.id}
              onClick={() => setPedidoSeleccionado(pedido)}
            >
              <TableCell className="text-xs ">
                {formatDate(pedido?.fecha)}
              </TableCell>
              <TableCell className="text-xs">{pedido?.id}</TableCell>
              <TableCell className="text-xs ">{pedido?.actividad}</TableCell>
              <TableCell className="text-xs ">{pedido?.user.codigo}</TableCell>
              <TableCell className="text-xs min-w-[150px]">
                {pedido?.user.nombre} {pedido?.user.apellidos}
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
              <TableCell className="text-xs ">
                {pedido?.estado === "pendiente" || pedido?.estado === "anulado"
                  ? null
                  : pedido?.num_vale}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablaPedidos;
