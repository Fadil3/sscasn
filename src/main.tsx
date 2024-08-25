import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Formasi from './formasi/Index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Formasi />
  </StrictMode>,
)
