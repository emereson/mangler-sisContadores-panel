import React, { useState } from "react";
import { toast } from "sonner";

const ContadoresYClacs = ({
  barcodeInputRef,
  barcodeClacInputRef,
  tipoContadores,
  scannedCodesClack,
  setScannedCodesClack,
  scannedCodes,
  setScannedCodes,
}) => {
  const [activeContador, setActiveContador] = useState(null);
  const [activeClack, setActiveClack] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [barcodeCLac, setBarcodeClac] = useState("");
  const handleKeyDown = (e, contador) => {
    e.preventDefault();
    if (e.key === "Enter") {
      const total =
        tipoContadores.find((c) => c.contador === contador)?.total || 0;
      const currentScans =
        scannedCodes?.find((c) => c.contador === contador)?.codigos || [];

      // Verificar si el código ya fue escaneado
      if (currentScans.includes(barcode)) {
        toast.error(`El código ${barcode} ya fue escaneado para ${contador}.`);
        setBarcode(""); // Limpiar el campo de código de barras
        return;
      }

      if (barcode && currentScans.length < total) {
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
      } else if (currentScans.length >= total) {
        toast.error(`Se ha alcanzado el total de escaneos para ${contador}.`);
      }
    } else {
      setBarcode((prevBarcode) => prevBarcode + e.key);
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

  return (
    <>
      <div className="h-full flex flex-wrap gap-4">
        {tipoContadores.map((contadores, index) => (
          <div
            key={index}
            onClick={() => {
              setActiveContador(contadores.contador), setActiveClack(false);
            }}
            className={`flex-col border-2 rounded-xl transition-all duration-500 cursor-pointer p-2 w-[150px] gap-2 ${
              activeContador === contadores.contador
                ? "border-blue-500"
                : "border-zinc-300"
            }`}
            style={
              contadores.total === 0 ? { display: "none" } : { display: "flex" }
            }
          >
            <h4 className="text-sm border-b-1 border-black">
              Contadores <b className="text-blue-500">{contadores.contador}</b>
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
                scannedCodes?.find((c) => c.contador === contadores.contador)
                  ?.codigos || []
              ).map((code, codeIndex) => (
                <p
                  key={codeIndex}
                  className="text-xs border-t-1 pt-1"
                  onClick={() => handleCodeClick(contadores.contador, code)} // Agregar el manejador de clic
                >
                  {code}
                </p>
              ))}
              <p className="text-center border-t-1 pt-1">
                <b className="text-red-500">
                  {scannedCodes?.find((c) => c.contador === contadores.contador)
                    ?.codigos.length || 0}{" "}
                </b>
                de {contadores.total}
              </p>
            </div>
          </div>
        ))}
      </div>
      {(tipoContadores[0]?.total > 0 ||
        tipoContadores[1]?.total > 0 ||
        tipoContadores[2]?.total > 0 ||
        tipoContadores[3]?.total > 0 ||
        tipoContadores[4]?.total > 0 ||
        tipoContadores[5]?.total > 0) && (
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
                onClick={() => handleCodeClacClick(contadores.contador, code)} // Llamar manejador de clic
              >
                {code}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ContadoresYClacs;
