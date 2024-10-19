import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import axios from "axios";
import React from "react";
import { toast } from "sonner";
import config from "../../../utils/getToken";

const DeleteUserModal = ({
  isOpen,
  onOpenChange,
  selectedUser,
  resetTable,
  setResetTable,
}) => {
  const deletePost = () => {
    const url = `${import.meta.env.VITE_URL_API}/user/${selectedUser.id}`;
    axios
      .delete(url, config)
      .then((res) => {
        toast.success("Los datos se actualizaron correctamente");
        onOpenChange(false);
        setResetTable(resetTable + 1);
      })
      .catch((err) => {
        toast.success("Hubo un error al eliminar el usuario");
        onOpenChange(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Eliminar Usuario
            </ModalHeader>
            <ModalBody>
              <p>
                ¿Está seguro de que desea eliminar al usuario{" "}
                {selectedUser.nombre}? Esta acción es irreversible y su Usuario
                será eliminada permanentemente. No podrá recuperar la Usuario ni
                su información una vez completada la eliminación.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="danger" onClick={deletePost}>
                Eliminar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteUserModal;
