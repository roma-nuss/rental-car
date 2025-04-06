import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Nav } from './components/Nav/Nav.jsx';
import { Loader } from './components/Loader/Loader.jsx';
import { Toaster } from 'react-hot-toast';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.jsx';
const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage.jsx'));
const CatalogDetailPage = lazy(() =>
  import('./pages/CatalogDetailPage/CatalogDetailPage.jsx')
);

function App() {
  return (
    <>
      <Nav />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CatalogDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
