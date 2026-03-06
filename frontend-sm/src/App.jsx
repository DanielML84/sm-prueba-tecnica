import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import PostForm from './pages/PostForm'; // Importamos el formulario

function App() {
  return (
    <Router>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>Gestor de Posts - SM Sistemas Medioambientales</h1>
        <hr />
        
        <Routes>
          <Route path="/" element={<PostList />} />
          {/* La ruta de crear debe ir ANTES de la ruta con :id */}
          <Route path="/posts/create" element={<PostForm />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;