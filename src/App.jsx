import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CashSale from "./pages/CashSale";
import Collection from "./pages/Collection";
import { Context } from "./context/Context";
import Stock from "./pages/Stock";
import Receiveable from "./pages/Receiveable";
import BankPosition from "./pages/BankPosition";
export default function App() {
  const { theme } = useContext(Context);
  const phoneNumber = "923015988221";
  const message = encodeURIComponent(
    "Check out this link: https://example.com"
  );

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };
  return (
    <div className={`w-full h-auto relative ${theme === "dark" ? "dark" : ""}`}>
      <button
        className="absolute w-10 h-10 top-[87%] right-[1%] z-10 cursor-pointer"
        onClick={handleClick}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
        />
      </button>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/cashsale" element={<CashSale />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/receiveable" element={<Receiveable />} />
          <Route path="/bank-posititon" element={<BankPosition />} />
        </Route>
      </Routes>
    </div>
  );
}
