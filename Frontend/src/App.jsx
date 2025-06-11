import { Layout } from "antd";
const { Content } = Layout;
import Header from "../src/components/templates/Header.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* Here you can add your header, footer, and other components */}
      {/* For example: */}
      <Header />
      {/* <Footer /> */}
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
          {/* <ScrollToTop />
          <ScrollToTopButton /> */}
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
