import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import ToastContainer from "@/components/ui/ToastContainer";

export default function RootLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
}
