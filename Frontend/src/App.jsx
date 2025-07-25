import { Layout } from "antd";
const { Content } = Layout;
import Header from "../src/components/templates/Header.jsx";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/atoms/ScrollToTop.jsx";
import ScrollToTopButton from "./components/atoms/ScrollToTopButton.jsx";
import Footer from "./components/templates/Footer.jsx";

function App() {
  return (
    <div className="App">
      <Header />

      <Layout style={{ marginLeft: 0, minHeight: "100vh" }}>
        <Content
          style={{
            width: "100%",
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
