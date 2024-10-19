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
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import config from "../../../../../utils/getToken";

const ConfirmarPedidoModal = ({
  onOpenChange,
  isOpen,
  pedidoSeleccionado,
  fetchPedidos,
}) => {
  const [loading, setLoading] = useState(false);
  const [tipoContadores, setTipoContadores] = useState([]);
  const [barcode, setBarcode] = useState("");
  const [barcodeCLac, setBarcodeClac] = useState("");
  const [scannedCodes, setScannedCodes] = useState([]);
  const [scannedCodesClack, setScannedCodesClack] = useState([]);
  const [activeContador, setActiveContador] = useState(null);
  const [activeClack, setActiveClack] = useState(false);

  const barcodeInputRef = useRef(null);
  const barcodeClacInputRef = useRef(null);

  const handleKeyDown = (e, contador) => {
    e.preventDefault();
    if (e.key === "Enter") {
      const total =
        tipoContadores.find((c) => c.contador === contador)?.total || 0;
      const currentScans =
        scannedCodes.find((c) => c.contador === contador)?.codigos.length || 0;

      if (barcode && currentScans < total) {
        setScannedCodes((prevCodes) => {
          const existingEntry = prevCodes.find((c) => c.contador === contador);
          if (existingEntry) {
            // Si ya existe, agrega el nuevo código
            return prevCodes.map((c) =>
              c.contador === contador
                ? { ...c, codigos: [...c.codigos, barcode] }
                : c
            );
          } else {
            // Si no existe, crea una nueva entrada
            return [...prevCodes, { contador, codigos: [barcode] }];
          }
        });
        toast.success(`Código escaneado para ${contador}: ${barcode}`);
        setBarcode("");
      } else if (currentScans >= total) {
        toast.error(`Se ha alcanzado el total de escaneos para ${contador}.`);
      }
    } else {
      setBarcode((prevBarcode) => prevBarcode + e.key);
    }
  };

  useEffect(() => {
    if (isOpen) {
      barcodeInputRef.current?.focus();
    }
    setScannedCodes([]);
    setScannedCodesClack([]);
  }, [isOpen]);

  useEffect(() => {
    if (pedidoSeleccionado) {
      const acumuladores = {
        15: 0,
        20: 0,
        25: 0,
        30: 0,
        40: 0,
        50: 0,
      };

      pedidoSeleccionado.lista_pedidos?.forEach((pedido) => {
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
  }, [pedidoSeleccionado]);

  const handleConfirmarDespacho = async () => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_URL_API}/contador/${
        pedidoSeleccionado.id
      }`;

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

  const handleCodeClick = (contador, codeToRemove) => {
    setScannedCodes((prevCodes) =>
      prevCodes
        .map((entry) =>
          entry.contador === contador
            ? {
                ...entry,
                codigos: entry.codigos.filter((code) => code !== codeToRemove),
              }
            : entry
        )
        .filter((entry) => entry.codigos.length > 0)
    );
    toast.success(`Código ${codeToRemove} eliminado.`);
  };

  const handleBarcodeChange = (event) => {
    setBarcodeClac(event.target.value);
  };

  // Función para agregar el código escaneado a la lista
  const handleAddScannedCode = () => {
    if (barcodeCLac) {
      setScannedCodesClack((prevCodes) => [...prevCodes, barcodeCLac]);
      setBarcodeClac("");
    }
  };
  // Función para manejar el clic en un código escaneado
  const handleCodeClacClick = (contador, code) => {
    setScannedCodesClack((prevCodes) =>
      prevCodes.filter((item) => item !== code)
    );
  };

  console.log(scannedCodesClack);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="min-h-[90vh]"
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
                        <TableRow key={pedidoSeleccionado.id}>
                          <TableCell className="text-xs">
                            {pedidoSeleccionado.fecha}
                          </TableCell>
                          <TableCell className="text-xs">
                            {pedidoSeleccionado.id}
                          </TableCell>
                          <TableCell className="text-xs ">
                            {pedidoSeleccionado.actividad}
                          </TableCell>
                          <TableCell className="text-xs">
                            {pedidoSeleccionado.estado}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex flex-col gap-0">
                    <h3 className="text-sm">Lista de los Materiales pedidos</h3>
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
                        {pedidoSeleccionado?.lista_pedidos.map((material) => (
                          <TableRow key={`material-${material.id}`}>
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
                <div className="h-full flex flex-wrap gap-4">
                  {tipoContadores.map((contadores, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setActiveContador(contadores.contador),
                          setActiveClack(false);
                      }}
                      className={`flex-col border-2 rounded-xl transition-all duration-500 cursor-pointer p-2 w-[150px] gap-2 ${
                        activeContador === contadores.contador
                          ? "border-blue-500"
                          : "border-zinc-300"
                      }`}
                      style={
                        contadores.total === 0
                          ? { display: "none" }
                          : { display: "flex" }
                      }
                    >
                      <h4 className="text-sm border-b-1 border-black">
                        Contadores{" "}
                        <b className="text-blue-500">{contadores.contador}</b>
                      </h4>

                      <div className="flex flex-col gap-2">
                        <input
                          id={`contadorInput${contadores.contador}`}
                          className="none"
                          ref={barcodeInputRef}
                          type="text"
                          value={barcode}
                          onKeyDown={(e) =>
                            activeContador === contadores.contador &&
                            handleKeyDown(e, contadores.contador)
                          }
                        />
                        <h5 className="text-xs">SERIE :</h5>
                        {(
                          scannedCodes.find(
                            (c) => c.contador === contadores.contador
                          )?.codigos || []
                        ).map((code, codeIndex) => (
                          <p
                            key={codeIndex}
                            className="text-xs border-t-1 pt-1"
                            onClick={() =>
                              handleCodeClick(contadores.contador, code)
                            } // Agregar el manejador de clic
                          >
                            {code}
                          </p>
                        ))}
                        <p className="text-center border-t-1 pt-1">
                          <b className="text-red-500">
                            {scannedCodes.find(
                              (c) => c.contador === contadores.contador
                            )?.codigos.length || 0}{" "}
                          </b>
                          de {contadores.total}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  onClick={() => {
                    setActiveClack(true);
                    setActiveContador(null); // Asegúrate de definir 'setActiveContador'
                  }}
                  className={`flex-col border-2 rounded-xl transition-all duration-500 cursor-pointer p-2 w-[150px] gap-2 ${
                    activeClack ? "border-blue-500" : "border-zinc-300"
                  }`}
                >
                  <h4 className="text-sm border-b-1 border-black">Clac</h4>
                  <div className="flex flex-col gap-2">
                    <input
                      id={`clac`}
                      className="none"
                      ref={barcodeClacInputRef}
                      type="text"
                      value={barcodeCLac}
                      onChange={handleBarcodeChange} // Manejar cambios en la entrada
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleAddScannedCode(); // Agregar código al presionar Enter
                          event.preventDefault(); // Evitar el comportamiento predeterminado
                        }
                      }}
                      placeholder="Escanea o ingresa un código" // Opcional: Placeholder para el input
                    />
                    <h5 className="text-xs">SERIE :</h5>
                    {scannedCodesClack.map((code, codeIndex) => (
                      <p
                        key={codeIndex}
                        className="text-xs border-t-1 pt-1 cursor-pointer"
                        onClick={() =>
                          handleCodeClacClick(contadores.contador, code)
                        } // Llamar manejador de clic
                      >
                        {code}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmarPedidoModal;
