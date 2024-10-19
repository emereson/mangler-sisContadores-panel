import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";

const UserTableContainer = ({
  users,
  setSelectedUser,
  onOpen,
  setSelectedModal, // Corregido el typo
}) => {
  const [page, setPage] = useState(1);
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const rowsPerPage = 20;

  const pages = Math.ceil(users?.length / rowsPerPage);

  useEffect(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    setPaginatedUsers(users?.slice(start, end)); // Guardar usuarios paginados
  }, [page, users]);

  return (
    <Table
      aria-label="Example static collection table"
      selectionMode="single"
      color="default"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader>
        <TableColumn>CODIGO</TableColumn>
        <TableColumn>NOMBRE</TableColumn> <TableColumn>DNI</TableColumn>
        <TableColumn>CELULAR</TableColumn>
        <TableColumn>ROL</TableColumn>
        <TableColumn>ACCIONES</TableColumn>
      </TableHeader>

      <TableBody>
        {paginatedUsers?.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell>{user.codigo}</TableCell>
            <TableCell>
              {user.nombre} {user.apellidos} {/* Nombre completo */}
            </TableCell>
            <TableCell>{user.dni}</TableCell>
            <TableCell>{user.celular}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              {/* Acciones */}
              <div className="relative flex items-center">
                <Tooltip content="Editar">
                  <span
                    onClick={() => {
                      setSelectedUser(user);
                      setSelectedModal("update");
                      onOpen();
                    }}
                    className="w-10 text-xl text-blue-700 cursor-pointer active:opacity-50"
                  >
                    <MdEdit />
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Eliminar">
                  <span
                    onClick={() => {
                      setSelectedUser(user);
                      setSelectedModal("delete");
                      onOpen();
                    }}
                    className="text-xl text-danger cursor-pointer active:opacity-50"
                  >
                    <FaTrashAlt />
                  </span>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTableContainer;
