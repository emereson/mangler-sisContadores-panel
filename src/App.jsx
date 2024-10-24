import "./App.css";
import { Route, Routes } from "react-router-dom";
import Users from "./modules/users/Users";
import ProtectedRoutes from "./utils/ProtecteRoutes";
import { Toaster } from "sonner";
import Header from "./Components/Headers/Header";
import Login from "./modules/login/Login";
import Almacen from "./modules/almacen/Almacen";
import Contadores from "./modules/contadores/Contadores";

function App() {
  const userDataJSON = localStorage.getItem("userData");
  const userData = JSON.parse(userDataJSON);

  return (
    <>
      {userData && <Header userData={userData} />}
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/log-in" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Almacen userData={userData}  />} />
          <Route path="/usuarios" element={<Users userData={userData} />} />
          <Route
            path="/contadores"
            element={<Contadores userData={userData} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
