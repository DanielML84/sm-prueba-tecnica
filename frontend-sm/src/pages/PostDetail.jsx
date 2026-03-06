import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const PostDetail = () => {
    const { id } = useParams(); // Extraemos el ID de la URL
    
    // Estados para el post y los comentarios
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            // Promise.all ejecuta ambas peticiones simultáneamente
            const [postResponse, commentsResponse] = await Promise.all([
                api.get(`/posts/${id}`),
                api.get(`/posts/${id}/comments`)
            ]);
            
            setPost(postResponse.data);
            setComments(commentsResponse.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Error al cargar la información del post.');
            setLoading(false);
        }
    };

    if (loading) return <h3>Cargando detalle del post... ⏳</h3>;
    if (error) return <h3 style={{ color: 'red' }}>{error}</h3>;
    if (!post) return <h3>Post no encontrado</h3>;

    return (
        <div>
            <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
                &larr; Volver al listado
            </Link>
            
            <div style={{ background: '#f9f9f9', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
                <h2 style={{ marginTop: 0 }}>{post.title}</h2>
                <p style={{ color: '#555', fontSize: '0.9em' }}>
                    Autor: <strong>{post.user?.name}</strong> | Email: {post.user?.email}
                </p>
                <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{post.body}</p>
            </div>

            <h3 style={{ marginTop: '30px' }}>Comentarios ({comments.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {comments.map(comment => (
                    <div key={comment.id} style={{ borderLeft: '4px solid #007bff', paddingLeft: '15px', background: '#fff', padding: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '1em' }}>{comment.name}</h4>
                        <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '0.85em' }}>{comment.email}</p>
                        <p style={{ margin: 0, fontSize: '0.95em' }}>{comment.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostDetail;