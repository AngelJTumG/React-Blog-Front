import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, getComentarios, addComment } from '../services/api';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import './PostDetail.css'; 

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (id) {
      getPostById(id)
        .then((data) => setPost(data))
        .catch((error) => console.error("Error al obtener el post:", error));

      getComentarios(id)
        .then((data) => setComments(data))
        .catch((error) => console.error("Error al obtener comentarios:", error));
    }
  }, [id]);

  const handleAddComment = async ({ name, content }) => {
    try {
      const newComment = await addComment({ postId: id, username: name, content });
      setComments((prev) => [...prev, newComment]);
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  if (!post) {
    return <p style={{ textAlign: 'center', marginTop: '40px', color: '#fff' }}>Cargando publicación...</p>;
  }

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <p>{post.description}</p>

      <hr />
      <h2>Agregar Comentario</h2>
      <CommentForm onSubmit={handleAddComment} />

      <hr />
      <CommentList comments={comments} />
    </div>
  );
}

export default PostDetail;
