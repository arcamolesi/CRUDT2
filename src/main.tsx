/* import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
) */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { Navbar } from './components/navbar.tsx'
import { ProdutoList } from './pages/produtos/ProdutoList.tsx'
import { ProdutoForm } from './pages/produtos/ProdutoForm.tsx'
import { ProdutoDetalhes } from './pages/produtos/ProdutoDetalhes.tsx'

// Cliente do TanStack Query (configuração padrão é suficiente para a aula)
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <App />  {/* página inicial */}
      </>
    ),
  },
  { path: '/produtos', element: <><Navbar /><ProdutoList /></> },
  { path: '/produtos/novo', element: <><Navbar /><ProdutoForm /></> },
  { path: '/produtos/editar/:id', element: <><Navbar /><ProdutoForm /></> },
  { path: '/produtos/:id', element: <><Navbar /><ProdutoDetalhes /></> },

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)