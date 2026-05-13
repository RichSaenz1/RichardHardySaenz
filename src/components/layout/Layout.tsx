import { Outlet } from "react-router-dom";
import { FloatingActions } from "../home/FloatingActions";
import { StickyBookingBar } from "../home/StickyBookingBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollToTop } from "./ScrollToTop";

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
      <StickyBookingBar />
    </>
  );
}
