export function validateComment({ username, content }) {
  const errors = {};

  if (!username || username.trim().length === 0) {
    errors.username = "El nombre de usuario es obligatorio.";
  } else if (username.length < 3) {
    errors.username = "El nombre de usuario debe tener al menos 3 caracteres.";
  }

  if (!content || content.trim().length === 0) {
    errors.content = "El comentario es obligatorio.";
  } else if (content.length > 250) {
    errors.content = "El comentario no puede exceder los 250 caracteres.";
  }

  return errors;
}