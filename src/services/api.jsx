import axios from 'axios';

const API_URL = "http://localhost:3001/Blog/v1";

const apiClient = axios.create({
    baseURL: API_URL, 
    timeout: 3000
});

export const getPublicaciones = async () => {
  const res = await fetch(`${API_URL}/publicacion/`);
  return await res.json();
};

export const filtrarPorCurso = async (course) => {
  const res = await fetch(`${API_URL}/publicacion/filtrar?course=${course}`);
  return await res.json();
};

export const ordenarPorFecha = async (order = 'desc') => {
  const res = await fetch(`${API_URL}/publicacion/ordenar?order=${order}`);
  return await res.json();
};

export const getComentarios = async (postId) => {
  const res = await fetch(`${API_URL}/comentario/${postId}`);
  return await res.json();
};

export const addComment = async (commentData) => {
  const res = await fetch(`${API_URL}/comentario/addComent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(commentData),
  });
  return await res.json();
};

export const getPostById = async (id) => {
  if (!id) {
    console.error("El parámetro 'id' es obligatorio para getPostById");
    return { message: "ID no proporcionado" };
  }
  const res = await fetch(`${API_URL}/publicacion/${id}`);
  const data = await res.json();
  console.log("Respuesta de la API para getPostById:", data);
  return data;
};