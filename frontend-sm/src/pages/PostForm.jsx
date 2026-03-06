import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const PostForm = () => {
    const navigate = useNavigate(); // Hook para redireccionar

    // Estados del formulario
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState('');
    
    // Estados auxiliares
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cargamos los usuarios al montar el componente para el desplegable
    useEffect(() => {
        api.get('/users')
           .then(res => setUsers(res.data))
           .catch(err => console.error("Error cargando usuarios:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // Validación básica
        if (!title.trim() || !body.trim() || !userId) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        if (title.length < 5) {
            setError('El título debe tener al menos 5 caracteres.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Enviamos los datos al endpoint POST /api/posts [cite: 10]
            await api.post('/posts', {
                title,
                body,
                user_id: userId
            });
            
            // Si todo va bien, volvemos al listado
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Error al crear el post. Verifica los datos.');
            setLoading(false);
        }
    };

    return (
        <div>
            <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
                &larr; Volver al listado
            </Link>

            <h2>Crear Nuevo Post</h2>
            
            {error && <div style={{ color: 'red', marginBottom: '15px', padding: '10px', border: '1px solid red', borderRadius: '4px' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Autor:</label>
                    <select 
                        value={userId} 
                        onChange={(e) => setUserId(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    >
                        <option value="">-- Selecciona un autor --</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Título:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Escribe el título aquí..."
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Contenido:</label>
                    <textarea 
                        value={body} 
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Contenido del post..."
                        rows="5"
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        padding: '10px 15px', 
                        background: loading ? '#ccc' : '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {loading ? 'Guardando...' : 'Guardar Post'}
                </button>
            </form>
        </div>
    );
};

export default PostForm;