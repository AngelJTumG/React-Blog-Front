import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PostDetail from './pages/PostDetail';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/publicacion/:id" element={<PostDetail />} />
      <Route path="*" element={<p>Página no encontrada</p>} />
    </Routes>
  );
}

export default AppRoutes;