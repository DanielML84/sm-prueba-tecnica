import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const PostList = () => {
    // 1. Definimos el estado
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Indicador de carga
    const [error, setError] = useState(null);

    // 2. Efecto al montar el componente
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            // Llamamos al endpoint GET /api/posts de tu Laravel
            const response = await api.get('/posts');
            // Laravel devuelve los datos paginados dentro de un objeto 'data'
            setPosts(response.data.data); 
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Error al cargar los posts desde el servidor.');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Seguro que deseas eliminar este post?')) return;
        
        try {
            // Llamamos al endpoint DELETE /api/posts/{id}
            await api.delete(`/posts/${id}`);
            // Actualizamos la vista filtrando el post eliminado (sin recargar la página)
            setPosts(posts.filter(post => post.id !== id));
        } catch (err) {
            alert('Hubo un error al intentar eliminar el post.');
        }
    };

    // 3. Renderizado condicional del indicador de carga 
    if (loading) return <h3>Cargando posts... ⏳</h3>;
    
    if (error) return <h3 style={{ color: 'red' }}>{error}</h3>;

    // 4. Renderizado principal de la vista
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Listado de Posts</h2>
                {/* Dejamos el botón preparado para el formulario que haremos luego */}
                <Link to="/posts/create" style={{ padding: '8px 16px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                    + Crear Post
                </Link>
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {posts.map(post => (
                    <li key={post.id} style={{ border: '1px solid #ddd', margin: '15px 0', padding: '15px', borderRadius: '5px' }}>
                        <h3 style={{ marginTop: 0 }}>{post.title}</h3>
                        <p style={{ color: '#555' }}>Autor: {post.user?.name}</p>
                        
                        <div style={{ marginTop: '10px' }}>
                            <Link to={`/posts/${post.id}`} style={{ marginRight: '15px', color: '#007bff', textDecoration: 'none' }}>
                                Ver detalle y comentarios
                            </Link>
                            <button 
                                onClick={() => handleDelete(post.id)} 
                                style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;