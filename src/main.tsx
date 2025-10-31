import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { RoutingMiddleware } from './routes/RoutingMiddleware.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RoutingMiddleware />
    </BrowserRouter>
  </StrictMode>,
)
