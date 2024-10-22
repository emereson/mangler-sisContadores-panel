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

const TablaSolicitudDevoluciones = ({ pedidos }) => {
  console.log(pedidos);

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
          <TableColumn>ACTIVIDAD</TableColumn>
          <TableColumn>FECHA</TableColumn>
          <TableColumn>NUM_PEDIDO</TableColumn>
          <TableColumn>MOTIVO</TableColumn>
          <TableColumn>NUM_VALE</TableColumn>
          <TableColumn>BASE</TableColumn>
          <TableColumn>OPE_CODIGO</TableColumn>
          <TableColumn>OPE_NOMBRE</TableColumn>
        </TableHeader>
        <TableBody>
          {pedidos?.map((pedido) =>
            pedido.lista_pedidos.map((material) => (
              <TableRow
                key={material.id}
                onClick={() => setPedidoSeleccionado(pedido)}
              >
                <TableCell className="text-xs ">A </TableCell>
                <TableCell className="text-xs">
                  {" "}
                  {formatDate(pedido?.fecha)}
                </TableCell>
                <TableCell className="text-xs ">{pedido.id}</TableCell>
                <TableCell className="text-xs ">SALIDA POR CONSUMO</TableCell>
                <TableCell className="text-xs ">{pedido.num_vale}</TableCell>
                <TableCell>MADRID</TableCell>
                <TableCell className="text-xs ">{pedido.user.codigo}</TableCell>
                <TableCell className="text-xs ">
                  {pedido.user.nombre} {pedido.user.apellidos}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablaSolicitudDevoluciones;
