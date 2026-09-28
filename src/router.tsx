import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { Home } from "./pages/Home";

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
                element: <h1>Formulário de Devocional</h1>,
            },
            {
                path: '/resultado',
                element: <h1>Resultado do Plano de Devocional</h1>,
            },
        ],
    },
])