import './CommentList.css';

function CommentList({ comments }) {
  if (!Array.isArray(comments) || comments.length === 0) {
    return <p>No hay comentarios disponibles</p>;
  }

  return (
    <div className="comment-list">
      <h3>Comentarios</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="comment-item">
          <p>
            <strong>{comment.username}</strong>: {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
