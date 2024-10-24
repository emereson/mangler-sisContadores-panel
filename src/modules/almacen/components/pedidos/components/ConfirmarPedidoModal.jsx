import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Spinner,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import config from "../../../../../utils/getToken";
import ContadoresYClacs from "./components-confirmarPedido/ContadoresYClacs";
import { useForm } from "react-hook-form";

const ConfirmarPedidoModal = ({
  onOpenChange,
  isOpen,
  pedidoSeleccionado,
  fetchPedidos,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [tipoContadores, setTipoContadores] = useState([]);
  const [scannedCodes, setScannedCodes] = useState([]);
  const [scannedCodesClack, setScannedCodesClack] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [pedido, setPedido] = useState(null);
  const barcodeInputRef = useRef(null);
  const barcodeClacInputRef = useRef(null);

  const getPedido = () => {
    const url = `${import.meta.env.VITE_URL_API}/pedido/${
      pedidoSeleccionado?.id
    }`;

    axios.get(url, config).then((res) => {
      setPedido(res.data.pedido);
    });
  };

  useEffect(() => {
    getPedido();
    if (isOpen) {
      barcodeInputRef.current?.focus();
    }
    setScannedCodes([]);
    setScannedCodesClack([]);
  }, [isOpen, pedidoSeleccionado]);

  useEffect(() => {
    if (pedido) {
      const acumuladores = {
        15: 0,
        20: 0,
        25: 0,
        30: 0,
        40: 0,
        50: 0,
      };

      pedido.lista_pedidos?.forEach((pedido) => {
        const descripcion = pedido?.materiale?.descripcion;

        if (descripcion?.includes("15 MM")) {
          acumuladores[15] += pedido.cantidad;
        }
        if (descripcion?.includes("20 MM")) {
          acumuladores[20] += pedido.cantidad;
        }
        if (descripcion?.includes("25 MM")) {
          acumuladores[25] += pedido.cantidad;
        }
        if (descripcion?.includes("30 MM")) {
          acumuladores[30] += pedido.cantidad;
        }
        if (descripcion?.includes("40 MM")) {
          acumuladores[40] += pedido.cantidad;
        }
        if (descripcion?.includes("> 50 MM")) {
          acumuladores[50] += pedido.cantidad;
        }
      });

      const resultado = Object.keys(acumuladores).map((key) => ({
        contador: key,
        total: acumuladores[key],
      }));

      setTipoContadores(resultado);
    }
  }, [pedido]);

  const handleConfirmarDespacho = async () => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_URL_API}/contador/${pedido.id}`;

      axios
        .post(
          url,
          { array_codes: scannedCodes, array_clacks: scannedCodesClack },
          config
        )
        .then((res) => {
          toast.success("El pedido se despacho correctamente");
          onOpenChange(false);
          fetchPedidos();
        })
        .catch((err) => {
          toast.error("Hubo un error al despachar el pedido");
        });
    } finally {
      setLoading(false);
    }
  };

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/lista-pedido/${
      selectedMaterial?.id
    }`;

    axios.patch(url, data, config).then((res) => {
      getPedido();
      setSelectedMaterial(null);
    });
  };

  console.log(selectedMaterial);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="max-h-[80vh] min-h-[80vh] overflow-auto"
      size="5xl"
    >
      {loading && (
        <div className="fixed top-0 left-0 z-[100] min-w-[100vw] min-h-screen bg-[#020202ce] flex items-center justify-center">
          <Spinner label="Cargando..." color="success" />
        </div>
      )}
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="py-8">
              <div className="w-full h-full flex gap-4 justify-around">
                <div className="flex flex-col gap-4">
                  <Button
                    color="success"
                    size="sm"
                    onClick={handleConfirmarDespacho}
                  >
                    Confirmar Despacho
                  </Button>
                  <div className="flex flex-col gap-0">
                    <h3 className="text-sm">Dato del pedido</h3>
                    <Table
                      aria-label="Example static collection tableww"
                      selectionMode="single"
                      color="primary"
                      isStriped
                      classNames={{
                        base: "min-w-full max-h-[70vh] overflow-hidden p-1",
                        wrapper: "p-0",
                      }}
                      radius="xs"
                      isCompact={true}
                      isHeaderSticky
                    >
                      <TableHeader>
                        <TableColumn className="text-xs">FECHA</TableColumn>
                        <TableColumn className="text-xs">PEDIDO</TableColumn>
                        <TableColumn className="text-xs">ACTIVIDAD</TableColumn>
                        <TableColumn className="text-xs">ESTADO</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow key={pedido?.id}>
                          <TableCell className="text-xs">
                            {pedido?.fecha}
                          </TableCell>
                          <TableCell className="text-xs">
                            {pedido?.id}
                          </TableCell>
                          <TableCell className="text-xs ">
                            {pedido?.actividad}
                          </TableCell>
                          <TableCell className="text-xs">
                            {pedido?.estado}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm">Lista de los Materiales pedidos</h3>
                    {selectedMaterial && (
                      <form
                        action=""
                        onSubmit={handleSubmit(submit)}
                        className="flex gap-2 items-end"
                        key={selectedMaterial?.id}
                      >
                        <Input
                          classNames={{
                            inputWrapper: ["border-neutral-400"],
                          }}
                          type="text"
                          label="Código"
                          id="codigo"
                          size="sm"
                          value={selectedMaterial?.materiale.codigo}
                          labelPlacement="outside"
                          variant="bordered"
                          isInvalid={!!errors?.codigo}
                          color={errors?.codigo ? "danger" : ""}
                          errorMessage={errors?.codigo?.message}
                        />

                        {/* Campo Descripcion */}
                        <Input
                          classNames={{
                            inputWrapper: ["border-neutral-400 "],
                          }}
                          defaultValue={selectedMaterial?.cantidad}
                          type="number"
                          label="Cantidad"
                          id="descripcion"
                          {...register("cantidad")}
                          size="sm"
                          labelPlacement="outside"
                          variant="bordered"
                          isInvalid={!!errors?.descripcion}
                          color={errors?.descripcion ? "danger" : ""}
                          errorMessage={errors?.descripcion?.message}
                        />

                        <Button
                          type="submit"
                          color="danger"
                          className="w-40 "
                          size="sm"
                        >
                          Guardar
                        </Button>
                      </form>
                    )}
                    <Table
                      aria-label="Example static collection table ssa"
                      selectionMode="single"
                      color="primary"
                      classNames={{
                        base: "min-w-full max-h-[70vh] overflow-hidden p-1 ",
                        wrapper: "p-0",
                      }}
                      radius="xs"
                      isCompact={true}
                      isHeaderSticky
                    >
                      <TableHeader>
                        <TableColumn className="text-xs">ID</TableColumn>
                        <TableColumn className="text-xs">
                          COD_MATERIAL
                        </TableColumn>
                        <TableColumn className="text-xs">MATERIAL</TableColumn>
                        <TableColumn className="text-xs">CANTIDAD</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {pedido?.lista_pedidos.map((material) => (
                          <TableRow
                            key={`material-${material.id}`}
                            onClick={() => setSelectedMaterial(material)}
                          >
                            <TableCell className="text-xs">
                              {material.materiale.id}
                            </TableCell>
                            <TableCell className="text-xs">
                              {material.materiale.codigo}
                            </TableCell>
                            <TableCell className="text-xs">
                              {material.materiale.descripcion}
                            </TableCell>
                            <TableCell className="text-xs ">
                              {material.cantidad}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <ContadoresYClacs
                  barcodeInputRef={barcodeInputRef}
                  barcodeClacInputRef={barcodeClacInputRef}
                  tipoContadores={tipoContadores}
                  scannedCodesClack={scannedCodesClack}
                  setScannedCodesClack={setScannedCodesClack}
                  scannedCodes={scannedCodes}
                  setScannedCodes={setScannedCodes}
                />
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmarPedidoModal;
