import { createRoot } from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import '@ant-design/v5-patch-for-react-19';
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";

// Configure dayjs
dayjs.extend(customParseFormat);
dayjs.extend(localeData);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
