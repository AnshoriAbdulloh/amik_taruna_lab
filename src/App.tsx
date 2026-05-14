import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Technician from "./components/Technician";
import Login from "./components/Login";

export default function App() {
  return (
    <div
      className={`font-dm_sans-medium  min-h-screen w-full **:transition-all **:duration-300 **:ease-in-out `}
    >
      <main className={`flex justify-center items-center w-full `}>
        <Routes>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/technician' element={<Technician />}></Route>
        </Routes>
      </main>
    </div>
  );
}
