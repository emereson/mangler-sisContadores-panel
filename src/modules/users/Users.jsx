import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Button, Input, useDisclosure } from "@nextui-org/react";

import { FaSearchPlus } from "react-icons/fa";
import config from "../../utils/getToken";
import UserTableContainer from "./UserTableContainer";
import UpdateUserModal from "./usersCrud/UpdateUserModal";
import DeleteUserModal from "./usersCrud/DeleteUserModal";
import CreateUserModal from "./usersCrud/CreateUserModal";
import { useNavigate } from "react-router-dom";

const Users = ({ userData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const [users, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedModal, setSelectedModal] = useState(null);
  const [resetTable, setResetTable] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/user?search=${search}`;

    axios.get(url, config).then((res) => {
      setUsers(res.data.users);
    });
  }, [resetTable, search]);

  useEffect(() => {
    if (userData.role !== "Administrador") {
      navigate("/");
    }
  }, []);

  return (
    <div className="w-full overflow-hidden flex flex-col gap-4   bg-white p-4 py-5">
      <h1 className="text-2xl font-bold">Tus Usuarios</h1>

      <div className="bg-white rounded-xl flex flex-wrap justify-between items-center p-3 gap-4">
        <div className="flex flex-wrap gap-4">
          <form className="flex flex-wrap  gap-2 items-center">
            <Input
              className="w-[300px]"
              label="Buscar Usuario por  codigo o nombre"
              size="md"
              variant="bordered"
              type="search"
              color="default"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              endContent={<FaSearchPlus />}
              size="md"
              color="primary"
              type="submit"
              className="min-h-[50px]"
            >
              Buscar
            </Button>
          </form>
        </div>
        <Button
          className="max-w-[200px] min-h-[50px] "
          color="warning"
          onClick={() => {
            setSelectedModal("create"), onOpen();
          }}
        >
          Agregar Usuario
        </Button>
      </div>
      <UserTableContainer
        users={users}
        setSelectedUser={setSelectedUser}
        onOpenChange={onOpenChange}
        setSelectedModal={setSelectedModal}
        onOpen={onOpen}
      />
      {selectedModal === "update" && (
        <UpdateUserModal
          key={selectedUser?.id}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          selectedUser={selectedUser}
          resetTable={resetTable}
          setResetTable={setResetTable}
        />
      )}
      {selectedModal === "delete" && (
        <DeleteUserModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          selectedUser={selectedUser}
          resetTable={resetTable}
          setResetTable={setResetTable}
        />
      )}
      {selectedModal === "create" && (
        <CreateUserModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          resetTable={resetTable}
          setResetTable={setResetTable}
        />
      )}
    </div>
  );
};

export default Users;
