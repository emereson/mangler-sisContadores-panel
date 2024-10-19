import React, { useState, useEffect } from "react";
import { BsAirplaneFill } from "react-icons/bs";
import { FaUserTie, FaWpforms } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { IoGrid, IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

const Header = ({ userData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logOut = () => {
    localStorage.clear(); // Considera el uso de removeItem si deseas conservar algunos datos
    window.location.reload();
  };

  const handleClickOutside = (event) => {
    // Verifica si el clic ocurrió fuera del contenedor
    if (event.target.closest(".menu-container") === null) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    // Agrega el evento de clic al documento
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      // Limpia el evento al desmontar el componente
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed right-0  top-0 h-[70px]  flex p-4 justify-between items-center gap-10 z-50">
      <div className="flex items-center gap-6">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform bg-white"
              name="Jason Hughes"
              color="primary"
              size="sm"
              src="/logo.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-normal text-gray-500 text-xs">
                {userData?.nombre} {userData?.apellidos}
              </p>
              <p className="font-normal text-gray-500 text-xs">
                {" "}
                {userData?.dni}
              </p>
            </DropdownItem>

            <DropdownItem key="logout" color="danger" onClick={logOut}>
              Cerrar Sesion
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="block">
          {isMenuOpen ? (
            <IoIosClose
              className="text-black text-4xl cursor-pointer"
              onClick={toggleMenu}
            />
          ) : (
            <IoGrid
              className="text-black text-2xl cursor-pointer"
              onClick={toggleMenu}
            />
          )}
        </div>
      </div>
      <nav
        className={`absolute top-[70px] min-w-[300px] right-0 h-[calc(100vh-70px)] border-t-1 bg-gray-50 flex flex-col items-start py-5  w-full   shadow-xl ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-all duration-400 border-t-0 py-5 menu-container`}
      >
        <Link
          className="text-black flex items-center gap-4 p-4 hover:bg-gray-200 w-full"
          to="/"
          onClick={() => setIsMenuOpen(false)}
        >
          <FaWpforms className="text-xl" />
          <p className="text-lg">Almacen</p>
        </Link>
        <Link
          className="text-black flex items-center gap-4 p-4 hover:bg-gray-200 w-full"
          to="/contadores"
          onClick={() => setIsMenuOpen(false)}
        >
          <FaWpforms className="text-xl" />
          <p className="text-lg">Contadores</p>
        </Link>
        <Link
          className="text-black flex items-center gap-4 p-4 hover:bg-gray-200 w-full"
          to="/usuarios"
          onClick={() => setIsMenuOpen(false)}
        >
          <FaWpforms className="text-xl" />
          <p className="text-lg">Usuarios</p>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
