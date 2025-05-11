import { useEffect, useState } from 'react';
import { getPublicaciones, filtrarPorCurso, ordenarPorFecha } from '../services/api.jsx';
import './Dashboard.css'; 
import AnimatedTitle from '../components/AnimatedTitle';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    getPublicaciones()
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  };

  const handleCourseChange = async (e) => {
    const course = e.target.value;
    setSelectedCourse(course);
    setSelectedOrder('');
    if (course === '') {
      loadPosts();
    } else {
      const filtered = await filtrarPorCurso(course);
      setPosts(Array.isArray(filtered) ? filtered : []);
    }
  };

  const handleOrderChange = (e) => {
  const order = e.target.value;
  setSelectedOrder(order);
  setSelectedCourse('');

  if (order === '') {
    loadPosts();
  } else {
    const sortedPosts = [...posts].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setPosts(sortedPosts);
  }
};

  return (
    <div className="ag-format-container">
      <div className="dashboard-header">
        <AnimatedTitle />

        <div className="dashboard-filtros">
          <label>
            <select value={selectedCourse} onChange={handleCourseChange}>
              <option value="">Todos los cursos</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Practicas">Prácticas</option>
              <option value="Taller">Taller</option>
            </select>
          </label>

          <label>
            <select value={selectedOrder} onChange={handleOrderChange}>
              <option value="">Sin orden</option>
              <option value="asc">Más antiguos</option>
              <option value="desc">Más recientes</option>
            </select>
          </label>
        </div>
      </div>

      <div className="ag-courses_box">
        {loading ? (
          <p style={{ color: '#000' }}>Cargando publicaciones...</p>
        ) : posts.length > 0 ? (
          posts.map((post, index) => {
            const bgClass = `ag-courses-item_bg ag-courses_item-${(index % 6) + 1}`;
            const formattedDate = post.createdAt
              ? new Date(post.createdAt).toLocaleDateString()
              : "Sin fecha";

            return (
              <div className="ag-courses_item" key={post._id}>
                <a href={`/publicacion/${post._id}`} className="ag-courses-item_link">
                  <div className={bgClass}></div>
                  <div className="ag-courses-item_title">{post.title}</div>
                  <div className="ag-courses-item_date-box">
                    {post.course} | <span className="ag-courses-item_date">{formattedDate}</span>
                  </div>
                </a>
              </div>
            );
          })
        ) : (
          <p style={{ color: '#000' }}>No hay publicaciones disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
