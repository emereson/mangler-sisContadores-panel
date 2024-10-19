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
import config from "../../../../../utils/getToken";

const AnularPedidoModal = ({
  isOpen,
  onOpenChange,
  pedidoSeleccionado,
  fetchPedidos,
}) => {
  const deletePost = () => {
    const url = `${import.meta.env.VITE_URL_API}/pedido/${
      pedidoSeleccionado.id
    }`;
    axios
      .delete(url, config)
      .then((res) => {
        toast.success("El pedido se anulo correctamente");
        onOpenChange(false);
        fetchPedidos();
      })
      .catch((err) => {
        toast.success("Hubo un error al anular el pedido");
        onOpenChange(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Anular Pedido
            </ModalHeader>
            <ModalBody>
              <p>¿Está seguro de que desea anular el pedido?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="danger" onClick={deletePost}>
                Anular
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AnularPedidoModal;
