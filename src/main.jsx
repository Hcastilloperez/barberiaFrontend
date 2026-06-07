import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./appRoutes";

import { Provider } from "react-redux";
import { store } from "/src/redux/store.js";

import { Toaster } from "@/components/ui/sonner";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <RouterProvider router={AppRoutes} />
    </Provider>
    <Toaster />
  </>
);
