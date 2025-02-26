import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Home from "./pages/Home"
import Login from "./pages/login";
import CashSale from "./pages/CashSale";
import Collection from "./pages/Collection";
export default function App() {

  return (
    <div className="w-full h-auto relative">
      <a className="absolute w-10 h-10 top-[87%] right-[1%] z-10" href="https://wa.me/923015988221" target="_blank" id="whatsapp-icon">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
        />
      </a>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login/>} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home/>} />
          <Route path="/cashsale" element={<CashSale/>} />
          <Route path="/collection" element={<Collection/>} />
        </Route>
      </Routes>
    </div>
  );
}
