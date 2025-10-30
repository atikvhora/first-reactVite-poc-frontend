import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { UserCrud } from './user/UsersCRUD.tsx'
import { BrowserRouter } from "react-router-dom";
import { RoutingMiddleware } from './routes/RoutingMiddleware.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <UserCrud /> */}
      <RoutingMiddleware />
    </BrowserRouter>
  </StrictMode>,
)
