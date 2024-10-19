import React, { useRef } from "react";
import Barcode from "react-barcode";
import html2pdf from "html2pdf.js";
import { Button } from "@nextui-org/react";

const PreviewPedidos = ({ pedidoSeleccionado }) => {
  const contentRef = useRef();

  const downloadPDF = () => {
    const element = contentRef.current;
    const options = {
      margin: 0.1,
      marginBottom: 3, // Márgenes del PDF
      filename: "manifiesto.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" }, // Formato horizontal
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="w-1/2 border-2 border-zinc-400 p-2">
      <Button onClick={downloadPDF}>Descargar PDF</Button>
      <div className="w-full flex flex-col" ref={contentRef}>
        <div className="w-full flex items-center justify-between">
          <img className="w-360 h-20" src="/acciona.png" alt="" />
          <h2 className="text-center text-xl font-extrabold">
            PEDIDO DE <br /> MATERIALES
          </h2>
          <div className="flex flex-col">
            <div className="flex ">
              <p className="text-xs  pb-3">N° Vale</p>
              <Barcode
                value={pedidoSeleccionado?.num_vale || "000"}
                format="CODE128"
                width={1}
                height={30}
                displayValue={true}
                fontSize={10}
              />
            </div>
            <div className="flex">
              <p className="text-xs pb-3">N° DNI</p>
              <Barcode
                value={pedidoSeleccionado?.user.dni || "000"}
                format="CODE128"
                width={1}
                height={30}
                displayValue={true}
                fontSize={10}
              />
            </div>
          </div>
        </div>
        <div className="border-1 border-black p-3 flex justify-start gap-4">
          <div className="flex flex-col gap-2 items-end">
            <div className="flex gap-1 ">
              <label className="text-xs  pb-3">Base</label>{" "}
              <div
                className="border-1 border-black px-2 pb-3 text-xs text-center"
                style={{ width: "150px" }}
              >
                MADRID
              </div>
            </div>
            <div className="flex gap-1 ">
              <label className="text-xs  pb-3">Cod Op.</label>{" "}
              <div
                className="border-1 border-black px-2 pb-3  text-xs text-center"
                style={{ width: "150px" }}
              >
                {pedidoSeleccionado?.user.codigo}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-start">
              <div className="flex gap-1 ">
                <label className="text-xs  pb-3">N° {"  . "} Vale</label>{" "}
                <div
                  className="border-1 border-black px-2 pb-3   text-xs text-center"
                  style={{ width: "150px" }}
                >
                  {pedidoSeleccionado?.num_vale || ""}
                </div>
              </div>
              <div className="flex gap-1">
                <label className="text-xs  pb-3">Fecha</label>{" "}
                <div
                  className="border-1 border-black px-2 pb-3   text-xs text-center"
                  style={{ width: "150px" }}
                >
                  {pedidoSeleccionado?.fecha}
                </div>
              </div>
            </div>
            <div className="flex gap-1 ">
              <label className="text-xs  pb-3">Operario</label>{" "}
              <div
                className="w-full border-1 border-black px-2 pb-3 text-xs text-center"
                style={{ width: "300px" }}
              >
                {`${pedidoSeleccionado?.user?.nombre} ${pedidoSeleccionado?.user?.apellidos}`}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-4 text-xs text-gray-700 font-bold uppercase">
            Materiales
          </span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <div className="w-full flex gap-4">
          <table className="table-auto border-collapse border border-gray-300">
            <thead className="text-xs">
              <tr className="bg-zinc-200 text-gray-700">
                <th className="border border-gray-300 px-2 pb-3 text-left">
                  Ubicación
                </th>
                <th className="border border-gray-300 px-2  pb-3 text-left">
                  Código
                </th>
                <th className="border border-gray-300 px-2  pb-3 text-left">
                  Descripción
                </th>
                <th className="border border-gray-300 px-2  pb-3 text-left">
                  Cantidad
                </th>
              </tr>
            </thead>

            <tbody className="text-xs">
              {pedidoSeleccionado?.lista_pedidos.map((pedido) => (
                <tr className="bg-white hover:bg-gray-100" key={pedido.id}>
                  <td className="border border-gray-300  pb-3 px-2 ">
                    {pedido.materiale.ubicacion}
                  </td>
                  <td className="border border-gray-300  pb-3 px-2 ">
                    {pedido.materiale.codigo}
                  </td>
                  <td className="border border-gray-300   pb-3 px-2 ">
                    {pedido.materiale.descripcion}
                  </td>
                  <td className="border border-gray-300  pb-3 px-2 ">
                    {pedido.cantidad}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="table-auto border-collapse border border-gray-300">
            <thead className="text-xs">
              <tr className="bg-zinc-200 text-gray-700">
                <th className="border border-gray-300 px-2   pb-3 text-left">
                  N
                </th>
                <th className="border border-gray-300 px-2  pb-3 text-left">
                  MEDIDORES
                </th>
              </tr>
            </thead>

            <tbody className="text-xs">
              {pedidoSeleccionado?.lista_pedidos.map((pedido, index) => (
                <tr
                  className="bg-white hover:bg-gray-100"
                  key={`medidor${index}`}
                >
                  <td className="border border-gray-300 px-2  pb-3">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-2  pb-3">
                    {pedido.materiale.codigo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="table-auto border-collapse border border-gray-300">
            <thead className="text-xs">
              <tr className="bg-zinc-200 text-gray-700">
                <th className="border border-gray-300 px-2  pb-3 text-left">
                  N
                </th>
                <th className="border border-gray-300 px-2  pb-3 text-left">
                  CLACK
                </th>
              </tr>
            </thead>

            <tbody className="text-xs">
              {pedidoSeleccionado?.lista_pedidos.map((pedido, index) => (
                <tr
                  className="bg-white hover:bg-gray-100"
                  key={`medidor${index}`}
                >
                  <td className="border border-gray-300 px-2  pb-3">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-2  pb-3">
                    {pedido.materiale.codigo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PreviewPedidos;
