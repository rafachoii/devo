import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <h1>Devo</h1>,
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