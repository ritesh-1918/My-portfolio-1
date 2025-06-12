import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { GlassMorphismProvider } from './context/GlassMorphismProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlassMorphismProvider>
      <App />
    </GlassMorphismProvider>
  </StrictMode>,
)