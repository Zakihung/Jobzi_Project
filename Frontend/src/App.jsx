import { Layout } from "antd";
const { Content } = Layout;
import Header from "../src/components/templates/Header.jsx";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/atoms/ScrollToTop.jsx";
import ScrollToTopButton from "./components/atoms/ScrollToTopButton.jsx";

function App() {
  return (
    <div className="App">
      <Header />

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
      {/* <Footer /> */}
    </div>
  );
}

export default App;
