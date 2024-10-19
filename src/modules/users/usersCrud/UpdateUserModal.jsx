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
import { FaEye, FaEyeSlash, FaIdCardAlt, FaPhone } from "react-icons/fa";
import config from "../../../utils/getToken";

const UpdateUserModal = ({
  isOpen,
  onOpenChange,
  selectedUser,
  setResetTable,
  resetTable,
}) => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const validForm = () => {
    let valid = true;
    const newErrors = {};

    if (!watch("name")) {
      newErrors.name = "El nombre es obligatorio.";
      valid = false;
    }

    if (!watch("email")) {
      newErrors.email = "El correo es obligatorio.";
      valid = false;
    }

    if (!watch("phoneNumber")) {
      newErrors.phoneNumber = "El telefono es obligatorio.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const submit = (data) => {
    if (!validForm()) {
      return;
    }
    const url = `${import.meta.env.VITE_URL_API}/user/${selectedUser.id}`;
    axios
      .patch(url, data, config)
      .then((res) => {
        toast.success("Los datos se guardaron correctamente");
        onOpenChange(false);
        setResetTable(resetTable + 1);
        reset();
      })
      .catch((err) => {
        toast.error("Hubo un error al guardar los datos");
      });
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const date = new Date().toISOString().split("T")[0];

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editar datos del Usuario
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
                <div className="w-full border- flex flex-col items-center justify-center text-center gap-3">
                  <Input
                    classNames={{
                      inputWrapper: ["border-neutral-400"],
                    }}
                    isRequired
                    type="text"
                    label="Nombres"
                    {...register("name")}
                    id="name"
                    variant="bordered"
                    defaultValue={selectedUser.name}
                    isInvalid={!!errors?.nombre}
                    color={errors?.nombre ? "danger" : ""}
                    errorMessage={errors?.nombre}
                    endContent={
                      <FaIdCardAlt className="text-neutral-600 text-2xl pointer-events-none flex-shrink-0" />
                    }
                  />

                  <Input
                    classNames={{
                      inputWrapper: ["border-neutral-400"],
                    }}
                    isRequired
                    type="email"
                    label="Correo"
                    {...register("email")}
                    defaultValue={selectedUser.email}
                    id="email"
                    variant="bordered"
                    isInvalid={!!errors?.email}
                    color={errors?.email ? "danger" : ""}
                    errorMessage={errors?.email}
                    endContent={
                      <FaPhone className="text-neutral-600 text-2xl pointer-events-none flex-shrink-0" />
                    }
                  />

                  <Input
                    classNames={{
                      inputWrapper: ["border-neutral-400"],
                    }}
                    isRequired
                    type="tel"
                    label="Celular"
                    {...register("phoneNumber")}
                    defaultValue={selectedUser.phoneNumber}
                    id="phoneNumber"
                    variant="bordered"
                    isInvalid={!!errors?.phoneNumber}
                    color={errors?.phoneNumber ? "danger" : ""}
                    errorMessage={errors?.phoneNumber}
                    endContent={
                      <FaPhone className="text-neutral-600 text-2xl pointer-events-none flex-shrink-0" />
                    }
                  />

                  <Input
                    classNames={{
                      inputWrapper: ["border-neutral-400"],
                    }}
                    label="Contraseña nueva"
                    variant="bordered"
                    {...register("password")}
                    id="password"
                    isInvalid={errors?.password ? true : false}
                    color={errors?.password ? "danger" : ""}
                    errorMessage={errors?.password}
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
                    label="Estado del Usuario"
                    variant="bordered"
                    {...register("status")}
                    defaultSelectedKeys={[selectedUser.status]}
                  >
                    <SelectItem key="active">Activado </SelectItem>
                    <SelectItem key="disabled">Desactivado</SelectItem>
                  </Select>

                  <Select
                    label="role"
                    variant="bordered"
                    {...register("role")}
                    defaultSelectedKeys={[selectedUser.role]}
                  >
                    <SelectItem key="user">Usuario </SelectItem>
                    <SelectItem key="admin">Administrador</SelectItem>
                  </Select>
                </div>

                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    type="button"
                    onPress={onClose}
                    onClick={() => {
                      setErrors();
                      reset();
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button color="success" type="submit">
                    Guardar
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

export default UpdateUserModal;
