import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react"; // Asegúrate de que estás usando el Input de la librería correcta
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios"; // Importa axios si lo estás usando
import TablaMateriales from "./components/TablaMateriales";
import { toast } from "sonner";

const ModalMateriales = ({ onOpenChange, isOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setloading] = useState(false);
  const [resetTable, setResetTable] = useState(0);

  const submit = (data) => {
    setloading(true);

    const url = `${import.meta.env.VITE_URL_API}/material`;

    axios
      .post(url, data)
      .then((res) => {
        toast.success("El material se subió correctamente");
        setResetTable(resetTable + 1);
        setloading(false);
        reset();
      })
      .catch((err) => {
        console.log(err);

        toast.error("Hubo un error al subir el material");
        setloading(false);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="min-h-[90vh]"
      size="2xl"
    >
      {loading && (
        <div className="fixed top-0 left-0 z-[100] min-w-[100vw] min-h-screen bg-[#020202ce]  flex items-center justify-center">
          <Spinner label="Cargando..." color="success" />
        </div>
      )}
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="py-8">
              <form
                onSubmit={handleSubmit(submit)}
                className="flex flex-col gap-4"
              >
                <h2>Datos del archivo</h2>

                {/* Campo Codigo */}
                <Input
                  classNames={{
                    inputWrapper: ["border-neutral-400"],
                  }}
                  {...register("codigo", {
                    required: "El código es obligatorio",
                  })}
                  type="text"
                  label="Código"
                  id="codigo"
                  size="sm"
                  variant="bordered"
                  isInvalid={!!errors?.codigo}
                  color={errors?.codigo ? "danger" : ""}
                  errorMessage={errors?.codigo?.message}
                />

                {/* Campo Descripcion */}
                <Input
                  classNames={{
                    inputWrapper: ["border-neutral-400"],
                  }}
                  {...register("descripcion", {
                    required: "La descripción es obligatoria",
                  })}
                  type="text"
                  label="Descripción"
                  id="descripcion"
                  size="sm"
                  variant="bordered"
                  isInvalid={!!errors?.descripcion}
                  color={errors?.descripcion ? "danger" : ""}
                  errorMessage={errors?.descripcion?.message}
                />

                {/* Campo Ubicación */}
                <Select
                  label="Ubicación"
                  variant="bordered"
                  {...register("ubicacion", {
                    required: "La ubicación es obligatoria",
                  })}
                  id="ubicacion"
                  defaultSelectedKeys={["Hidràulicos"]}
                  isInvalid={!!errors?.ubicacion}
                  color={errors?.ubicacion ? "danger" : ""}
                  errorMessage={errors?.ubicacion?.message}
                >
                  <SelectItem key="Hidràulicos">Hidràulicos</SelectItem>
                  <SelectItem key="Herramientas">Herramientas</SelectItem>
                  <SelectItem key="Epis">Epis</SelectItem>
                </Select>

                <Button type="submit" color="danger" className="w-40 m-auto">
                  Guardar
                </Button>
              </form>
              <TablaMateriales resetTable={resetTable} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalMateriales;
