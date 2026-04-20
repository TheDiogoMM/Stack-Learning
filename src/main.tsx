import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './providers/AuthProvider'
import ProgressProvider from './providers/ProgressProvider'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProgressProvider>
        <App />
      </ProgressProvider>
    </AuthProvider>
  </StrictMode>,
)
