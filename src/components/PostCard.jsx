import { Link } from 'react-router-dom';
import './PostCard.css';

function PostCard({ post }) {
  const formattedDate = post.createdAt
  ? new Date(post.createdAt).toLocaleString()
  : "Fecha no disponible";

  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.course} | {formattedDate}</p>
      {post._id ? (
  <Link to={`/publicacion/${post._id}`}>Ver más</Link>
) : (
  <span>ID no disponible</span>
)}
    </div>
  );
}

export default PostCard;
