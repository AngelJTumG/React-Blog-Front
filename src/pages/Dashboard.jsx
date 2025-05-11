import { useDashboard } from '../hooks/useDashboard';
import AnimatedTitle from '../components/AnimatedTitle';
import './Dashboard.css';

function Dashboard() {
  const {
    posts,
    loading,
    selectedCourse,
    selectedOrder,
    handleCourseChange,
    handleOrderChange
  } = useDashboard();

  return (
    <div className="ag-format-container">
      <div className="dashboard-header">
        <AnimatedTitle />

        <div className="dashboard-filtros">
          <select value={selectedCourse} onChange={(e) => handleCourseChange(e.target.value)}>
            <option value="">Todos los cursos</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Practicas">Prácticas</option>
            <option value="Taller">Taller</option>
          </select>

          <select value={selectedOrder} onChange={(e) => handleOrderChange(e.target.value)}>
            <option value="">Sin orden</option>
            <option value="asc">Más antiguos</option>
            <option value="desc">Más recientes</option>
          </select>
        </div>
      </div>

      <div className="ag-courses_box">
        {loading ? (
          <p style={{ color: '#000' }}>Cargando publicaciones...</p>
        ) : posts.length > 0 ? (
          posts.map((post, index) => {
            const colorClass = `ag-courses_item-${(index % 6) + 1}`;
            const formattedDate = post.createdAt
              ? new Date(post.createdAt).toLocaleString()
              : "Sin fecha";

            return (
              <div className={`ag-courses_item ${colorClass}`} key={post._id}>
                <a href={`/publicacion/${post._id}`} className="ag-courses-item_link">
                  <div className="ag-courses-item_bg"></div>

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
