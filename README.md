<p align="center">
  <img src="./public/devo_logo.png" alt="devo logo" width="140" />
</p>

# devo — Gerador de Planos Devocionais

O **devo** é uma aplicação web desenvolvida para criar planos de devocional cristão personalizados com recurso a Inteligência Artificial. Com base em respostas a um formulário simples (tema, duração, livros de preferência, público-alvo e objetivo espiritual), o sistema gera um itinerário detalhado com leituras bíblicas (NVI), perguntas para reflexão, desafios práticos e mensagens de incentivo.

---

## 🚀 Funcionalidades

- **Formulário Dinâmico em Etapas:** Interface intuitiva para recolha dos objetivos espirituais do utilizador.
- **Plano Personalizado por IA:** Estruturação semanal de leituras bíblicas, temas, reflexões e desafios práticos.
- **Visualização de Resultados:** Apresentação clara através de cartões indicadores e blocos de conteúdo detalhados.
- **Persistência de Dados Local:** Armazenamento local com `useFormStorage` para consulta dos planos gerados.
- **Interface Responsiva & Tema Consistente:** Design limpo, moderno e otimizado para dispositivos móveis e desktop.

---

## 🛠️ Tecnologias Utilizadas

- **[React](https://react.dev/)** + **[TypeScript](https://www.typescriptlang.org/)**
- **[Vite](https://vitejs.dev/)** — Build tool rápido para desenvolvimento Web
- **[Tailwind CSS](https://tailwindcss.com/)** — Estilização moderna baseada em utilitários
- **[React Router DOM](https://reactrouter.com/)** — Gestão de rotas na aplicação
- **[Lucide React](https://lucide.dev/)** — Biblioteca de ícones

---

## 📁 Estrutura do Projeto

```text
devo/
├── src/
│   ├── assets/          # Imagens e recursos estáticos do projeto
│   ├── components/      # Componentes de interface organizados por tipo
│   │   ├── layout/      # Layouts globais da aplicação
│   │   └── shared/      # Componentes reutilizáveis (Button, Header, Input, etc.)
│   ├── features/        # Funcionalidades da aplicação (Form, Hero, ResultCard, etc.)
│   ├── hooks/           # Custom hooks (useFormStorage, useFormInsights)
│   ├── pages/           # Páginas da aplicação (Home, FormPage, FormResultsPage)
│   ├── services/        # Integrações com APIs e serviços externos
│   ├── styles/          # Estilos globais e temas visuais
│   ├── types/           # Definições TypeScript (devotional.ts)
└───├── router.tsx       # Configuração de rotas da aplicação
```

## Instalação

```bash
git clone https://github.com/rafachoii/devo.git
cd devo
npm install
```

## Execução

```bash
npm run dev
```

Acesse a URL exibida pelo Vite, normalmente:

```text
http://localhost:5173
```

## Outros comandos

```bash
npm run build
npm run preview
npm run lint
```