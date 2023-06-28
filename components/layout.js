import Footer from "./footer";
import ScrollToTop from "react-scroll-to-top";

export default function Layout({ preview, children }) {
  return (
    <>
      <div className="min-h-screen">
      
        <main>{children}</main>
      </div>
      <Footer />
      <ScrollToTop smooth color="#6f00ff" />
    </>
  );
}
