import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {CrowdFundingProvider} from './context/ether';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CrowdFundingProvider>
    <App />
  </CrowdFundingProvider>
  </StrictMode>,
)
