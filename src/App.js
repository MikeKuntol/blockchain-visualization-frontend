import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import VisualGraph from "./pages/VisualGraph";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/home":
        title = "";
        metaDescription = "";
        break;
      case "/visual-graph":
        axios
      .get("http://127.0.0.1:8000/graph_data")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There are errors:", error);
      });
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/visual-graph" element={<VisualGraph />} />
    </Routes>
  );
}
export default App;
