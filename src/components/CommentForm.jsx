import { useState } from 'react';
import './CommentForm.css';
import { validateComment } from '../shared/validators/ComentsValidator';

function CommentForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateComment({ username: name, content });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({ name, content });
    setName('');
    setContent('');
    setErrors({});
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.username && <p className="error">{errors.username}</p>}

      <textarea
        placeholder="Escribe un comentario"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {errors.content && <p className="error">{errors.content}</p>}

      <button type="submit">Enviar</button>
    </form>
  );
}

export default CommentForm;
