import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Purchase from "@/pages/Purchase";
import Dashboard from "@/pages/Dashboard";
import Boost from "@/pages/Boost";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Tos from "@/pages/Tos";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Admin has no marketing chrome */}
          <Route path="/admin" element={<Admin />} />
          {/* Boost is a focused flow, minimal chrome via its own layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/purchase/:platform/:service" element={<Purchase />} />
            <Route path="/boost" element={<Boost />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tos" element={<Tos />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
