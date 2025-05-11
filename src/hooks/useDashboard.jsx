import { useEffect, useState } from 'react';
import {
  getPublicaciones,
  filtrarPorCurso,
  ordenarPorFecha
} from '../services/api';

export function useDashboard() {
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

  const handleCourseChange = async (course) => {
    setSelectedCourse(course);
    setSelectedOrder('');
    if (course === '') {
      loadPosts();
    } else {
      const filtered = await filtrarPorCurso(course);
      setPosts(Array.isArray(filtered) ? filtered : []);
    }
  };

  const handleOrderChange = async (order) => {
  setSelectedOrder(order);
  setSelectedCourse('');
  if (order === '') {
    loadPosts(); 
  } else {
    const ordered = await ordenarPorFecha(order);
    setPosts(Array.isArray(ordered) ? ordered : []);
  }
};

  return {
    posts,
    loading,
    selectedCourse,
    selectedOrder,
    handleCourseChange,
    handleOrderChange
  };
}
