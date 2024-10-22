import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import config from "../../../../utils/getToken";
import getTodayDate from "../../../../hooks/getTodayDate";
import PreviewDevoluciones from "./components/PreviewDevoluciones";
import TablaDevolucion from "./components/TablaDevolucion";

const Devolucion = ({ userData }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [operarios, setOperarios] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [selectOperario, setselectOperario] = useState();
  const [selectMaterial, setSelectMaterial] = useState();
  const [fecha, setFecha] = useState(getTodayDate());
  const [arraySelected, setArraySelected] = useState({
    fecha: fecha,
    supervisor: `${userData.nombre} ${userData.apellidos}`,
    operario_id: "",
    lista_materiales: [],
  });

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/user/operarios`;

    axios.get(url, config).then((res) => {
      setOperarios(res.data.users);
    });
  }, []);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/material`;

    axios.get(url, config).then((res) => {
      setMateriales(res.data.materiales);
    });
  }, []);

  const submit = (data) => {
    const nuevoMaterial = {
      id_material: selectMaterial,
      producto: data.producto,
      cantidad: data.cantidad,
    };

    // Actualiza arraySelected
    setArraySelected((prevArray) => ({
      fecha: fecha,
      supervisor: `${userData.nombre} ${userData.apellidos}`,
      operario_id: selectOperario,
      lista_materiales: [...prevArray.lista_materiales, nuevoMaterial],
    }));

    reset();
  };

  return (
    <div className="w-full  h-full p-4 flex">
      <div className="w-1/2 pr-4  h-full">
        <div className="w-full flex justify-between ">
          <section className="w-full flex flex-col   gap-4 ">
            <h2 className="font-semibold text-lg">Devolucion de Materiales</h2>
            <Input
              className="w-40"
              classNames={{
                inputWrapper: ["border-neutral-600"],
              }}
              labelPlacement="outside"
              type="date"
              variant="bordered"
              label="Fecha"
              defaultValue={getTodayDate()}
              onChange={(e) => setFecha(e.target.value)}
              id="fecha"
              isInvalid={!!errors.fecha}
              color={errors.fecha ? "danger" : ""}
              errorMessage={errors.fecha?.message}
              radius="sm"
              size="sm"
            />

            <Input
              className="w-72"
              classNames={{
                inputWrapper: ["border-neutral-600"],
              }}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              value={`${userData.nombre} ${userData.apellidos}`}
              label="Supervisor"
              id="supervisor"
              radius="sm"
              size="sm"
            />

            <Autocomplete
              className="w-full"
              labelPlacement="outside"
              label="Operario"
              placeholder="Ingrese el nombre o codigo del operario"
              variant="bordered"
              isInvalid={!!errors.operario}
              color={errors.operario ? "danger" : ""}
              errorMessage={errors.operario?.message}
              id="operario"
              radius="sm"
              innerWrapper
              size="sm"
              onSelectionChange={setselectOperario}
            >
              {operarios.map((operario) => (
                <AutocompleteItem
                  key={operario.id}
                  value={operario.id}
                  textValue={`${operario.nombre}`}
                >
                  {operario.codigo} - {operario.nombre} - {operario.dni}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <form
              className="w-full flex flex-col gap-4"
              onSubmit={handleSubmit(submit)}
            >
              <Autocomplete
                className="w-full "
                labelPlacement="outside"
                label="Producto"
                placeholder="Ingrese el nombre o descripcion del producto"
                variant="bordered"
                {...register("producto", {
                  required: "El producto es obligatorio.",
                })}
                isInvalid={!!errors.producto}
                color={errors.producto ? "danger" : ""}
                errorMessage={errors.producto?.message}
                id="producto"
                radius="sm"
                innerWrapper
                size="sm"
                onSelectionChange={setSelectMaterial}
              >
                {materiales.map((material) => (
                  <AutocompleteItem
                    key={material.id}
                    value={material.id}
                    textValue={`${material.codigo} - ${material.descripcion} - ${material.ubicacion}`}
                  >
                    {material.codigo} - {material.descripcion} -{" "}
                    {material.ubicacion}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <div className=" flex gap-4 items-end">
                <Input
                  className="w-28"
                  classNames={{
                    inputWrapper: ["border-neutral-600"],
                  }}
                  labelPlacement="outside"
                  type="number"
                  variant="bordered"
                  label="Cantidad"
                  {...register("cantidad", {
                    required: "La cantidad es obligatoria.",
                    validate: (value) =>
                      value > 0 || "La cantidad debe ser mayor que 0.",
                  })}
                  isInvalid={!!errors.cantidad}
                  color={errors.cantidad ? "danger" : ""}
                  errorMessage={errors.cantidad?.message}
                  id="cantidad"
                  radius="sm"
                  size="sm"
                />
                <Button type="submit" color="primary">
                  + Agregar
                </Button>
              </div>
            </form>
            <TablaDevolucion
              arraySelected={arraySelected}
              setArraySelected={setArraySelected}
            />
          </section>
        </div>
      </div>
      <PreviewDevoluciones />
    </div>
  );
};

export default Devolucion;
