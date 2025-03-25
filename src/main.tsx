// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { RouterProvider, createBrowserRouter } from "react-router";
// import './index.css'
// import App from './App.tsx'

// const rootElement = document.getElementById('root');

// if (!rootElement) throw new Error("Failed to find root element");

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App/>,
//     // errorElement: <div>404</div>
//   },
//   {
//     path: '/science',
//     element: <div>SCIENCE</div>,
//   },
//   {
//     path: '/general',
//     element: <div>GENERAL</div>,
//   },
//   {
//     path: '/entertaiment',
//     element: <div>ENTERTAINMENT</div>,
//   },
//   {
//     path: '/technology',
//     element: <div>TECHNOLOGY</div>,
//   },
//   {
//     path: '/business',
//     element: <div>BUSINESS</div>,
//   },
//   {
//     path: '/health',
//     element: <div>HEALTH</div>,
//   },
//   {
//     path: '/sports',
//     element: <div>SPORTS</div>,
//   },
// ])

// createRoot(rootElement).render(
//   <StrictMode>
//     <RouterProvider router={router} /> 
//   </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient"; // Импортируем созданный QueryClient
import App from "./App"; // Ваш основной компонент приложения

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);