import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
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