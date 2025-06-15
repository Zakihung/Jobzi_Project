import { Layout } from "antd";
const { Content } = Layout;
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/atoms/ScrollToTop.jsx";
import ScrollToTopButton from "./components/atoms/ScrollToTopButton.jsx";
import Footer from "./components/templates/Footer.jsx";
import HeaderEmployer from "./components/templates/HeaderEmployer.jsx";
import Header from "./components/templates/Header.jsx";

function EmployerApp() {
  return (
    <div className="EmployerApp">
      <Header />
      {/* <HeaderEmployer /> */}

      <Layout style={{ marginLeft: 0, minHeight: "100vh" }}>
        <Content
          style={{
            maxWidth: "100vw",
            boxSizing: "border-box",
          }}
        >
          <ScrollToTop />
          <ScrollToTopButton />
          <Outlet />
        </Content>
      </Layout>
      <Footer />
    </div>
  );
}

export default EmployerApp;
