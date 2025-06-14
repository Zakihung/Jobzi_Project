import { Layout } from "antd";
const { Content } = Layout;
import Header from "../src/components/templates/Header.jsx";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/atoms/ScrollToTop.jsx";
import ScrollToTopButton from "./components/atoms/ScrollToTopButton.jsx";
import Footer from "./components/templates/Footer.jsx";
import HeaderEmployer from "./components/templates/HeaderEmployer.jsx";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <HeaderEmployer />

      <Layout
        style={{ marginLeft: 0, minHeight: "100vh", overflowX: "hidden" }}
      >
        <Content
          style={{
            maxWidth: "100vw",
            overflowX: "hidden",
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

export default App;
