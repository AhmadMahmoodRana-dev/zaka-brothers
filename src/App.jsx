import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Home from "./pages/Home"
import Login from "./pages/login";
import CashSale from "./pages/CashSale";
export default function App() {

  return (
    <div className="w-full h-auto">
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login/>} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home/>} />
          <Route path="/cashsale" element={<CashSale/>} />
        </Route>
      </Routes>
    </div>
  );
}
