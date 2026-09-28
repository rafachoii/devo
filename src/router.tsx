import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { Home } from "./pages/Home";
import { FormPage } from "./pages/FormPage";

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/formulario',
                element: <FormPage />,
            },
            {
                path: '/resultado',
                element: <h1>Resultado do Plano de Devocional</h1>,
            },
        ],
    },
])