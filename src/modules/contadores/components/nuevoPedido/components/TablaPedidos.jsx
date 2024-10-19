import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import axios from "axios";
import React from "react";
import { MdPlaylistRemove } from "react-icons/md";
import config from "../../../../../utils/getToken";
import { toast } from "sonner";

const TablaPedidos = ({ arraySelected, setArraySelected }) => {
  const handleRemove = (indexToRemove) => {
    // Filtrar el array eliminando el producto de lista_materiales con el índice seleccionado
    const updatedListaMateriales = arraySelected.lista_materiales.filter(
      (_, index) => index !== indexToRemove
    );

    setArraySelected({
      ...arraySelected,
      lista_materiales: updatedListaMateriales,
    });
  };

  const submit = () => {
    if (arraySelected.lista_materiales.length === 0) {
      toast.error("no hay ningun producto en la lista ");
    } else {
      const url = `${import.meta.env.VITE_URL_API}/pedido`;

      axios
        .post(url, arraySelected, config)
        .then((res) => {
          toast.success("El pedido  se creó correctamente"),
            setArraySelected({ ...arraySelected, lista_materiales: [] });
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="w-full overflow-hidden flex flex-col items-end ">
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
          <TableColumn>MATERIAL</TableColumn>
          <TableColumn>CANTIDAD</TableColumn>
          <TableColumn>QUITAR</TableColumn>
        </TableHeader>
        <TableBody>
          {arraySelected?.lista_materiales.map((producto, index) => (
            <TableRow key={index}>
              <TableCell className="text-xs">
                {producto.producto.split(" - ")[0]}
              </TableCell>

              <TableCell className="text-xs">
                {producto.producto.split(" - ")[1]}
              </TableCell>
              <TableCell className="text-xs">{producto?.cantidad}</TableCell>
              <TableCell className="text-xs">
                <Tooltip content="Quitar de la lista">
                  <span
                    onClick={() => handleRemove(index)}
                    className="w-10 text-xl text-red-500 cursor-pointer active:opacity-50"
                  >
                    <MdPlaylistRemove />
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={submit} color="success" size="sm">
        GUARDAR PEDIDO
      </Button>
    </div>
  );
};

export default TablaPedidos;
