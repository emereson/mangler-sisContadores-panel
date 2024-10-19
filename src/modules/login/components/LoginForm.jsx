import { Button, Input, Spinner } from "@nextui-org/react";
import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaAddressCard, FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = (data) => {
    setLoading(true);
    const url = `${import.meta.env.VITE_URL_API}/user/login`;

    axios
      .post(url, data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        const userDataJSON = JSON.stringify(res.data.user);
        localStorage.setItem("userData", userDataJSON);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        setError(err.response.data.error || "Error al iniciar sesión");
        setLoading(false);
      });
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="w-full m-auto p-4 flex flex-col justify-center items-center">
      {loading && (
        <div className="fixed top-0 left-0 z-20 w-screen h-screen bg-[#00000094] flex items-center justify-center">
          <Spinner
            label="Cargando..."
            color="success"
            size="lg"
            labelColor="success"
          />
        </div>
      )}
      <form
        className="w-full max-w-sm flex flex-col justify-center items-center gap-5 px-4 py-10 rounded-xl shadow-lg shadow-black bg-white"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-lg font-bold text-black">Sistema Contadores</h1>
          <img src="/acciona.jpeg" alt="" className="w-32" />
        </div>

        <div className="w-full flex flex-col items-center justify-center text-center gap-5">
          <Input
            classNames={{
              inputWrapper: ["border-neutral-400"],
            }}
            type="text"
            variant="bordered"
            label="DNI"
            {...register("dni", { required: "El DNI es obligatorio" })}
            id="dni"
            isInvalid={!!errors.dni}
            color={errors.dni ? "danger" : ""}
            errorMessage={errors.dni?.message}
            endContent={
              <FaAddressCard className="text-2xl text-neutral-600 pointer-events-none flex-shrink-0" />
            }
          />
          <Input
            classNames={{
              inputWrapper: ["border-neutral-400"],
            }}
            label="Contraseña"
            variant="bordered"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
            id="password"
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
          {error && <span className="text-sm text-red-600">{error}</span>}
          <Button color="danger" size="lg" type="submit">
            Iniciar Sesión
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
