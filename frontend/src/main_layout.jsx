
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#fffaf0]">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
