import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { StudentProvidor } from './hooks/useStudent.jsx';

createRoot( document.getElementById( 'root' ) ).render(
  <StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <StudentProvidor>
          <Toaster />
          <App />
        </StudentProvidor>
      </RecoilRoot>
    </BrowserRouter>
  </StrictMode>
)
