import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@/routes/Router";
import Sidebar from "@/components/layout/Sidebar";
import ToastContainer from "@/components/ui/ToastContainer";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <AppRouter />
        </main>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
