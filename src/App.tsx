import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './components/Layout'
import Docs, { DocsIndex } from './pages/Docs'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/docs', element: <DocsIndex /> },
      { path: '/docs/:slug', element: <Docs /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

const App = () => <RouterProvider router={router} />

export default App
