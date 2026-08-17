import { Outlet } from "react-router-dom";
import SaleBanner from "@/components/layout/SaleBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingChat from "@/components/layout/FloatingChat";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SaleBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
}
