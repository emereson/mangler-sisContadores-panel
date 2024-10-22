import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  FaAddressCard,
  FaBarcode,
  FaEye,
  FaEyeSlash,
  FaIdCard,
  FaIdCardAlt,
  FaPhone,
} from "react-icons/fa";
import config from "../../../utils/getToken";

const CreateUserModal = ({
  isOpen,
  onOpenChange,
  setResetTable,
  resetTable,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [isVisible, setIsVisible] = useState(false);

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/user/signup`;
    axios
      .post(url, data, config)
      .then((res) => {
        toast.success("El usuario se creó correctamente");
        onOpenChange(false);
        setResetTable(resetTable + 1);
        reset();
      })
      .catch((err) => {
        console.log(err);

        toast.error("Hubo un error al guardar los datos");
      });
  };

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Agregar nuevo Usuario
            </ModalHeader>
            <Divider />
            <ModalBody>
              <form
                className="w-full max-w-sm flex flex-col justify-center items-center gap-5"
                onSubmit={handleSubmit(submit)}
              >
                <div className="w-full flex flex-col items-center justify-center text-center gap-2">
                  <h1 className="text-lg font-bold text-gray-900">
                    Datos del Usuario
                  </h1>
                </div>
                <div className="w-full flex flex-col items-center justify-center text-center gap-3">
                  <Input
                    classNames={{
                      inputWrapper: ["border-neutral-400"],
                    }}
                    variant="bordered"
                    type="text"
                    label="Codigo"
                    {...register("codigo", {
                      required: "El codigo es obligatorio.",
                    })}
                    isInvalid={!!errors.codigo}
                    color={errors.codigo ? "danger" : ""}
                    errorMessage={errors.codigo?.message}
                    endContent={
                      <FaBarcode className="text-neutral-600 text-2xl pointer-events-none flex-shrink-0" />
                    }
                  />

                  <Input
                    classNames={{
                      inputWrapper: ["border-neutral-400"],
                    }}
                    isRequired
                    variant="bordered"
                    type="text"
                    label="Nombre"
                    {...register("nombre", {
                      required: "El nombre es obligatorio.",
                    })}
                    isInvalid={!!errors.nombre}
                    color={errors.nombre ? "danger" : ""}
                    errorMessage={errors.nombre?.message}
                    endContent={
                      <FaAddressCard className="text-neutral-600 text-2xl pointer-events-none flex-shrink-0" />
                    }
                  />

                  <Input
                    classNames={{
                      inputWrapper: ["border-neutral-400"],
                    }}
                    isRequired
                    variant="bordered"
                    type="text"
                    label="Apellidos"
                    {...register("apellidos", {
                      required: "Los apellidos son obligatorio.",
                    })}
                    isInvalid={!!errors.apellidos}
                    color={errors.apellidos ? "danger" : ""}
                    errorMessage={errors.apellidos?.message}
                    endContent={
                      <FaAddressCard className="text-neutral-600 text-2xl pointer-events-none flex-shrink-0" />
                    }
                  />

                  <Input
                    classNames={{
                      inputWrapper: ["border-neutral-400"],
                    }}
                    isRequired
                    variant="bordered"
                    type="text"
                    label="Dni"
                    {...register("dni", {
                      required: "El dni es obligatorio.",
                      minLength: 6,
                    })}
                    isInvalid={!!errors.dni}
                    color={errors.dni ? "danger" : ""}
                    errorMessage={errors.dni?.message}
                    endContent={
                      <FaIdCard className="text-neutral-600 text-2xl pointer-events-none flex-shrink-0" />
                    }
                  />

                  <Input
                    classNames={{
                      inputWrapper: ["border-neutral-400"],
                    }}
                    isRequired
                    variant="bordered"
                    type="text"
                    label="Celular"
                    {...register("celular", {
                      required: "El celular es obligatorio.",
                      minLength: 6,
                    })}
                    isInvalid={!!errors.celular}
                    color={errors.celular ? "danger" : ""}
                    errorMessage={errors.celular?.message}
                    endContent={
                      <FaPhone className="text-neutral-600 text-2xl pointer-events-none flex-shrink-0" />
                    }
                  />

                  <Input
                    classNames={{
                      inputWrapper: ["border-neutral-400"],
                    }}
                    variant="bordered"
                    label="Contraseña"
                    {...register("password", {
                      required: "La contraseña es obligatoria.",
                    })}
                    isInvalid={!!errors.password}
                    color={errors.password ? "danger" : ""}
                    errorMessage={errors.password?.message}
                    type={isVisible ? "text" : "password"}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <FaEyeSlash className="text-2xl text-neutral-600 pointer-events-none flex-shrink-0" />
                        ) : (
                          <FaEye className="text-2xl text-neutral-600 pointer-events-none flex-shrink-0" />
                        )}
                      </button>
                    }
                  />

                  <Select
                    label="role"
                    {...register("role")}
                    defaultSelectedKeys={["Almacén"]}
                    variant="bordered"
                  >
                    <SelectItem key="Administrador">Administrador</SelectItem>
                    <SelectItem key="Brigada">Brigada</SelectItem>
                    <SelectItem key="Capataz">Capataz</SelectItem>
                    <SelectItem key="Almacén">Almacén</SelectItem>
                  </Select>
                </div>

                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    type="button"
                    onPress={onClose}
                    onClick={() => reset()}
                  >
                    Cancelar
                  </Button>
                  <Button color="success" type="submit">
                    Crear
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateUserModal;
