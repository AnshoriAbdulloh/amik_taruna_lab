import Dashboard from "./components/Dashboard";
import Technician from "./components/Technician";

export default function App() {
  return (
    <div
      className={`font-dm_sans-medium  min-h-screen w-full **:transition-all **:duration-300 **:ease-in-out `}
    >
      <main className={`flex justify-center items-center w-full `}>
        {/* <Dashboard /> */}
        <Technician />
      </main>
    </div>
  );
}
