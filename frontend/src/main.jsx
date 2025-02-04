import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProviderWrapper } from "./ThemeProvider";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./css/global.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import ListadoSensei from "./components/ListadoSensei";
import ListadoAprendiz from "./components/ListadoAprendiz";
import ModificarSensei from "./components/ModificarSensei";
import ModificarAprendiz from "./components/ModificarAprendiz";
import AltaSensei from "./components/AltaSensei";
import AltaAprendiz from "./components/AltaAprendiz";
import PaginaError from "./pages/PaginaError";

let router = createBrowserRouter([
  {
    path: "/",
    element : <Home />,
    errorElement : <PaginaError />,
    children: [   // Los hijos se renderizan en el elemento <Outlet /> del padre
      {
        path: "listadosensei",
        element: <ListadoSensei />,
      },
      {
        path: "listadoaprendiz",
        element: <ListadoAprendiz />,
      },
      {
        path: "altasensei",
        element: <AltaSensei />,
      },
      {
        path: "altaaprendiz",
        element: <AltaAprendiz/>,
      },
      {
        path: "modificarsensei/:idSensei",
        element: <ModificarSensei />,
      },
      {
        path: "modificarAprendiz/:idAprendiz",
        element: <ModificarAprendiz />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProviderWrapper>
      <RouterProvider router={router} />
    </ThemeProviderWrapper>
  </StrictMode>
);
