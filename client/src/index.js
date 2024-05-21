import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
// style
import "./Assets/css/bootstrap/css/bootstrap.min.css";
import "./Assets/fontawesome-free/all.css";
import "./Assets/icon/icofont/css/icofont.css";
import "./Assets/icon/themify-icons/themify-icons.css";
// import "./Assets/css/style.css";
import "./Assets/css/style.scss";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
